'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Like, {
        as: 'likes',
        foreignKey: 'photoId',
      });
      this.belongsTo(models.User,{
        foreignKey: 'userId',
        as:'owner'
      });
      this.hasMany(models.Comment, {
        as: 'comments',
        foreignKey: 'photoId',
      });
    }
  }
  Photo.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
      },
      caption: DataTypes.STRING,
      image: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Photo',
    }
  );

  Photo.prototype.isOwner = (userId) => {
    return this.userId === userId;
  };
  return Photo;
};
