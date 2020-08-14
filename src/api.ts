import users from './mock/users';
import boards from './mock/boards';
import tasks from './mock/tasks';
import { TAuthData, TId } from './types';

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
        : null;
    }

    return null;
  }

  static async getBoards(userId: TId) {
    await delay(DELAY_MS);
    return boards.filter((board) => board.userId === userId);
  }

  static async getTasks(userId: TId) {
    await delay(DELAY_MS);
    return tasks.filter((task) => task.userId === userId);
  }
}

export default TODOApi;
