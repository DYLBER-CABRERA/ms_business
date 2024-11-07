import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Shift from "./Shift";
import Expense from "./Expense";
import VehicleDriver from "./VehicleDriver";

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  //*NO TIENE NOMBRE NI CORREO PORQUE SE HEREDA DEL USUARIO

  @column()
  public license_number: string; // Número de licencia del conductor
  @column()
  public expiration_date: DateTime;

  @column()
  public phone_number: string; // Número de contacto del conductor

  @column()
  public user_id: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Shift, {
    foreignKey: "driver_id", //*Clave foranea
  })
  public shift: HasMany<typeof Shift>;

  @hasMany(() => Expense, {
    //*El conductor tiene muchos gastos
    foreignKey: "driver_id", //cual es la clave foranea que permite esa relacion
  })
  public expense: HasMany<typeof Expense>;

  @hasMany(() => VehicleDriver, {
    //*El conductor tiene muchos
    foreignKey: "driver_id", //cual es la clave foranea que permite esa relacion
  })
  public vehicleDriver: HasMany<typeof VehicleDriver>;
}
