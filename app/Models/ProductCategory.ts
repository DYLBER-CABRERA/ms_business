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

  @belongsTo(() => Product, {
    foreignKey: 'product_id' //Clave foránea que relaciona con la categoría dominante
  })
  public product: BelongsTo<typeof Product>

  @belongsTo(() => Category, {
    foreignKey: 'category_id' //Clave foránea que relaciona con la categoría dominante
  })
  public category: BelongsTo<typeof Category>
}
