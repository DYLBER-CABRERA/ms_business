import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Vehicle from './Vehicle';
import AddreRouteOrder from './AddreRouteOrder';
import Batch from './Batch';


export default class Route extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public startingPlace: string

  @column()
  public endingPlace: string

  @column()
  public distance: number

  @column()
  public deliveryDate: DateTime

  @column()
  public contract_id: number

  @column()
  public vehicle_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relación 1 a N
  @hasMany(() => AddreRouteOrder, {
    foreignKey: "route_id", //Clave foránea que relaciona las categorías dominada
  })
  public addreRouteOrders: HasMany<typeof AddreRouteOrder>;

  //Relación 1 a N
  @hasMany(() => Batch, {
    foreignKey: "route_id", //Clave foránea que relaciona la identidad dominada
  })
  public batches: HasMany<typeof Batch>;

  //Relación 1 a N
  @belongsTo(() => Vehicle, {
    foreignKey: 'vehicle_id'//Clave foránea que relaciona con la identidad dominante
  })
  public Vehicle: BelongsTo<typeof Vehicle>
  
  //Relación 1 a N
  @belongsTo(() => Contract, {
    foreignKey: 'contract_id' //Clave foránea que relaciona las identidad dominada
  })
  public contract: BelongsTo<typeof Contract>
}
