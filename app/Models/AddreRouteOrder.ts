import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
import Route from './Route'
import Batch from './Batch'
import Note from './Note'

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

  @belongsTo(() => Route, {
    foreignKey: 'route_id' //Clave foránea que relaciona con la clase dominante
  })
  public route: BelongsTo<typeof Route>

  @hasOne(() => Batch, {
    foreignKey: 'addre_route_orders_id' //Clave foránea que relaciona con la clase dominada 
  })
  public batch: HasOne<typeof Batch>

  @hasMany(()=> Note,{
    foreignKey: 'addre_route_orders_id' //Clave foránea que relaciona con la clase dominada 
  })
  public notes: HasMany<typeof Note>

}
