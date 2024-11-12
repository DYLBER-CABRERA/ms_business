import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class VehicleDriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    driver_id: schema.number([
      //*REVISA que el conductor con ese id si exista en la tabla de conductores
      rules.exists({ table: "drivers", column: "id" }),
    ]),

    //! PARA CUANDO ESTÉ LA CLASE VEHICLE
    vehicle_id: schema.number([
      //*REVISA que el vehiculo con ese id si exista en la tabla de conductores
      rules.exists({ table: "vehicles", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {
    "driver_id.exists": "El id del conductor no existe.",
    "vehicle_id.exists": "El id del vehiculo no existe.",
  };
}
