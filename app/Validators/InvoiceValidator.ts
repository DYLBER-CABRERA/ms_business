import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class InvoiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    date: schema.date(
      { format: "yyyy-MM-dd" },
      [rules.after("today")] // Asegura que la fecha de la factura sea posterior a la fecha actual
    ),

    total: schema.number([
      rules.required(),
      rules.unsigned(), // Asegura que la cantidad sea un número entero positivo y no negativo
    ]),
    status: schema.boolean([
      rules.required(), // Asegura que el campo no esté vacío
    ]),

    quota_id: schema.number([
      rules.exists({ table: "quotas", column: "id" }),
      rules.unsigned(), // Asegura que el ID del contrato no sea negativo
      rules.required(),
    ]), // Asegura que el campo no esté vacío

    expense_id: schema.number([
      rules.exists({ table: "expenses", column: "id" }),
      rules.unsigned(), // Asegura que el ID del contrato no sea negativo
      rules.required(),
    ]), // Asegura que el campo no esté vacío
  });

  public messages: CustomMessages = {
    "date.date":
      "La fecha de la factura debe tener el formato yyyy-MM-dd HH:mm:ss.",
    "date.after":
      "La fecha de la factura debe ser posterior a la fecha actual.",
    "total.required": "El total es obligatorio.",
    "total.unsigned": "El total no puede ser negativo.",
    "status.required": "El estado es obligatorio.",
    "quota_id.exists": "La cuota especificada no existe.",
    "quota_id.unsigned": "El ID de la cuota no puede ser negativo.",
    "quota_id.required": "El ID de la cuota es un campo obligatorio.",
    "expense_id.exists": "El gasto especificado no existe.",
    "expense_id.unsigned": "El ID del gasto no puede ser negativo.",
    "expense_id.required": "El ID del gasto es un campo obligatorio.",
  };
}
