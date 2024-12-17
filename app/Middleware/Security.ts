import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';//importamos axions para llamar apis
import Env from '@ioc:Adonis/Core/Env';//importamos el .env

export default class Security {

  // code for middleware goes here. ABOVE THE NEXT CALL
    //console.log("saludando desde middleware")//esto se mira que aqui se inicializa el proceso y luego se va al controller
    //luego hago las validaciones
    public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
      let theRequest = request.toJSON()//Epaquete en json la cual es la carta que viene la informacion
      console.log(theRequest);//miramos que viene dentro del paquete osea vine toda la información
      if(theRequest.headers.authorization){//miramos en la request en headers trae la palabra authorization si es asi entra al condicional
        let token = theRequest.headers.authorization.replace("Bearer ", "")//vamos a obtnener el token y viene escrito el bearer y espacio lo que venga el token y cortar el bearer y espacio y se obtenga el token especificamente

        let thePermission: object = {//este es un objeto con el permiso
          url: theRequest.url,//trae la url en este caso las rutas de nuetro proyecto /...
          method: theRequest.method//el metodo es GET para obtenerlo
        }
        try {
          //antes intalamos axion para llamar apis de otro lado 
          //mando el token
          //result-> esta el resultado de haber llamado a la api
          //la respuest viene verdadero o falso si es verdadero puede ingresar si es falso no puede ingresar y se manda el status 401 osea rechazado
          const result = await axios.post(`${Env.get('MS_SECURITY')}/security/permissions-validation`, thePermission,//esta peticion va a ms-security y va a la ruta de permissions-validation y va el permiso que es url de la peticion del cliente y la mando dentro del body
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          console.log("La respuesta de ms-security >" + result.data + "<")
          if (result.data == true) {
            console.log(result.data)
            await next()
          } else {
            console.log("no puede ingresar")
            return response.status(401)
          }
        } catch (error) {
          console.error(error)
          return response.status(401)
        }
      }else{
        return response.status(401)
      }
     
    }
}
