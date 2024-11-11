import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehicle from './Vehicle'

export default class VehicleOwner extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public acquisition_date: DateTime

  @column()
  public  ownership_percentage: number

  @column()
  public  owner_id: number

  @column()
  public  vehicle_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Vehicle, {
    foreignKey: "vehicle_id",
  })
  public vehicle: BelongsTo<typeof Vehicle>;
}
