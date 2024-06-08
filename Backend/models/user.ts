// backend/models/Usuario.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface UsuarioAttributes {
  ID_Usuario: number;
  Nombre: string;
  Email: string;
  Contraseña: string;
}

interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'ID_Usuario'> {}

class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  public ID_Usuario!: number;
  public Nombre!: string;
  public Email!: string;
  public Contraseña!: string;
}

Usuario.init(
  {
    ID_Usuario: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    Email: {
      type: new DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    Contraseña: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'Usuario',
    sequelize,
  }
);

export default Usuario;
