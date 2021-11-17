const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('todo', {
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
    folderId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is: '^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      foreignKey: true,
    }
  });
};
