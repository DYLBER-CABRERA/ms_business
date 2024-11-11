import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public company_type: string

  @column()
  public fiscal_address: string

  @column()
  public client_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
