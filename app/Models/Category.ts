import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public parentCategory: number | null

  @hasMany(() => Category, {
    foreignKey: 'parentCategory', // Clave foránea que relaciona las categorías hijas
  })
  public subCategories: HasMany<typeof Category>

  @belongsTo(() => Category, {
    foreignKey: 'parentCategory', //Clave foránea que relaciona con la categoría padre
  })
  public parent: BelongsTo<typeof Category>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
