const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('folder', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });
};
