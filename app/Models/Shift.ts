import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Driver from "./Driver";

export default class Shift extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public start_time: DateTime;
  @column()
  public end_time: DateTime;
  @column()
  public location: string;
  @column()
  public driver_id: number;

  @belongsTo(() => Driver, {
    //que está contenido en los conductores
    foreignKey: "driver_id", //*Clave foranea
  })
  public driver: BelongsTo<typeof Driver>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
