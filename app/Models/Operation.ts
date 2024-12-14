import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'
import Vehicle from './Vehicle'

export default class Operation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_date: DateTime //fecha y hora de la factura

  @column()
  public end_date: DateTime //fecha y hora de la factura

  @column()
  public municipality_id: number //monto total de la factura
  
  @column()
  public vehicle_id: number//estado de la factura

  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
  @belongsTo(() => Municipality,{
    //nombre de la clave foranea que permite la relacion bidireccional 1:1  en este caso viene de theater
    foreignKey: 'municipality_id'
  })
  public municipality: BelongsTo<typeof Municipality>

    
  @belongsTo(() => Vehicle,{
    //nombre de la clave foranea que permite la relacion bidireccional 1:1  en este caso viene de theater
    foreignKey: 'vehicle_id'
  })
  public vehicle: BelongsTo<typeof Vehicle>
}
