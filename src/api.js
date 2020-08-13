import users from './mock/users';
import boards from './mock/boards';
import tasks from './mock/tasks';

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

  static async getBoards(userId) {
    await delay(DELAY_MS);
    return boards.filter((board) => board.userId === userId);
  }

  static async getTasks(userId) {
    await delay(DELAY_MS);
    return tasks.filter((tasks) => tasks.userId === userId);
  }
}

export default TODOApi;
