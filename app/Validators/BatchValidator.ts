import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BatchValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    weight: schema.number([
      rules.unsigned(),
      rules.required(),
      rules.range(10, 100)
    ]),
    route_id: schema.number([
      rules.exists({ table: 'routes', column: 'id' }),
      rules.required()
    ]),
    addre_route_orders: schema.number([
      rules.exists({ table: 'addre_route_orders', column: 'id' }),
      rules.required()
    ])
  })

  public messages: CustomMessages = {
    'weight.unsigned': 'El peso no puede ser negativo.',
    'weight.range': 'El peso debe estar entre 10 y 100.',
    'route_id.required': 'El ID de la ruta es obligatorio.',
    'route_id.exists': 'La ruta especificada no existe en la base de datos.',
    'addre_route_orders.required': 'El ID de la orden de ruta de dirección es obligatorio.',
    'addre_route_orders.exists': 'La orden de ruta de dirección especificada no existe en la base de datos.'
  }
}