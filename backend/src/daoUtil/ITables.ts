export interface Capital {
  id: number;
  country: string;
  capital: string;
}

export class EnvVars {
  password: string | undefined;
  host: string | undefined;
  user: string | undefined;
  db: string | undefined;
  dbPort: number | undefined;
  appPort: number | undefined;
  constructor(
    pas: string | undefined,
    host: string | undefined,
    user: string | undefined,
    db: string | undefined,
    dbPort: number | undefined,
    appPort: number | undefined
  ) {
    this.password = pas;
    this.host = host;
    this.user = user;
    this.db = db;
    this.dbPort = dbPort;
    this.appPort = appPort;
  }
}
