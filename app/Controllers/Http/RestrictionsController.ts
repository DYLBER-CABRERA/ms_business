import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from "@ioc:Adonis/Core/Env";
import axios from 'axios';
import RestrictionValidator from 'App/Validators/RestrictionValidator';
import Restriction from 'App/Models/Restriction';
import { Exception } from '@adonisjs/core/build/standalone';

export default class RestrictionsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRestriction: Restriction = await Restriction.findOrFail(params.id)
            await theRestriction.load("municipality")
            return theRestriction;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Restriction.query().paginate(page, perPage); 
                //return Restriction
            } else {
                return await Restriction.query()
            }
        }
    }

    public async create({ request, response }: HttpContextContract) {
        try {
          // Validar la solicitud
          await request.validate(RestrictionValidator)
          const body = request.body()
          const theRestriction: Restriction = await Restriction.create(body)
    
          // Cargar relaciones necesarias
          await this.loadRelations(theRestriction)
          //await theRestriction.load('municipality')
    
          // Verificar que las relaciones se hayan cargado correctamente
    
          const operations = theRestriction.municipality?.operations
          if (!operations || operations.length === 0) {
            return response.status(400).json({ message: "No se encontraron operaciones para el municipio." })
          }
          // Iterar sobre las operaciones y vehículos asociados
          for (const operation of operations) {
            const vehicle = operation.vehicle
            if (!vehicle) {
              continue
            }
    
            for (const vehicleOwner of vehicle.vehicleOwners) {
              const userOwner = vehicleOwner.owner?.user_id
              if (!userOwner) {
                continue
              }
    
              // Obtener información del usuario desde el microservicio de seguridad
              const userResponse = await this.getUserInfo(userOwner, request.headers().authorization)
    
              if (!userResponse.data.email) {
                return response.status(400).json({ message: "El correo del usuario no está disponible." })
              }
    
              // Enviar correo electrónico
              await this.sendEmail(userResponse.data.email, theRestriction)
            }
          }
    
          return response.status(201).json(theRestriction)
        } catch (error) {
          // Manejo de errores de validación
          if (error.messages) {
            return response.badRequest({ errors: error.messages.errors })
          }
          // Manejo de otros errores
          throw new Exception(
            error.message || "Error al procesar la solicitud",
            error.status || 500
          )
        }
      }
    
    

    //------------------------------------------------------------------------------------------------
    public async delete({ params, response }: HttpContextContract) {
        const theRestriction: Restriction = await Restriction.findOrFail(params.id);
        await theRestriction.delete();
        return response.status(200).json({
            message:'Restrictione eliminado con éxito',
        });
    }
    private async loadRelations(theRestriction: Restriction) {
        
        await theRestriction.load('municipality', (municipalityQuery) => {
          municipalityQuery.preload('operations', (operationQuery) => {
            operationQuery.preload('vehicle', (vehicleQuery) => {
              vehicleQuery.preload('vehicleOwners', (vehicleOwnersQuery) => {
                vehicleOwnersQuery.preload('owner')
              })
            })
          })
        })
      }

      private async getUserInfo(userId: string, authorization: string | undefined) {
        return await axios.get(`${Env.get('MS_SECURITY')}/users/${userId}`, {
          headers: { Authorization: authorization || '' },
        })
      }


      private async sendEmail(recipient: string, theRestriction: Restriction) {
        const emailPayload = {
          subject: 'Nueva factura',
          recipient: recipient,
          body_html: `<p>descripcion:${theRestriction.description}</p><p>fecha:${theRestriction.date_start}</p>
          <p>fecha:${theRestriction.date_end}</p>
          `,
        }
    
        const emailResponse = await axios.post(`${Env.get('MS_NOTIFICATIONS')}/send-email`, emailPayload)
    
        if (!emailResponse.data || emailResponse.status !== 200) {
          console.warn('No se pudo enviar el email de confirmación.')
        }
      }


}
      