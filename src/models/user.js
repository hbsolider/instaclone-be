'use strict';
import bycrypt from 'bcrypt';
import { pick } from 'utils/common';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Photo, {
        as: 'photos',
        foreignKey: 'userId',
      });
      this.hasMany(models.Follow,{
        foreignKey:'follower',
        as:'followings'
      })
      this.hasMany(models.Follow,{
        foreignKey:'following',
        as:'followers'
      })
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
      },
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  // User.addHook('beforeFind', (users, option) => {
  //   if (!users.attributes) {
  //     users.attributes = {};
  //     users.attributes.exclude = ['password', 'created_at', 'updated_at'];
  //   }
  // });
  User.addHook('beforeSave', async (user) => {
    if (user.changed('password')) {
      const salt = bycrypt.genSaltSync(11);
      user.password = await bycrypt.hashSync(user.password, salt);
    }
  });

  User.prototype.transform = function () {
    const fields = ['id', 'email', 'name', 'avatar', 'username', 'fullname'];
    return pick(this, fields);
  };

  User.prototype.compareEmail = function (email) {
    return this.email === email;
  };

  User.prototype.isPasswordMatch = function (password) {
    return bycrypt.compareSync(password, this.password);
  };

  return User;
};
