import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import NaturalPerson from './NaturalPerson'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public company_type: string

  @column()
  public fiscal_address: string

  @column()
  public client_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relacion de 1 a 1 
  @hasOne(() => NaturalPerson, {
    foreignKey: "company_id", //Clave foránea que relaciona la identidad dominada
  })
  public NaturalPeople: HasOne<typeof NaturalPerson>;
}

