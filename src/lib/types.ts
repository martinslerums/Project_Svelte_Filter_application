export interface Game {
  app_id: string;
  name: string;
  icon: string;
}

export interface Retention {
  app_id: string;
  app_ver: string;
  country: string;
  days: number[];
}