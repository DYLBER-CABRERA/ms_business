import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column} from "@ioc:Adonis/Lucid/Orm";
import Service from "./Service";


export default class Restaurant extends BaseModel {
  //ES UNA
  @column({ isPrimary: true })
  public id: number;

  @column()
  public cuisine_type: string;
  @column()
  public service_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
  @belongsTo(() => Service, {
    //*hotel -servicio
    foreignKey: "service_id",
  })
  public service: BelongsTo<typeof Service>;


  
}
