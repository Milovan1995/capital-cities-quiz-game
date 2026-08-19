# Backend implementation roadmap

This is the working checklist for completing `capital-cities-quiz-game`. It is based on the current repository state on 2026-08-19, not a wish-list inferred from the UI. Check an item only after its acceptance criteria and tests are complete.

## Current baseline

| Area | Current state | Gap to close |
| --- | --- | --- |
| Registration and login | Present; passwords use bcrypt and a JWT is returned. | The JWT secret is read from configuration but falls back to the insecure literal `SECRET`; tokens do not expire, input/error handling is inconsistent, and the login controller exposes the submitted username in an error response. |
| Game metadata | `GET /game/config`, `/regions`, `/durations`, and `/capitals/:regionId?` are present. | Invalid region IDs silently return all capitals; the full capital/correct-answer dataset is public, so the server cannot verify a competitive result. |
| Scores and leaderboards | Scores can be stored and listed by duration; a global (`World`) score is supported. | `POST /scores/save-game` is public and accepts `userId`, so anyone can create a score for any user. Limits and IDs are not bounded or checked against database records. |
| Profile | Authenticated `/user/me` and `/user/me/stats` return basic data. | The documented quiz history is absent; stats only expose four aggregates. |
| Feedback | Insert and read endpoints exist. | They are public, accept a username in the body, swallow repository errors, and do not define moderation, ownership, or pagination. |
| Achievements | Tables and 15 seed definitions exist. | No backend code reads, awards, or exposes them. Several seeded rules require per-question/lifeline data that is not stored. |
| Database and delivery | Schema and seed SQL exist; TypeScript typecheck passes. | Setup instructions point to a non-existent `database_scripts/` directory; no migration process, test suite, health endpoint, environment example, or deployment contract exists. |

## Delivery order

Do the phases in this order. P0 protects user accounts and score integrity before adding game features. Keep the existing routes compatible where possible; make intentional contract changes explicit in the frontend work.

## P0 — make existing functionality safe and reliable

### 1. Configuration, authentication, and error boundary

- [ ] Make `JWT_SECRET` required and delete every fallback to the literal `"SECRET"`. Add a tracked `.env.example` containing names only: `APP_PORT`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`, and allowed frontend origin(s).
- [ ] Load configuration once from a documented location and fail at startup with a clear message when a required value is absent or invalid. The current `../../.env` resolution depends on the shell working directory.
- [ ] Sign access tokens with an expiry and return a consistent authentication response, for example `{ "token": "...", "user": { "id", "username" } }`. Keep the client migration small by retaining `token` during the transition.
- [ ] Remove `console.log(req.body)` from login and avoid logging passwords, tokens, or raw database values anywhere.
- [ ] Add a final Express error handler that returns JSON for malformed JSON, JWT failures, PostgreSQL constraint errors, and unknown failures without leaking internal details. Ensure auth failures return 401/403 rather than Express's default HTML response.
- [ ] Restrict CORS to configured frontend origins and permitted methods/headers; allow local development explicitly rather than allowing every origin in production.

**Acceptance:** the app refuses to start without its secret; expired/invalid tokens receive JSON 401; login/register never write secrets to logs; a disallowed browser origin cannot call authenticated endpoints.

### 2. Establish ownership on writes

- [ ] Protect `POST /scores/save-game` with `authMiddleware`.
- [ ] Remove `userId` from its accepted request body and always use `req.auth.userId`. Do not leave the current `req.body.userId ?? auth?.userId` fallback: it permits impersonation even after middleware is added.
- [ ] Protect feedback creation and derive the author from the token. Replace `user` in `POST /user/insert-user-feedback` with a body containing only the comment, or introduce a clearer route such as `POST /user/me/feedback` while temporarily supporting the old route for the frontend migration.
- [ ] Decide whether feedback is public. If it is public, expose only approved comments with pagination; if it is private/support-only, require the owner or an administrator to read it. Do not expose an unbounded list by default.
- [ ] Use the existing `isAdmin` claim only after an explicit admin-only route actually needs it; do not build a generic role system now.

**Acceptance:** an authenticated user can save only their own game and submit only their own feedback; missing/invalid tokens cannot create either record; no public endpoint exposes an unbounded private dataset.

### 3. Validate inputs and return correct client errors

- [ ] Define one small validation layer for the existing request shapes (manual functions are sufficient; do not add a validation library just for these few routes).
- [ ] Registration/login: require trimmed string usernames and string passwords, enforce database-safe length limits and a documented password policy, and return 409 for duplicate usernames and 401 for bad credentials. Do not distinguish an unknown username from a bad password in the login response.
- [ ] Game endpoints: reject non-integer, non-positive, or non-existent `regionId` values. `GET /game/capitals/not-a-number` must return 400, not the complete world list.
- [ ] Score writes: require integer, non-negative `score`; validate that `durationId` exists and that an optional `regionId` exists before inserting. Return 400/404 rather than a database-derived 500.
- [ ] Leaderboard reads: accept duration as a positive configured duration, require `limit` within a small maximum (for example 1–100), and add offset/cursor pagination before exposing full score history.
- [ ] Return one documented response envelope per endpoint. Fix branches that can finish without responding, notably failed registration/feedback saves, and remove nested failure responses such as `{ success: false, isUserValidResponse: ... }`.

**Acceptance:** invalid payloads never reach SQL, every controller sends exactly one response, and malformed inputs have stable 400/401/404/409 responses that the frontend can display.

### 4. Stabilize persistence access

- [ ] Replace the single long-lived `pg.Client` with `pg.Pool`, handle connection/startup failures, and close the pool on process shutdown.
- [ ] Remove or narrow the unused generic `delete.util.ts` and `update.util.ts`; both interpolate a raw SQL condition. For retained helpers, permit only fixed internal table/column names and parameterize values.
- [ ] Make repository functions either return their declared data or throw. `getCapitals`, `getUserFeedback`, and `insertUserFeedback` currently catch and only log errors, creating false success/undefined paths.
- [ ] Remove development `console.log` calls from score and DAO repositories; replace them with minimal, non-sensitive error logging at the application boundary.
- [ ] Add `GET /health` that checks process readiness and database connectivity, suitable for local and hosted deployment checks.

**Acceptance:** a lost database connection produces a controlled 5xx response, no write reports success after a failed query, and the health endpoint distinguishes a running process from a ready database-backed service.

## P1 — finish the promised game account and leaderboard features

### 5. Profile history and meaningful stats

- [ ] Add an authenticated game-history endpoint for the current user only. Return score, duration, region/World, and play timestamp; sort newest first and paginate.
- [ ] Add per-duration and per-region aggregates only if the profile UI uses them. The minimum useful extension is total games, best score, average score, last played, and recent games; avoid a new reporting subsystem.
- [ ] Change `game.date_played` to a timezone-aware timestamp in a migration (or add `played_at` and backfill) so the feature's promised date stamps retain time and ordering.
- [ ] Specify deterministic leaderboard ordering: score descending, then earliest completion time, then game ID. Add a rank in the response if the UI displays it.
- [ ] Support leaderboards filtered by duration and optional region, with bounded pagination. Keep the current global score behavior and label `NULL region_id` as `World` at the API boundary.

**Acceptance:** a user sees only their own paginated history; two tied scores have a stable order; public leaderboard requests remain bounded and return enough metadata for pagination.

### 6. Decide and implement score trust before making leaderboards competitive

The current design delivers every country/capital pair to the browser and accepts its aggregate score. That is acceptable only for a casual personal-progress game; it is not a trustworthy global leaderboard.

- [ ] Make the product decision explicit: **casual scores** (retain client-selected questions and label leaderboards accordingly) or **verified scores** (recommended if global ranks/achievements matter).
- [ ] For verified scores, add a server-issued game session: start with selected duration/region, store only question IDs and expiry server-side, return countries/options without answers, submit each answer, and calculate the final score on the server.
- [ ] For verified scores, prevent reuse/late submissions, bind the session to the authenticated user, and create the final `game` row transactionally at completion. Do not accept a final client `score`.
- [ ] Persist the minimal per-game facts needed by future rules: total questions, correct answers, elapsed seconds, selected region, and whether a hint/lifeline was used. Store individual answers only if review/analytics needs them.
- [ ] If casual scores are retained for now, still complete P0 ownership/validation and mark the leaderboard as self-reported in the frontend; do not claim anti-cheat protection.

**Acceptance:** the chosen model is documented in the API contract. Under verified mode, changing a browser score or submitting after expiry cannot alter a leaderboard result.

### 7. Achievements

- [ ] Audit the 15 seeded achievement rules against data that will actually exist after the score-trust decision. Mark unsupported definitions (for example "under 5 seconds each" and "all lifelines") as unavailable until the required events are persisted.
- [ ] Create one achievement-evaluation function invoked when a game is completed. It must be idempotent: unique `(user_id, achievement_id)` protection prevents duplicate awards on retries.
- [ ] Add authenticated endpoints to list the achievement catalogue and the current user's earned achievements, including earned timestamp and related game where available.
- [ ] Add only the database fields needed for the rules selected for the first release; do not implement a configurable rules engine.
- [ ] Return newly unlocked achievements with game completion so the frontend can show a single post-game notification.

**Acceptance:** completing the qualifying game awards each achievement once; retrying the completion request cannot duplicate it; unsupported rules cannot be falsely awarded.

### 8. Feedback lifecycle

- [ ] Keep a concise, bounded comment field and add server-side length/whitespace validation.
- [ ] Add status/moderation fields only if feedback will be displayed publicly. Otherwise, leave feedback as a private support record and do not build an admin dashboard yet.
- [ ] If public testimonials are desired, add an admin approval action and have public reads return approved records only, newest first, paginated.

**Acceptance:** feedback has a defined audience and lifecycle; a user cannot impersonate another author; public views never expose unreviewed content.

## P2 — planned game features from `FEATURES.md`

These are product increments, not existing functionality. Implement them only after P0/P1 and after the score-session decision, because several need verified per-question game data.

| Feature | Backend work required | First shippable scope |
| --- | --- | --- |
| Game durations | Treat duration records as the source of truth and document the seeded 30/60/90/120/300 values. | Expose enabled durations and validate the selected ID during game start. |
| Cumulative score and combos | Persist score inputs sufficient to calculate a final score on the server. | Correct-answer count and one documented scoring formula; add streak multipliers only when the UI requires them. |
| Question variety by region | Validate selected region and make it part of the game session/history; avoid repeats within one verified session. | World or exactly one region per game. Multi-region custom sets can wait. |
| Correct/incorrect feedback | The backend should return a per-answer verdict only in verified-session mode; the casual client already has the answer data. | Return correctness, the correct capital when wrong, and updated score/streak after answer submission. |
| Achievements | See P1. | Award "first game" and one score/region achievement with available data. |
| Sound/visual effects | No backend change. | Frontend-only accessibility-respecting preference. |
| Avatars, themes, customization | Themes are frontend state; avatars need a profile field and safe media policy only if users can upload/select them. | Theme preference first; defer uploads and image storage. |
| User feedback and analytics | Feedback is P1; analytics needs consent, a defined question, retention policy, and aggregation. | Aggregate anonymous game completion/error counts; do not store raw behavioral data by default. |
| Dates | See P1 timestamp migration. | Displayable `played_at` on profile/history. |

## Database and API migration checklist

- [ ] Replace ad-hoc schema setup with ordered, idempotent migrations plus a separate development seed. Document the exact commands that point to the actual `database/` directory; the README currently refers to missing `database_scripts/` paths.
- [ ] Add `NOT NULL`, `CHECK`, and uniqueness constraints that match the validated API: user username/password/privilege, duration value, region name, capital country/capital, game foreign keys/score/timestamp, and feedback comment/timestamp as applicable.
- [ ] Review destructive foreign-key actions. Deleting a duration or region should not accidentally erase game history; prefer restricting deletes or preserving historical labels/nullable references according to the chosen behavior.
- [ ] Add indexes after query shapes are finalized: `game(user_id, played_at DESC)`, leaderboard filters/order (`duration_id`, optional `region_id`, `score DESC`), and foreign keys used in joins.
- [ ] Seed using natural inserts or reset affected sequences after explicit IDs. The current capitals/achievements seeds assign IDs without advancing their sequences, which can cause later generated IDs to collide.
- [ ] Version API changes through compatible optional fields or a documented `/v2` boundary. Update the frontend client and README in the same implementation slice.

## Test and release checklist

- [ ] Replace the failing placeholder `npm test` script with a small real test command. The current `src/test.ts` is ignored by `.gitignore`, so it is not a test suite.
- [ ] Add focused integration tests against a disposable PostgreSQL database for: register/login, duplicate registration, auth rejection, score ownership, validation failures, score/history/leaderboard ordering, and one achievement award. Keep fixtures minimal.
- [ ] Add unit tests only for non-trivial pure logic, especially score calculation and achievement evaluation.
- [ ] Run `npm --prefix backend run typecheck`, tests, and a production build in CI on pull requests. Add linting only if a project-standard configuration is chosen; it is not required to complete the functional work.
- [ ] Document production environment variables, database migration/backup/restore procedure, allowed CORS origins, health-check URL, and token rotation procedure.
- [ ] Verify the complete frontend flow manually after each API slice: register → login → start game → complete/save → leaderboard → profile history/stats → logout/reload.

## Suggested implementation slices

1. **Secure existing API:** configuration, JWT expiry/error handler, CORS, protected score/feedback writes, validation, and frontend contract adjustment.
2. **Reliable data contract:** pool/health endpoint, migrations/seed correction, history endpoint, bounded and deterministic leaderboard.
3. **Choose score model:** document casual mode or build server-issued verified sessions. Do this before achievements, currency, or competitive claims.
4. **First achievement release:** minimum supporting game facts, idempotent award evaluator, catalogue/profile endpoints, post-game unlock response.
5. **Optional product features:** timers/scoring refinements, one hint, public feedback moderation, then only the customization/analytics features with explicit product requirements.

## Definition of complete

The backend is functionally complete for the first release when P0 is done, profile history and bounded leaderboards work, database setup is reproducible from a clean PostgreSQL instance, and automated tests cover the authenticated score path. Achievements and P2 features remain deliberately separate release increments; they should not be represented as already available until their required game data and API contracts exist.
