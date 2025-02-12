import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddrRouteOrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    address_id: schema.number([
      rules.exists({ table: 'routes', column: 'id' }),
      rules.unsigned(),
      rules.required()
    ]),

    route_id: schema.number([
      rules.required(),
      rules.unsigned
    ])
  })


  public messages: CustomMessages = {}
}
