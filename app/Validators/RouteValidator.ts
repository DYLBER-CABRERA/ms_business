import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RouteValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    distance: schema.number([
      rules.required(), // Asegura que el campo no esté vacío
      rules.range(0, 3000), // Asegura que el valor esté entre 0 y 3000 km
      rules.unsigned(), // Asegura que el valor no sea negativo
    ]),
  })


  public messages: CustomMessages = {
    'distance.required': 'La distancia es obligatoria.',
    'distance.range': 'La distancia debe estar entre 0 y 3000 km.',
    'distance.unsigned': 'La distancia no puede ser negativa.'
  }
}
