import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Expense from "./Expense";
import Administrator from "./Administrator";
import Hotel from "./Hotel";
import Restaurant from "./Restaurant";

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column()
  public name: string;
  @column()
  public address: string;

  @column()
  public description: string;

  @column()
  public date: DateTime;

  //?El servicio contiene el id del admin??
  //  @column()
  //  public administrator_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Expense, {
    foreignKey: "service_id", //cual es la clave foranea que permite esa relacion
  })
  public expense: HasMany<typeof Expense>;

  //QUE UN SERVICIO TIENE UN ADMINISTRADOR
  @hasOne(() => Administrator, {
    foreignKey: "service_id",
  })
  public administrator: HasOne<typeof Administrator>;

  @hasOne(() => Hotel, {
    foreignKey: "service_id",
  })
  public hotel: HasOne<typeof Hotel>;

  @hasOne(() => Restaurant, {
    foreignKey: "service_id",
  })
  public restaurant: HasOne<typeof Restaurant>;
}
