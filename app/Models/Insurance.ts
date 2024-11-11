import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehicle from './Vehicle'

export default class Insurance extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public insurance_type: string //nombre de la aseguradora

  @column()
  public start_date: DateTime //fecha de inicio de la poliza

  @column()
  public end_date: DateTime //fecha de finalizacion de la poliza

  @column()
  public insurance_company: string //monto asegurado

  @column()
  public vehicle_id: number //id del vehiculo asegurado

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relacion con la tabla Vehicle un seguro pertenece a un vehiculo 1 a n
  @belongsTo(() => Vehicle ,{
    foreignKey: 'vehicle_id'
  })
  public vehicles: BelongsTo<typeof Vehicle>
}
