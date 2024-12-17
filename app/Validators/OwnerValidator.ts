import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string([
      rules.required(), // Asegura que el campo no esté vacío
    ]),
    phone_number: schema.number([
      rules.range(100000,9999999999), // Asegura que el número esté en el rango de 1000000000 a 9999999999
      rules.required(), // Asegura que el campo no esté vacío
    ]),

    driver_id: schema.number([
      //*REVISA que el servicio con ese id si exista en la tabla de servicios en la columna id
      rules.exists({ table: "drivers", column: "id" }),
    ]),
  });
  public messages: CustomMessages = {
    'user_id.required': 'El ID de usuario es obligatorio.',
    'phone_number.range': 'El número de teléfono debe estar entre 100000 y 9999999999.',
    'phone_number.required': 'El número de teléfono es obligatorio.',
    'driver_id.exists': 'El ID del conductor no existe.',
    'driver_id.required': 'El ID del conductor es obligatorio.',
  };
}
