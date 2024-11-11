import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Invoice from './Invoice'

export default class Quota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public amount: number //monto de la cuota

  @column()
  public interest_rate: number //tasa de interes

  @column()
  public due_date: DateTime //fecha de vencimiento

  @column()
  public contract_id: number //clave foranea de la tabla contract

  @column() 
  public status: boolean //estado de la cuota

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Contract,{
    //nombre de la clave foranea que permite la relacion bidireccional 1:1  en este caso viene de theater
    foreignKey: 'contract_id'
  })
  public contracts: BelongsTo<typeof Contract>

  @hasOne(() => Invoice, {
    foreignKey: "quota_id",
  })
  public invoice: HasOne<typeof Invoice>;
}
