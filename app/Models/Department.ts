import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'


export default class Department extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // con el interrogante indica que es un atributo opcional
  @column()
  public name: string //nombre

  @column()
  public description?: string //descripcion

  @column()
  public cityCapitalId?: number //id de la ciudad capital

  @column()
  public municipalities?: number //numero de municipios

  @column()
  public surface?: number //superficie

  @column()
  public population?: number //poblacion
 
  @column()
  public phonePrefix?: string  //prefijo telefonico

  @column()
  public countryId?: number //id del pais

  @column()
  public regionId?: number //id de la region

  @column.dateTime({ autoCreate: true }) //fecha de creacion
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })//fecha de actualizacion
  public updatedAt: DateTime

  //aqui definimos la relacion de 1 a muchos en este caso definimos que 1 departamento tiene muchos municipios
  @hasMany(() => Municipality,{ //relacion de 1 a n
    //nombre de la clave foranea que permite la relacion bidireccional 1:n
  })
  public municipality: HasMany<typeof Municipality>

}
