import { DateTime } from 'luxon'
import { BaseModel, column,BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Chat from './Chat'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public chat_id: number

  @column()
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relación 1 a N
  @belongsTo(() => Chat, {
    foreignKey: 'chat_id'//Clave foránea que relaciona con la identidad dominante
  })
  public chat: BelongsTo<typeof Chat>
}
