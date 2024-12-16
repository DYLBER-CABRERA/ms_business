import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Operation from "./Operation";
import Route from "./Route";
import Insurance from "./Insurance";
import VehicleOwner from "./VehicleOwner";

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public license_plate: String;

  @column()
  public model: String;

  @column()
  public capacity: number;

  @column()
  public cargo_type: String;
  @column()
  public latitud_inicial: number;
  @column()
  public latitud_final: number;
  @column()
  public longitud_inicial: number;
  @column()
  public longitud_final: number;
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Operation, {
    //nombre de la clave foranea que permite la relacion de 1 a n
    foreignKey: "vehicle_id",
  })
  public operations: HasMany<typeof Operation>;

  //Relación 1 a N
  @hasMany(() => Route, {
    foreignKey: "vehicle_id", //Clave foránea que relaciona con la identidad dominante
  })
  public routes: HasMany<typeof Route>;

  //Relación de 1 a N
  @hasMany(() => Insurance, {
    foreignKey: "vehicle_id", //Clave foránea que relaciona con la identidad dominante
  })
  public insurances: HasMany<typeof Insurance>;

  //Relación de 1 a N
  @hasMany(() => VehicleOwner, {
    foreignKey: "vehicle_id", //Clave foránea que relaciona con la identidad dominante
  })
  public vehicleOwners: HasMany<typeof VehicleOwner>;
}
