export interface ProjectEnv {
  DATABASE_URL?: string;
  SECRET?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends ProjectEnv {}
  }
}
