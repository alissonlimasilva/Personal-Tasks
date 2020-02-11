const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { errors } = require("../global/messages");
const status = require("../global/statuscode");
const errorResponse = require("../utils/errorResponse");

module.exports = {
  async index(request, response) {
    const user = await User.find();
    return response.json(user);
  },
  async store(request, response) {
    const { name, email, password, avatar } = request.body;
    try {
      if (!email || !name || !password) {
        throw errorResponse(status.BAD_REQUEST, errors.badRequest);
      }
      let user = await User.findOne({ email });
      if (user) {
        throw errorResponse(status.BAD_REQUEST, errors.userAlready);
      }

      user = await User.create({
        name,
        password: bcrypt.hashSync(password, 10),
        email,
        avatar
      });

      return response.json(user);
    } catch (error) {
      response.statusCode = error.code || 400;
      return response.json(error);
    }
  },
  async login(request, response) {
    const { email, password } = request.body;
    try {
      if (!email || !password) {
        throw errorResponse(status.BAD_REQUEST, errors.authBadRequest);
      }
      const user = await User.findOne({ email });
      if (!user) {
        throw errorResponse(status.UNAUTHORIZED, errors.noAuthUser);
      }
      if (bcrypt.compareSync(password, user.password)) {
        const { hash, ...userToSend } = user.toObject();
        const token = jwt.sign({ sub: user.id }, process.env.SECRET);
        return response.json({
          ...userToSend,
          token
        });
      }
      throw errorResponse(status.UNAUTHORIZED, errors.noAuthPassword);
    } catch (error) {
      response.statusCode = error.code || 400;
      return response.json(error);
    }
  }
};
