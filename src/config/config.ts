import { getEnv } from '@utils/getEnv.util';

export const CONFIG = {
  BASE_URL: getEnv('BASE_URL'),
  DEFAULT_CREDENTIALS: {
    username: getEnv('DEFAULT_USERNAME'),
    password: getEnv('DEFAULT_PASSWORD'),
  },
};
