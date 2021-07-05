export interface ApiModule {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ApiClass {
  id: string;
  name: string;
  imageUrl: string;
  start_date: string;
  created_at: string;
  updated_at: string;
  module: ApiModule;
}

export interface IRouteParams {
  id: string;
}
