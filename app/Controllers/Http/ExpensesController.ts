import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Expense from "App/Models/Expense";
import ExpenseValidator from "App/Validators/ExpenseValidator";

export default class ExpensesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theExpense: Expense = await Expense.findOrFail(params.id);

      //  await theExpense.load("shift"); //devuelve la info de que sillas tiene el teatro
      await theExpense.load("driver"); //*Devuelve que conductor ...
      await theExpense.load("service"); 

      return theExpense;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Expense.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await Expense.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(ExpenseValidator); //*cuando se llame este endpoint antes de mandar valida los datos de acuerdo a los parametros del validador

    const body = request.body();
    const theExpense: Expense = await Expense.create(body);
    return theExpense;
  }

  public async update({ params, request }: HttpContextContract) {
    const theExpense: Expense = await Expense.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta

    theExpense.amount = body.amount; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theExpense.description = body.description;
    theExpense.service_id = body.service_id;
    theExpense.driver_id = body.driver_id;

    //!PARA LA RELACION CON EL DUEÑO
    //   theExpense.owner_id = body.owner_id;

    return await theExpense.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theTheater: Expense = await Expense.findOrFail(params.id); //buscarlo
    response.status(204);

    return await theTheater.delete(); //el teatro que se encontro, eliminelo
  }
}
