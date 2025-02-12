import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RouteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    starting_place: schema.string({}, [
      rules.required(), // Asegura que el campo no esté vacío
      rules.alpha(), // Asegura que el valor solo contenga letras
      rules.maxLength(255), // Asegura que el valor no exceda los 255 caracteres
    ]),
    ending_place: schema.string({}, [
      rules.required(), // Asegura que el campo no esté vacío
      rules.alpha(), // Asegura que el valor solo contenga letras
      rules.maxLength(255), // Asegura que el valor no exceda los 255 caracteres
    ]),

    distance: schema.number([
      rules.required(), // Asegura que el campo no esté vacío
      rules.range(0, 3000), // Asegura que el valor esté entre 0 y 3000 km
      rules.unsigned(), // Asegura que el valor no sea negativo
    ]),

    delivery_date: schema.date({
      format: "yyyy-MM-dd",

    }),
    contract_id: schema.number([
      rules.unsigned(),
      rules.exists({ table: "contracts", column: "id" }),
    ]),
    vehicle_id: schema.number([
      rules.unsigned(),
      rules.exists({ table: "vehicles", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {

    'distance.required': 'La distancia es obligatoria.',
    'distance.range': 'La distancia debe estar entre 0 y 3000 km.',
    'distance.unsigned': 'La distancia no puede ser negativa.',
    'delivery_date.date': 'La fecha de entrega debe tener el formato yyyy-MM-dd.',
    'contract_id.exists': 'El contrato especificado no existe.',
    'contract_id.unsigned': 'El ID del contrato no puede ser negativo.',
    'vehicle_id.exists': 'El vehículo especificado no existe.',
    'vehicle_id.unsigned': 'El ID del vehículo no puede ser negativo.',
  }

}
