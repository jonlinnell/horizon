/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dateEnd: {
      type: DataTypes.DATE,
      allowNull: false
    },
    summary: DataTypes.STRING,
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: DataTypes.STRING,
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    ticketed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    imageUrl: DataTypes.STRING,
    speakers: DataTypes.JSON,
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  return Event
}
