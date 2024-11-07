import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class VehicleDriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    driver_id: schema.number([
      //*REVISA que el conductor con ese id si exista en la tabla de conductores
      rules.exists({ table: "drivers", column: "id" }),
    ]),

   
    //   vehicle_id: schema.number([
    //*REVISA que el conductor con ese id si exista en la tabla de conductores
    //     rules.exists({ table: "vehicles", column: "id" }),
    //  ]),
  });

  public messages: CustomMessages = {};
}
