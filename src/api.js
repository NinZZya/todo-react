import users from './mock/users';

const DELAY_MS = 500;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

class TODOApi {
  static async auth({ login, password }) {
    await delay(DELAY_MS);

    const user = users.find((user) => user.login === login);

    if (user) {
      return user.password === password
        ? {
          id: user.id,
          login: user.login,
        }
        : false;
    }

    return false;
  }
}

export default TODOApi;
