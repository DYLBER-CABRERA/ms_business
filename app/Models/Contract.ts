import { DateTime } from 'luxon'
import { BaseModel, column, hasMany , HasMany} from '@ioc:Adonis/Lucid/Orm'
import Route from './Route'
import Quota from './Quota'

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

  @hasMany(() => Route,{
    foreignKey: 'contract_id'
  })
  public routes: HasMany <typeof Route>

  //Relacion con la tabla Quota un contrato tiene muchas quotas 1 a n
  @hasMany(() => Quota,{
    foreignKey: 'contract_id'
  })
  public quotas: HasMany <typeof Quota>
}
