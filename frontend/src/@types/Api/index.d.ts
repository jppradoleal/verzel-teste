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
  description: string;
  start_date: string;
  created_at: string;
  updated_at: string;
  module: ApiModule;
}

export interface RouteParams {
  id: string;
}


interface ModuleWithCount {
  module: ApiModule,
  classCount: number
}
