import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Hotel extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public stars: number;
  @column()
  public name: string;
  @column()
  public address: string;
  @column()
  public service_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
