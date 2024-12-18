import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Contract from "App/Models/Contract";
import ContractValidator from "App/Validators/ContractValidator";
import Env from "@ioc:Adonis/Core/Env";
import axios from "axios";
import { rules, schema } from '@ioc:Adonis/Core/Validator'


export default class ContractController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theContract: Contract = await Contract.findOrFail(params.id);

      await theContract.load("routes");
      await theContract.load("quotas");
      await theContract.load("routes");

      return theContract;
    } else {
       const data = request.all();
            console.log(data);
      
            if ("client_id" in data) {
              return await Contract.query().where("client_id", request.input("client_id"));
      
            }
      else if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Contract.query().paginate(page, perPage);
      } else {
        return await Contract.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(ContractValidator);
    const body = request.body();
    const theContract: Contract = await Contract.create(body);
    await theContract.load("quotas");
    await theContract.load("routes");

    await theContract.load("client", (expenseQuery) => {
      expenseQuery.preload("NaturalPeople");
    });

    const user = theContract.client.NaturalPeople?.user_id
    console.log(user);
    
    const userResponse = await axios.get(
      //PARA OBTENER LA INFO DEL USUARIO DESDE MS_SEGURIDAD
      `${Env.get("MS_SECURITY")}/users/${user}`,
      {
        headers: { Authorization: request.headers().authorization || "" },
      }
    );
    if (!userResponse.data.email) {
      //VERIFICAR QUE SI ENCONTRÓ EL EMAIL DE ESE USER
      return {
        message: "El correo del usuario no está disponible.",
      };
    }
    const emailPayload = {
      subject: "Nueva contrato",
      recipient: userResponse.data.email, //ACCEDER AL EMAIL DEL CONDUCTOR QUE HIZO EL GASTO DEL CUAL ES ESA FACTURA
      body_html: `<p>Estimado usuario,</p>

<p>Nos complace informarle que se ha generado un nuevo contrato en nuestro sistema con los siguientes detalles:</p>

<table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
  <tr style="background-color: #f2f2f2;">
    <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Detalle</th>
    <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Información</th>
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>ID del contrato:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theContract.id}</td>
  </tr>
    <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Total:</b></td>
    
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Fecha inicial:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theContract.start_date}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Fecha final:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theContract.end_date}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>ID del cliente:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theContract.client_id}</td>
  </tr>
</table>

<p style="margin-top: 20px;">Si tiene alguna pregunta o necesita más información, no dude en ponerse en contacto con nosotros.</p>

<p>Gracias por utilizar nuestros servicios.</p>

<p style="margin-top: 20px;"><b>Atentamente,</b></p>
<p>Gestión de servicios de carga de productos</p>
`,
    };
    // Llamar al microservicio de notificaciones
    const emailResponse = await axios.post(
      `${Env.get("MS_NOTIFICATIONS")}/send-email`,
      emailPayload
    );
    if (!emailResponse.data || emailResponse.status !== 200) {
      console.warn("No se pudo enviar el email de confirmación.");
    }

    return theContract;
  }

  public async createForClient({ params, request, response  }: HttpContextContract) {
    //await request.validate(ContractValidator);
    const client_id = parseInt(params.client_id, 10)
    const body = request.body();

 // Preparar los datos de validación
 
 const contractData = {
     ...body,
     client_id: client_id
 }
 await this.validateContractData(request, contractData);
         
          

    const theContract: Contract = await Contract.create(contractData);
    await theContract.load("quotas");
    await theContract.load("routes");

    await theContract.load("client", (expenseQuery) => {
      expenseQuery.preload("NaturalPeople");
    });

    const user = theContract.client.NaturalPeople?.user_id
    console.log(user);
    
    const userResponse = await axios.get(
      //PARA OBTENER LA INFO DEL USUARIO DESDE MS_SEGURIDAD
      `${Env.get("MS_SECURITY")}/users/${user}`,
      {
        headers: { Authorization: request.headers().authorization || "" },
      }
    );
    if (!userResponse.data.email) {
      //VERIFICAR QUE SI ENCONTRÓ EL EMAIL DE ESE USER
      return {
        message: "El correo del usuario no está disponible.",
      };
    }
    const emailPayload = {
      subject: "Nueva contrato",
      recipient: userResponse.data.email, //ACCEDER AL EMAIL DEL CONDUCTOR QUE HIZO EL GASTO DEL CUAL ES ESA FACTURA
      body_html: `<p>Estimado usuario,</p>

<p>Nos complace informarle que se ha generado un nuevo contrato en nuestro sistema con los siguientes detalles:</p>

<table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
  <tr style="background-color: #f2f2f2;">
    <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Detalle</th>
    <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Información</th>
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>ID del contrato:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theContract.id}</td>
  </tr>
    <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Total:</b></td>
    
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Fecha inicial:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theContract.start_date}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Fecha final:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theContract.end_date}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>ID del cliente:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theContract.client_id}</td>
  </tr>
</table>

<p style="margin-top: 20px;">Si tiene alguna pregunta o necesita más información, no dude en ponerse en contacto con nosotros.</p>

<p>Gracias por utilizar nuestros servicios.</p>

<p style="margin-top: 20px;"><b>Atentamente,</b></p>
<p>Gestión de servicios de carga de productos</p>
`,
    };
    // Llamar al microservicio de notificaciones
    const emailResponse = await axios.post(
      `${Env.get("MS_NOTIFICATIONS")}/send-email`,
      emailPayload
    );
    if (!emailResponse.data || emailResponse.status !== 200) {
      console.warn("No se pudo enviar el email de confirmación.");
    }

    return theContract;
  }

  public async update({ params, request }: HttpContextContract) {
    const theContract: Contract = await Contract.findOrFail(params.id);
    const body = request.body();
    theContract.start_date = body.start_date;
    theContract.end_date = body.end_date;
    theContract.client_id = body.client_id;

    return await theContract.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theContract: Contract = await Contract.findOrFail(params.id);
    await theContract.delete();
    return response.status(200).json({
      message: "Contrato eliminado con éxito",
    });
  }

  private async validateContractData(request: HttpContextContract['request'], data: any) {
    const validationSchema = schema.create({
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
  
    // Usamos request.validate para validar los datos
    return await request.validate({
      schema: validationSchema,
      data,
     
    })
}
}
