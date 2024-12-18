import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Expense from "App/Models/Expense";
import ExpenseValidator from "App/Validators/ExpenseValidator";

import { rules, schema } from "@ioc:Adonis/Core/Validator";


export default class ExpensesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theExpense: Expense = await Expense.findOrFail(params.id);
      await theExpense.load("driver"); //*Devuelve que conductor tiene esa clase...
      await theExpense.load("service");
      await theExpense.load("owner");

      return theExpense;
    } else {
     //sino viene el identificador en la ruta
           const data = request.all(); //listar a todos pero lo manda por tramos
           console.log(data);
     
           if ("driver_id" in data) {
             return await Expense.query().where(
               "driver_id",
               request.input("driver_id")
             );
           } else if ("service_id" in data) {
             return await Expense.query().where(
               "service_id",
               request.input("service_id")
             );
            } else if ("owner_id" in data) {
              return await Expense.query().where(
                "owner_id",
                request.input("owner_id")
              );
            }else if ("page" in data && "per_page" in data) {
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
    await theExpense.load("driver"); //*Devuelve que conductor tiene esa clase...
    await theExpense.load("service");
    await theExpense.load("owner");
    return theExpense;
  }

   public async createForDriver({
      params,
      request,
      response,
    }: HttpContextContract) {
      const driver_id = parseInt(params.driver_id, 10);
  
      // Preparar los datos de validación
      const body = request.body();
      const expenseData = {
        ...body,
        driver_id: driver_id,
      };
      // Llamar a la función de validación
      await this.validateExpenseData(request, expenseData);
  
      const theExpense: Expense = await Expense.create(expenseData);
      await theExpense.load("driver"); //*Devuelve que conductor tiene esa clase...
      await theExpense.load("service");
      await theExpense.load("owner");
      return response.status(201).json(theExpense);
    }
  
    public async createForService({
      params,
      request,
      response,
    }: HttpContextContract) {
      const service_id = parseInt(params.service_id, 10);
  
      // Preparar los datos de validación
      const body = request.body();
      const expenseData = {
        ...body,
        service_id: service_id,
      };
  
      console.log(expenseData);
  
      // Llamar a la función de validación
      await this.validateExpenseData(request, expenseData);
  
      const theExpense: Expense = await Expense.create(expenseData);
      await theExpense.load("driver"); //*Devuelve que conductor tiene esa clase...
      await theExpense.load("service");
      await theExpense.load("owner");
      return response.status(201).json(theExpense);
    }

    public async createForOwner({
      params,
      request,
      response,
    }: HttpContextContract) {
      const owner_id = parseInt(params.owner_id, 10);
  
      // Preparar los datos de validación
      const body = request.body();
      const expenseData = {
        ...body,
        owner_id: owner_id,
      };
      // Llamar a la función de validación
      await this.validateExpenseData(request, expenseData);
  
      const theExpense: Expense = await Expense.create(expenseData);
      await theExpense.load("driver"); //*Devuelve que conductor tiene esa clase...
      await theExpense.load("service");
      await theExpense.load("owner");
      return response.status(201).json(theExpense);
    }

  public async update({ params, request }: HttpContextContract) {
    const theExpense: Expense = await Expense.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta

    theExpense.amount = body.amount; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theExpense.service_id = body.service_id;
    theExpense.driver_id = body.driver_id;
    await theExpense.load("driver"); //*Devuelve que conductor tiene esa clase...
    await theExpense.load("service");
    await theExpense.load("owner");
    return await theExpense.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theExpense: Expense = await Expense.findOrFail(params.id); //buscarlo
    response.status(204);

    return await theExpense.delete(); //el teatro que se encontro, eliminelo
  }

  private async validateExpenseData(
    request: HttpContextContract["request"],
    data: any
  ) {
    const validationSchema = schema.create({
      amount: schema.number([
        rules.required(), // Asegura que el campo no esté vacío
  
        rules.unsigned(), //que no sea negativo
        rules.range(50, 100000000),
      ]), //rango
  
      driver_id: schema.number([
        //*REVISA que el conductor con ese id si exista en la tabla de conductores
        rules.exists({ table: "drivers", column: "id" }),
      ]),
  
      service_id: schema.number([
        //*REVISA que el servicio con ese id si exista en la tabla de servicios en la columna id
        rules.exists({ table: "services", column: "id" }),
      ]),
  
      owner_id: schema.number([
        //*REVISA que el servicio con ese id si exista en la tabla de servicios en la columna id
        rules.exists({ table: "owners", column: "id" }),
      ]),
    });

    // Usamos request.validate para validar los datos
    return await request.validate({
      schema: validationSchema,
      data,
    });
  }
}
