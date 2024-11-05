import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Operation from './Operation'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public license_plate: String

  @column()
  public model: String

  @column()
  public capacity: number

  @column()
  public cargo_type: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
  @hasMany(() =>Operation,{ 
    //nombre de la clave foranea que permite la relacion de 1 a n
    foreignKey: 'vehicle_id'
  })
  public operations: HasMany<typeof Operation>

  
}
