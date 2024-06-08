// backend/models/Pedido_Detalle.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import Pedido from './pedido';
import Producto from './producto';

interface PedidoDetalleAttributes {
  ID_Pedido: number;
  ID_Producto: number;
  Cantidad: number;
  Precio: number;
}

class PedidoDetalle extends Model<PedidoDetalleAttributes> implements PedidoDetalleAttributes {
  public ID_Pedido!: number;
  public ID_Producto!: number;
  public Cantidad!: number;
  public Precio!: number;
}

PedidoDetalle.init(
  {
    ID_Pedido: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      references: {
        model: Pedido,
        key: 'ID_Pedido',
      },
    },
    ID_Producto: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      references: {
        model: Producto,
        key: 'ID_Producto',
      },
    },
    Cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'Pedido_Detalle',
    sequelize,
  }
);

export default PedidoDetalle;
