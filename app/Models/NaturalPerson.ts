import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Company from './Company'
import Client from './Client'

export default class NaturalPerson extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public document_type: string
  
  @column()
  public document_number: string

  @column()
  public birth_date: DateTime

  @column()
  public company_id: number | null

  @column()
  public client_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Company,{
    foreignKey: 'company_id'
  })
  public Company: BelongsTo<typeof Company>
  
  @belongsTo(() => Client,{
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>
}
