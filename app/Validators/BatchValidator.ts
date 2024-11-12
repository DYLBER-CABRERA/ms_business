import { schema, CustomMessages , rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BatchValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    weight: schema.number([
      rules.unsigned(),
      rules.range(10, 100),
    ])
    
  })
  public messages: CustomMessages = {
    'weight.unsigned': 'El peso no puede ser negativo.',
    'weight.range': 'El peso debe estar entre 10 y 100.'
  }
}
