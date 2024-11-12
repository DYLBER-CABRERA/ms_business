import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Invoice from 'App/Models/Invoice'
import InvoiceValidator from 'App/Validators/InvoiceValidator';

export default class InvoicesController {
    public async find({ request, params }: HttpContextContract) {
        //Buscar el elemento dado una condición 
        if (params.id) {
            let theInvoice: Invoice = await Invoice.findOrFail(params.id);
            await theInvoice.load("quota")
            await theInvoice.load("expense")

            return theInvoice;
          } else {
            const data = request.all();
            if ("page" in data && "per_page" in data) {
              const page = request.input("page", 1);
              const perPage = request.input("per_page", 20);
              return await Invoice.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
            } else {
              return await Invoice.query(); //es para que espere a la base de datos
            }
          }

    }

    public async create({ request }: HttpContextContract) {
        await request.validate(InvoiceValidator);
        const body = request.body();
        const theInvoice: Invoice = await Invoice.create(body);
        await theInvoice.load("quota")
        await theInvoice.load("expense")

       
        return theInvoice;
    }

    public async update({ params, request }: HttpContextContract) {
        const theInvoice: Invoice = await Invoice.findOrFail(params.id);
        const body = request.body();
        theInvoice.date =body.date;
        theInvoice.total = body.total;
        theInvoice.status = body.status;
        theInvoice.quota_id = body.quota_id;
        theInvoice.expense_id = body.expense_id;
        return await theInvoice.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theInvoice: Invoice = await Invoice.findOrFail(params.id);
            response.status(204);
            return await theInvoice.delete();
    }
}
