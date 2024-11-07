import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    amount: schema.number([
      rules.unsigned(), //que no sea negativo
      rules.range(50, 100000000),
    ]), //rango

    description: schema.string([
      rules.required(), // Asegura que el campo no esté vacío

      rules.alphaNum({
        allow: ["space", "underscore", "dash"], //es decir que soporta espacios guion bajo
      }),
      rules.minLength(2),
      rules.maxLength(200),
    ]), //que rechaze la peticion en lugar de ingresar información basura a la base de datos
    date: schema.date({
      //* REVISA que si esté en formato de fecha
      format: "yyyy-MM-dd",
    }),
  });

  public messages: CustomMessages = {};
}
