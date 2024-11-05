import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Contracts extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_date: DateTime

  @column()
  public end_date: DateTime

  @column()
  public client_id: number 
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
