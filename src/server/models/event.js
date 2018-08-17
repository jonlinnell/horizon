/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    summary: DataTypes.STRING,
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: DataTypes.STRING,
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    ticketed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    speakers: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  return Event
}
