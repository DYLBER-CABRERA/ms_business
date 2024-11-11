import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
import Route from './Route'

export default class AddreRouteOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  address_id: number //direccion ID

  @column()
  route_id: number //ruta ID

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  @belongsTo(() => Address, {
    foreignKey: 'address_id',
  })
  public addresses: BelongsTo<typeof Address>



  @belongsTo(() => Route,{
    foreignKey: 'route_id'
  })
  public route: BelongsTo<typeof Route>

}
