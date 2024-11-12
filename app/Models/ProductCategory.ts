import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product';
import Category from './Category';

export default class ProductCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public product_id: number

  @column()
  public category_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relación 1 a N
  @belongsTo(() => Product, {
    foreignKey: 'product_id' //Clave foránea que relaciona con la identidad dominante
  })
  public product: BelongsTo<typeof Product>

  //Relación 1 a N
  @belongsTo(() => Category, {
    foreignKey: 'category_id' //Clave foránea que relaciona con la identidad dominante
  })
  public category: BelongsTo<typeof Category>
}
