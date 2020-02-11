const User = require("../../models/User");

/** retorna true para USUÁRIO EXISTE e false para inexistente ou ObjectId inválido */
module.exports = async function checkIfUserExists(userId) {
  try {
    const user = await User.findById(userId);
    return !!user;
  } catch (error) {
    return false;
  }
};
