module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },

    username: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    postcode: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    type: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },

    image: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Dog, {
      foreignKey: 'userId',
      as: 'dogs',
    });
    User.hasMany(models.Request, {
      foreignKey: 'userId',
      as: 'requests',
    });
  };
  return User;
};
