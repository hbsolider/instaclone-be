'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{
        foreignKey:'follower',
        as:'followings'
      })
      this.belongsTo(models.User,{
        foreignKey:'following',
        as:'followers'
      })
    }
  }
  Follow.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      follower:{
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      following: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Follow',
    }
  );
  return Follow;
};
