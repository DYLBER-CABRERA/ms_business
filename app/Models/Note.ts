import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import AddreRouteOrder from './AddreRouteOrder'

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public fecha: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => AddreRouteOrder,{
    foreignKey: 'addre_route_orders_id' //Clave foránea que relaciona con la clase dominante
  })
  public addreRouteOrder: BelongsTo<typeof AddreRouteOrder>
  
}
