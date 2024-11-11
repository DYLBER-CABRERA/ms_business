import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Driver from "./Driver";

export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: string;
  @column()
  public phone_number: number;
  @column()
  public driver_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
  
  @belongsTo(() => Driver, {
    foreignKey: "driver_id",
  })
  public driver: BelongsTo<typeof Driver>;
}
