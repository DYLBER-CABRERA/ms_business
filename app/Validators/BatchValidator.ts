import { schema, CustomMessages , rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BatchValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    weight: schema.number([
      rules.unsigned(),
      rules.range(10, 100),
    ]),
    route_id: schema.number([
      rules.required(),
      rules.exists({ table: 'routes', column: 'id' }),
    ]),
    address_route_orders: schema.number([
      rules.required(),
      rules.exists({ table: 'address_route_orders', column: 'id' })
    ])
    
  })
  public messages: CustomMessages = {
    'weight.unsigned': 'El peso no puede ser negativo.',
    'weight.range': 'El peso debe estar entre 10 y 100.',
    'route_id.required': 'El ID de la ruta es obligatorio.',
    'route_id.exists': 'La ruta especificada no existe en la base de datos.',
    'address_route_orders.required': 'El ID de la orden de ruta de dirección es obligatorio.',
    'address_route_orders.exists': 'La orden de ruta de dirección especificada no existe en la base de datos.'
  }
}
