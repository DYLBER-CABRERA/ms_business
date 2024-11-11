import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Service from "./Service";
//!HACER LA HERENCIA DE SERVICIO : HEREDA LOS ATRIBUTOS DE ESA CLASE MAS LAS OTRAS

export default class Hotel extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public stars: number;
  @column()
  public service_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Service, {  //*hotel -servicio
    foreignKey: "service_id",
  })
  public service: BelongsTo<typeof Service>;
}
