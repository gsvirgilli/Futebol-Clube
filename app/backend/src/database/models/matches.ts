import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './teams';

export default class SequelizeMatch extends Model<InferAttributes<SequelizeMatch>,
InferCreationAttributes<SequelizeMatch>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

SequelizeMatch.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    field: 'home_team_id',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    field: 'home_team_goals',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    field: 'away_team_id',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    field: 'away_team_goals',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    field: 'in_progress',
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

SequelizeTeam.hasMany(SequelizeMatch, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
SequelizeTeam.hasMany(SequelizeMatch, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});
