import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'

export default class AddrRouteOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  startAddress_id: number

  @column()
  endAddress_id: number

  @column()
  route_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Address,{
    foreignKey: 'address_id'
  })
  public address: BelongsTo<typeof Address>
}
