import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    user_id:schema.string(),
    service_id: schema.number([
      //*REVISA que el conductor con ese id si exista en la tabla de conductores
      rules.exists({ table: "services", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {};
}
