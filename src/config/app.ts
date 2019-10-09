interface IAppConfig {
  env: string;
}

const app: IAppConfig = {
  env: process.env.NODE_ENV || 'development',
};

export default app;
