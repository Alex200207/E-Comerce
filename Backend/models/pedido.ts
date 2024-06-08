// backend/models/Pedido.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import Usuario from './user';

interface PedidoAttributes {
  ID_Pedido: number;
  ID_Usuario?: number;
  Fecha_Pedido: Date;
  Total: number;
}

interface PedidoCreationAttributes extends Optional<PedidoAttributes, 'ID_Pedido'> {}

class Pedido extends Model<PedidoAttributes, PedidoCreationAttributes> implements PedidoAttributes {
  public ID_Pedido!: number;
  public ID_Usuario?: number;
  public Fecha_Pedido!: Date;
  public Total!: number;
}

Pedido.init(
  {
    ID_Pedido: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_Usuario: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Usuario,
        key: 'ID_Usuario',
      },
    },
    Fecha_Pedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'Pedido',
    sequelize,
  }
);

export default Pedido;
