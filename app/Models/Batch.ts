import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Route from './Route'
import Product from './Product'

export default class Batch extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public weight: number

  @column()
  public route_id: number

  @column()
  public addre_route_orders_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Product, {
    foreignKey: "batch_id", //Clave foránea que relaciona la identidad dominada
  })
  public batches: HasMany<typeof Product>;

  @belongsTo(() => Route,{
    foreignKey: 'route_id'//Clave foránea que relaciona con la identidad dominante
  })
  public route: BelongsTo<typeof Route>


}
