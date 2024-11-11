import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
import Route from './Route'
import Batch from './Batch'

export default class AddreRouteOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  start_address_id: number

  @column()
  end_address_id: number

  @column()
  route_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  @belongsTo(() => Address, {
    foreignKey: 'start_address_id',
  })
  public start_address: BelongsTo<typeof Address>

  @belongsTo(() => Address, {
    foreignKey: 'end_address_id',
  })
  public end_address: BelongsTo<typeof Address>

  @belongsTo(() => Route,{
    foreignKey: 'route_id' //Clave foránea que relaciona con la clase dominante
  })
  public route: BelongsTo<typeof Route>

  @hasOne(()=>Batch,{
    foreignKey: 'addre_route_orders_id' //Clave foránea que relaciona con la clase dominada 
  })
  public batch: HasOne<typeof Batch>

}
