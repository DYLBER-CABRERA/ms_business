import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Batch from './Batch'
import ProductCategory from './ProductCategory'
export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public expiration_date: DateTime

  @column()
  public client_id: number

  @column()
  public batch_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ProductCategory, {
    foreignKey: "category_id", //Clave foránea que relaciona la identidad dominada
  })
  public productCategory: HasMany<typeof ProductCategory>;

  //Relacion 1 a N
  @belongsTo(() => Client,{
    foreignKey: 'client_id'//Clave foránea que relaciona con la identidad dominante
  })
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Batch,{
    foreignKey: 'batch_id' //Clave foránea que relaciona con la clase dominante
  })
  public batch: BelongsTo<typeof Batch>
}
