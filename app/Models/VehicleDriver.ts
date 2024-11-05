import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Driver from "./Driver";
import Vehicle from "./Vehicle";

export default class VehicleDriver extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  //!PARA LA RELACIÓN CON VEHICULO
  @column()
  public vehicle_id: number;
  @column()
  public driver_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  //!PARA LA RELACIÓN CON VEHICULO
    @belongsTo(() => Vehicle, {
  //service_id es el nombre de la clave foranea en la tabla service
      foreignKey: "vehicle_id",
    })
    public vehicle: BelongsTo<typeof Vehicle>;

  @belongsTo(() => Driver, {
    foreignKey: "driver_id",
  })
  public driver: BelongsTo<typeof Driver>;
}
