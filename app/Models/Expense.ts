import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from "@ioc:Adonis/Lucid/Orm";
import Service from "./Service";
import Driver from "./Driver";
import Invoice from "./Invoice";
import Owner from "./Owner";


export default class Expense extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public amount: number; // Monto del gasto

  @column()
  public service_id: number;

  @column()
  public driver_id: number;

  //!PARA LA RELACION CON EL DUEÑO
  @column()
  public owner_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Service, {
    //service_id es el nombre de la clave foranea en la tabla service
    foreignKey: "service_id",
  })
  public service: BelongsTo<typeof Service>;

  @belongsTo(() => Driver, {
    foreignKey: "driver_id",
  })
  public driver: BelongsTo<typeof Driver>;

  @hasOne(() => Invoice, {
    foreignKey: "expense_id",
  })
  public invoice: HasOne<typeof Invoice>;

  //!PARA LA RELACION CON EL DUEÑO
   @belongsTo(() => Owner, {
     foreignKey: "owner_id",
   })
   public owner: BelongsTo<typeof Owner>;
}
