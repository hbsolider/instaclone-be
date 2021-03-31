'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Photo, {
        as: 'photoInfo',
        foreignKey: 'photoId',
      });
    }
  }
  Like.init(
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      photoId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Photo',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Like',
    }
  );
  return Like;
};
