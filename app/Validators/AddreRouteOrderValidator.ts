import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddreRouteOrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
 
    start_address_id: schema.number([
        rules.exists({ table: 'addresses', column: 'id' }),
        rules.unsigned(),
        rules.required()
      ]),
  
      end_address_id: schema.number([
        rules.exists({ table: 'addresses', column: 'id' }),
        rules.unsigned(),
        rules.required()
      ]),
  
      route_id: schema.number([
        rules.required(),
        rules.unsigned(),
        rules.exists({ table: 'routes', column: 'id' }),
      ])
    })
  


  public messages: CustomMessages = {
    'startAddress_id.required': 'La dirección de inicio es requerida',
    'startAddress_id.unsigned': 'La dirección de inicio debe ser un número entero',
    'startAddress_id.exists': 'La dirección de inicio no existe',
    'endAddress_id.required': 'La dirección de fin es requerida',
    'endAddress_id.unsigned': 'La dirección de fin debe ser un número entero',
    'endAddress_id.exists': 'La dirección de fin no existe',
    'route_id.required': 'La ruta es requerida',
    'route_id.unsigned': 'La ruta debe ser un número entero'
  }
}
