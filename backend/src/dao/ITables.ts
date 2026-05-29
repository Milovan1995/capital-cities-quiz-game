//interfaces for db tables - making sure the data is consistent:
export interface ICapital {
  id: number;
  country: string;
  capital: string;
  region?: string;
  [key: string]: string | number;
}
export interface IUser {
  id?: number;
  username: string;
  password: string;
  privilege: number;
  [key: string]: string | number;
}
export interface IDuration {
  id: number;
  value: number;
  [key: string]: string | number;
}
export interface IRegion {
  id: number;
  name: string;
  [key: string]: string | number;
}
export interface IGame {
  user_id: number;
  score: number;
  duration_id: number;
  region_id: number;
  date_played: string;
  [key: string]: string | number;
}
export interface IScore {
  score: number;
  username: string;
  region: string;
  game_length_seconds: number;
  date_played: string;
  [key: string]: string | number;
}
export interface IUserProfile {
  id: number;
  username: string;
  privilege: number;
  [key: string]: string | number;
}
export interface IUserStats {
  total_games: number;
  best_score: number;
  average_score: number;
  last_played: string | null;
  [key: string]: string | number | null;
}
export interface IFeedback {
  id: number;
  user_id: number;
  comment: string;
  date_created: string;
  [key: string]: string | number;
}
export interface IAchievement {
  id: number;
  achievement_name: string;
  achievement_description: string;
  [key: string]: string | number;
}
export interface IAchievementAcquired {
  id: number;
  user_id: number;
  achievement_id: number;
  game_id: number | null;
  [key: string]: string | number;
}
// .env variables i'm saving, making sure data is consistent:
export class EnvVars {
  password: string;
  host: string;
  user: string;
  db: string;
  dbPort: number;
  appPort: number;
  constructor(
    pas: string,
    host: string,
    user: string,
    db: string,
    dbPort: number,
    appPort: number
  ) {
    this.password = pas;
    this.host = host;
    this.user = user;
    this.db = db;
    this.dbPort = dbPort;
    this.appPort = appPort;
  }
}

export interface IAuthTokenPayload {
  userId: number;
  username: string;
  isAdmin: boolean;
}
