import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Department from './Department'
import Address from './Address'
import DistributionCenter from './DistributionCenter'
import Operation from './Operation'
import Restriction from './Restriction'


export default class Municipality extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string //nombre

  @column()
  public description?: string //descripcion

  @column()
  public surface?: number //superficie

  @column()
  public population?: number //poblacion

  @column()
  public postal_code?: string //codigo postal

  @column()
  public department_id: number //id del departamento

  @column.dateTime({ autoCreate: true }) //fecha de creacion
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true }) //fecha de actualizacion
  public updatedAt: DateTime

  @belongsTo(() => Department,{
       foreignKey: 'department_id'
  }) //relacion de 1 a n
  public department: BelongsTo<typeof Department>

  @hasMany(() => Address,{ 
    //nombre de la clave foranea que permite la relacion de 1 a n
    foreignKey: 'municipality_id'
  })
  public addresses: HasMany<typeof Address>

  @hasMany(() =>DistributionCenter,{ 
    //nombre de la clave foranea que permite la relacion de 1 a n
    foreignKey: 'municipality_id'
  })
  public distributionCenters: HasMany<typeof DistributionCenter>

  
  @hasMany(() =>Operation,{ 
    //nombre de la clave foranea que permite la relacion de 1 a n
    foreignKey: 'municipality_id'
  })
  public operations: HasMany<typeof Operation>

  @hasMany(() =>Restriction,{ 
    //nombre de la clave foranea que permite la relacion de 1 a n
    foreignKey: 'municipality_id'
  })
  public restrictions: HasMany<typeof Restriction>

  

}
