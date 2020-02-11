const Task = require("../../models/Task");

/** retorna true para NOTE EXISTE e false para inexistente ou ObjectId inválido */
module.exports = async function checkIfTaskExists(taskId) {
  try {
    const task = await Task.findById(taskId);
    return !!task;
  } catch (error) {
    return false;
  }
};
