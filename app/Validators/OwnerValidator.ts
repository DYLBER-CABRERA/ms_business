import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string([
      rules.required(), // Asegura que el campo no esté vacío
    ]),

    driver_id: schema.number([
      //*REVISA que el servicio con ese id si exista en la tabla de servicios en la columna id
      rules.exists({ table: "drivers", column: "id" }),
    ]),
  });
  public messages: CustomMessages = {};
}
