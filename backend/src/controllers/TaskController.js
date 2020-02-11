const Task = require("../models/Task");
const { responses, errors } = require("../global/messages");
const status = require("../global/statuscode");
const checkLatLongIsValid = require("../utils/checkLatLong");
const errorResponse = require("../utils/errorResponse");
const checkIfUserExists = require("./utils/user-utils");
const checkIfTaskExists = require("./utils/task-utils");

module.exports = {
  /** method para test */
  async listTasksByUser(request, response) {
    try {
      const { loggedUser } = request;
      /** Checando se usuário existe, não é possível criar uma tarefa referenciando um usuário que não existe */
      if (!(await checkIfUserExists(loggedUser))) {
        throw errorResponse(status.BAD_REQUEST, errors.userNotFound);
      }

      const tasks = await Task.find({ user: loggedUser });
      return response.json(tasks);
    } catch (error) {
      response.statusCode = error.code || 400;
      return response.json(error);
    }
  },
  async delete(request, response) {
    try {
      const { taskId } = request.query;
      const { loggedUser } = request;
      /** Chegando foi passado ou se tarefa existe */
      if (!taskId || (await !checkIfTaskExists(taskId))) {
        throw errorResponse(status.BAD_REQUEST, errors.taskNotFound);
      }
      /** Checando se usuário tem permissão para acessar ou alterar tarefa */
      const task = await Task.findById(taskId);
      if (task.user.toString() !== loggedUser) {
        throw errorResponse(status.FORBBIDEN, errors.noPermition);
      }

      /** Deletando tarefa */
      const deletedTask = await Task.findOneAndDelete({ _id: taskId });
      if (deletedTask) {
        return response.json({ message: responses.deleteTask });
      }
      throw errorResponse(status.BAD_REQUEST, errors.taskNotFound);
    } catch (error) {
      response.statusCode = error.code || 400;
      return response.json(error);
    }
  },
  async createTask(request, response) {
    try {
      const { title, content, latitude, longitude, date } = request.body;
      const { loggedUser } = request;

      /** Checando se campos requeridos estão devidamente preenchidos */
      if (!title || !content || !checkLatLongIsValid(latitude, longitude)) {
        throw errorResponse(status.BAD_REQUEST, errors.badRequest);
      }
      /** Checando se usuário existe, não é possível criar uma tarefa referenciando um usuário que não existe */
      if (!checkIfUserExists(loggedUser)) {
        throw errorResponse(status.BAD_REQUEST, errors.userNotFound);
      }

      const task = await Task.create({
        title,
        content,
        latitude,
        longitude,
        date,
        user: loggedUser
      });
      if (!task) throw errorResponse(status.SERVER_ERROR, errors.saveTask);
      return response.json(task);
    } catch (error) {
      response.statusCode = error.code || 400;
      return response.json(error);
    }
  },
  async updateTask(request, response) {
    try {
      const {
        taskId,
        title,
        content,
        latitude,
        longitude,
        date,
        isDone
      } = request.body;

      const { loggedUser } = request;

      /** Checando se campos requeridos estão devidamente preenchidos */
      if (!taskId || !checkLatLongIsValid() || !loggedUser) {
        throw errorResponse(status.BAD_REQUEST, errors.badRequest);
      }

      /** Checando se usuário existe, não é possível criar uma tarefa referenciando um usuário que não existe */
      if (!checkIfUserExists(loggedUser)) {
        throw errorResponse(status.BAD_REQUEST, errors.userNotFound);
      }

      let task = await Task.findById(taskId);
      if (!task) {
        throw errorResponse(status.BAD_REQUEST, errors.taskNotFound);
      }

      /** Checando se usuário tem permissão para acessar ou alterar tarefa */
      if (task.user.toString() !== loggedUser) {
        throw errorResponse(status.FORBBIDEN, errors.noPermition);
      }

      task = { ...task.toObject() };

      task = await Task.updateOne(
        { _id: taskId },
        {
          $set: {
            title: title || task.title,
            content: content || task.content,
            latitude: latitude || task.latitude,
            longitude: longitude || task.longitude,
            date: date || task.date,
            isDone: isDone || task.isDone,
            updatedAt: Date.now()
          }
        }
      );
      if (!task) {
        throw errorResponse(status.SERVER_ERROR, errors.update);
      }
      return response.json(await Task.findById(taskId));
    } catch (error) {
      response.statusCode = error.code || 400;
      return response.json(error);
    }
  }
};
