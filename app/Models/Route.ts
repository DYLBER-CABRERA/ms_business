import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column , BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Vehicle from './Vehicle';

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

  @belongsTo(()=> Contract, {
    foreignKey: 'contract_id'

  })
  public contract: BelongsTo <typeof Contract>

  @belongsTo(()=> Vehicle, {
    foreignKey: 'vehicle_id'

  })
  public Vehicle: BelongsTo <typeof Vehicle>
  
}
