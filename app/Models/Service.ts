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

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public amount: number;

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
    //tengo muchas funciones
    foreignKey: "service_id", //cual es la clave foranea que permite esa relacion
  })
  public expense: HasMany<typeof Expense>;
  //QUE UN SERVICIO TIENE UN ADMINISTRADOR
  @hasOne(() => Administrator, {
    foreignKey: "service_id",
  })
  public administrator: HasOne<typeof Administrator>;
}
