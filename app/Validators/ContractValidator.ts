import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ContractValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    start_date: schema.date({
      //* REVISA que si esté en formato de fecha
      format: "yyyy-MM-dd",
    }),
    end_date: schema.date({
      //* REVISA que si esté en formato de fecha
      format: "yyyy-MM-dd",
    }),
    client_id: schema.number([
      rules.required(),
      rules.unsigned(), //que no sea negativo
    ]),
  });

  public messages: CustomMessages = {};
}
