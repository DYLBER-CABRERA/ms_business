import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public to: string

  @column()
  public from: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relación 1 a N
  @hasMany(() => Message, {
    foreignKey: "chat_id", //Clave foránea que relaciona la identidad dominada
  })
  public messages: HasMany<typeof Message>;
}
