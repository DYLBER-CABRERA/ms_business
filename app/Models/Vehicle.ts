import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import VehicleDriver from './VehicleDriver';

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => VehicleDriver, {
    //*El conductor tiene muchos
    foreignKey: "driver_id", //cual es la clave foranea que permite esa relacion
  })
  public vehicleDriver: HasMany<typeof VehicleDriver>;
}
