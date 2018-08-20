import { validation } from '../config/config.json'

const { titleLength, summaryLength } = validation

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(Number(titleLength)),
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
    summary: DataTypes.STRING(Number(summaryLength)),
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    displayOnSignage: {
      type: DataTypes.BOOLEAN,
      default: true,
      allowNull: false,
    },
    includeInCalendar: {
      type: DataTypes.BOOLEAN,
      default: true,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  return Event
}
