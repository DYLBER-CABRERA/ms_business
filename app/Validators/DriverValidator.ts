import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number([
      rules.required(), // Asegura que el campo no esté vacío
      rules.unsigned(), //que no sea negativo
    ]),
    license_number: schema.number([
      rules.required(), // Asegura que el campo no esté vacío
      rules.unsigned(), //que no sea negativo
      rules.range(4, 2000000000000000),
    ]),
    expiration_date: schema.date({
      format: "yyyy-MM-dd",
    }),
    phone_number: schema.number([
      rules.required(), // Asegura que el campo no esté vacío
      rules.range(5, 1000000000000),

      rules.unsigned(), //que no sea negativo
    ]),
  });

  public messages: CustomMessages = {};
}
