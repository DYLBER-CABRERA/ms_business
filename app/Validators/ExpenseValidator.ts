import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ExpenseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    amount: schema.number([
      rules.required(), // Asegura que el campo no esté vacío

      rules.unsigned(), //que no sea negativo
      rules.range(50, 100000000),
    ]), //rango

    driver_id: schema.number([
      //*REVISA que el conductor con ese id si exista en la tabla de conductores
      rules.exists({ table: "drivers", column: "id" }),
    ]),

    service_id: schema.number([
      //*REVISA que el servicio con ese id si exista en la tabla de servicios en la columna id
      rules.exists({ table: "services", column: "id" }),
    ]),

    owner_id: schema.number([
      //*REVISA que el servicio con ese id si exista en la tabla de servicios en la columna id
      rules.exists({ table: "owners", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {
    "amount.required": "El monto es obligatorio.",
    "amount.unsigned": "El monto no puede ser negativo",
    "driver_id.exists": "El id del conductor no existe.",
    "service_id.exists": "El id del servicio no existe.",
    "owner_id.exists": "El id del dueño no existe.",
  };
}
