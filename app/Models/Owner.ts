import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Driver from "./Driver";
import VehicleOwner from "./VehicleOwner";

export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: string;
  @column()
  public phone_number: number;
  @column()
  public driver_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
  
  @belongsTo(() => Driver, {
    foreignKey: "driver_id",
  })
  public driver: BelongsTo<typeof Driver>;

    
  @hasMany(() => VehicleOwner,{
    foreignKey: 'owner_id',
  })
  public vehicleOwners: HasMany <typeof VehicleOwner>

  

}
