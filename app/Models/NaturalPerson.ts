import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Company from "./Company";
import Client from "./Client";

export default class NaturalPerson extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: string;

  @column()
  public document_type: string;

  @column()
  public document_number: string;

  @column()
  public birth_date: DateTime;

  @column()
  public company_id: number | null;

  @column()
  public client_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  //Relación de 1 a 1
  @belongsTo(() => Company, {
    foreignKey: "company_id",
  })
  public Company: BelongsTo<typeof Company>;

  //Relación de 1 a N
  @belongsTo(() => Client, {
    foreignKey: "client_id",
  })
  public client: BelongsTo<typeof Client>;
}
