import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_type:string

  @column()
  public id_number: string

  @column()
  public phone_number: number

  @column()
  public order_count: number

  @column()
  public user_id: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
