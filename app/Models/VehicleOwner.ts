import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehicle from './Vehicle'
import Owner from './Owner'

export default class VehicleOwner extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public acquisition_date: DateTime //fecha y hora de la factura

  @column()
  public  ownership_percentage: number//monto total de la factura

  @column()
  public  owner_id: number//estado de la factura

  @column()
  public  vehicle_id: number //Vehiculo ID  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //!PARA LA RELACIÓN CON VEHICLE
  @belongsTo(() => Vehicle, {
    foreignKey: "vehicle_id",
  })
  public vehicle: BelongsTo<typeof Vehicle>;

  //!PARA LA RELACIÓN CON OWNER
  @belongsTo(() => Owner, {
    foreignKey: "owner_id",
  })
  public owner: BelongsTo<typeof Owner>;

}
