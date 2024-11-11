import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RestaurantValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cuisine_type: schema.string([
      rules.required(), // Asegura que el campo no esté vacío

      rules.alphaNum({
        allow: ["space", "underscore", "dash"], //es decir que soporta espacios guion bajo
      }),
    ]),
    service_id: schema.number([
      //*REVISA que el conductor con ese id si exista en la tabla de conductores
      rules.exists({ table: "services", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {};
}
