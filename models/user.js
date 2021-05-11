module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      userId: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING(64),
        defaultValue: "user",
      },
      userName: {
        type: Sequelize.STRING(20),
        defaultValue: "-",
      },
      email: {
        type: Sequelize.STRING(64),
      },
      password: {
        type: Sequelize.STRING(64),
      },
      role: {
        type: Sequelize.ENUM,
        values: ["admin", "user"],
        defaultValue: "user",
      },
      phone:{
        type: Sequelize.STRING(13),
        defaultValue: "-",
      },
      bio:{
        type: Sequelize.STRING(64),
        defaultValue: "-",
      },
      status: {
        type: Sequelize.STRING,
        values: ["online", "offline"],
        defaultValue: "offline",
      },
      socketId:{
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue:
        "https://image.freepik.com/free-vector/cute-ninja-with-shuriken-cartoon-flat-cartoon-style_138676-2761.jpg",
      }
    });
  
    return User;
  };
  