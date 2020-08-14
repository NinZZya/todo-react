import users from './mock/users';
import { TAuthData } from './types';

const DELAY_MS = 500;
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

class TODOApi {
  static async auth({ login, password } : TAuthData) {
    await delay(DELAY_MS);

    const user = users.find((user) => user.login === login);

    if (user) {
      return user.password === password
        ? {
          id: user.id,
          login: user.login,
        }
        : {
          id: -1,
          login: ''
        };
    }

    return { id: -1, login: '' };
  }
}

export default TODOApi;
