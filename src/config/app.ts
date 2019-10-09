interface IAppConfig {
  env: string;
  port: number;
}

const { NODE_ENV, PORT } = process.env;

const app: IAppConfig = {
  env: NODE_ENV || 'development',
  port: PORT ? parseInt(PORT, 10) : 3000,
};

export default app;
