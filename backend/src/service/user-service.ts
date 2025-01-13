const User = require("../models/User");

class UserService {
  async registration(username: string, email: string, password: string) {
    const userEmail = await User.findOne({ email });
    const userName = await User.findOne({ username });

    if (userEmail || userName) {
      throw new Error(`User with email or username already exists`);
    }
    const newUser = await User.create({ username, email, password });
  }
}

module.exports = new UserService();
