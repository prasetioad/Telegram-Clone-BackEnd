module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("msg", {
      userId: {
        type: Sequelize.STRING,
      },
      destId:{
        type: Sequelize.STRING,
      },
      sender:{
        type: Sequelize.STRING(18),
      },
      receiver:{
        type: Sequelize.STRING(18),
      },
      message:{
        type: Sequelize.STRING,
      },
      time:{
        type: Sequelize.STRING,
      },
      file:{
        type: Sequelize.STRING,
        defaultValue: null,
      },
    });
  
    return User;
  };
  