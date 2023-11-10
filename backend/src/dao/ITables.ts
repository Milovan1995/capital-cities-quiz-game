//interfaces for db tables - making sure the data is consistent:
export interface ICapital {
  id: number;
  country: string;
  capital: string;
  region_id: number | null;
}
export interface IUser {
  username: string;
  password: string;
  [key:string]:string|number;
}
export interface IDuration {
  id: number;
  value: number;
}
export interface IRegion {
  id: number;
  name: string;
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
  username: string;
  score: number;
  region: string;
  date_played: Date;
  game_duration: number;
}
export interface IFeedback {
  id: number;
  user_id: number;
  comment: string;
  date_created: Date;
}
export interface IAchievement {
  id: number;
  achievement_name: string;
  achievement_description: string;
}
export interface IAchievementAcquired {
  id: number;
  user_id: number;
  achievement_id: number;
  game_id: number | null;
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
