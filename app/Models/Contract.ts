import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Route from './Route'
import Client from './Client'

export default class Contract extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_date: DateTime

  @column()
  public end_date: DateTime

  @column()
  public client_id: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relacion 1 A N
  @hasMany(() => Route, {
    foreignKey: 'contract_id' //Clave foránea que relaciona la identidad dominada
  })
  public routes: HasMany<typeof Route>

  //Relacion 1 A N
  @belongsTo(() => Client, {
    foreignKey: 'client_id'//Clave foránea que relaciona con la clase dominante
  })
  public client: BelongsTo<typeof Client>
}
