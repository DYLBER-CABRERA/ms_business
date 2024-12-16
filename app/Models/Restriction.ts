import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'

export default class Restriction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  description: string

  @column()
  date_start: string  

  @column()
  date_end: string
  
  @column()
  municipality_id: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @belongsTo(() => Municipality , {

    foreignKey: 'municipality_id'
  })
  public municipality: BelongsTo<typeof Municipality>
}
