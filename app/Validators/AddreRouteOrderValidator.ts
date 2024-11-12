import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddreRouteOrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
      route_id: schema.number([
        rules.required(),
        rules.unsigned(),
        rules.exists({ table: 'routes', column: 'id' }),
      ])
    })
  

  public messages: CustomMessages = {
    'route_id.required': 'La ruta es requerida',
    'route_id.unsigned': 'La ruta debe ser un número entero'
  }
}
