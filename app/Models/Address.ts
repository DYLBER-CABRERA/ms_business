import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'
import DistributionCenter from './DistributionCenter'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public street: string //calle

  @column()
  public number: string //numero#

  @column()
  public neighborhood: string //barrio

  @column()
  public reference: string //referencia

  @column()
  public municipality_id: number //municipio_id


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @hasOne(() => DistributionCenter,{
    foreignKey: 'address_id'
  })
  public distributionCenter: HasOne<typeof DistributionCenter>


  @belongsTo(() => Municipality,{
    foreignKey: 'municipality_id'
  })
  public municipality: BelongsTo<typeof Municipality>


}
