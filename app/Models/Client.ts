import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

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

  @hasMany(() => Product, {
    foreignKey: "client_id", //Clave foránea que relaciona la identidad dominada
  })
  public batches: HasMany<typeof Product>;
}
