// backend/models/Categoría.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface CategoríaAttributes {
  ID_Categoría: number;
  Nombre: string;
}

interface CategoríaCreationAttributes extends Optional<CategoríaAttributes, 'ID_Categoría'> {}

class Categoría extends Model<CategoríaAttributes, CategoríaCreationAttributes> implements CategoríaAttributes {
  public ID_Categoría!: number;
  public Nombre!: string;
}

Categoría.init(
  {
    ID_Categoría: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'Categoría',
    sequelize,
  }
);

export default Categoría;
