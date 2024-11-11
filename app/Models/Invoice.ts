import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Quota from './Quota'
import Expense from './Expense'

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date: DateTime //fecha y hora de la factura

  @column()
  public total: number //monto total de la factura

  @column()
  public status: boolean //estado de la factura
  
  @ column()
  public quota_id: number //clave foranea de la tabla quotas

  @ column()
  public expense_id: number //clave foranea de la tabla expenses

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Quota,{
    //nombre de la clave foranea que permite la relacion bidireccional 1:1  en este caso viene de theater
    foreignKey: 'quota_id'
  })
  public quota: BelongsTo<typeof Quota>

  @belongsTo(() => Expense,{
    //nombre de la clave foranea que permite la relacion bidireccional 1:1  en este caso viene de theater
    foreignKey: 'expense_id'
  })
  public expense: BelongsTo<typeof Expense>
}
