import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department'
import axios from 'axios'

export default class DepartmentsController {
  /**
   * Lista todos los departamentos o un departamento específico con el id
   */
  public async find({ request, params, response }: HttpContextContract) {
    try {
      if (params.id) {
        // Si se proporciona un ID, busca el departamento específico
        const department = await Department.findOrFail(params.id)
        await department.load('municipality') // Carga la relación 'municipalities' asociada al departamento
      
        return response.json(department)
      } else {
        // Si no se proporciona un ID, lista todos los departamentos con paginación
        const page = request.input('page', 1) // Obtiene el número de página de la solicitud, por defecto es 1 si no se proporciona
        const limit = request.input('limit', 10) // Obtiene el límite de elementos por página de la solicitud, por defecto es 10 si no se proporciona
        const departments = await Department.query().paginate(page, limit) // Aplica la paginación con el número de página y el límite de elementos por página

        // Carga la relación 'municipalities' para cada departamento
        for (let department of departments) {
          await department.load('municipality')
        }

        return response.json(departments)
      }
    } catch (error) {
      // Si ocurre un error, devuelve una respuesta con un estado 500 y un mensaje de error
      return response.status(500).json({
        message: 'Error al obtener departamentos',
        error: error.message
      })
    }
  }

 

  /**
   * Obtiene los datos de la API y los guarda en la base de datos
   */
  public async fetchAndStore({ response }: HttpContextContract) {
    try {
       // Realiza una solicitud GET a la API de Colombia para obtener los datos de los departamentos
      const apiResponse = await axios.get('https://api-colombia.com/api/v1/Department')
      //apiResponse es el objeto de respuesta que se obtiene al realizar la solicitud GET a la API de Colombia.
      const departments = apiResponse.data
  // Itera sobre cada departamento obtenido de la API
      for (const dept of departments) {
          // Actualiza o crea un registro en la base de datos para cada departamento
        await Department.updateOrCreate({ id: dept.id }, {
          name: dept.name, // Asigna el nombre del departamento
          description: dept.description,  // Asigna la descripción del departamento
          cityCapitalId: dept.cityCapitalId,// Asigna el ID de la ciudad capital del departamento
          municipalities: dept.municipalities, // Asigna el número de municipios del departamento
          surface: dept.surface, // Asigna la superficie del departamento
          population: dept.population, // Asigna la población del departamento
          phonePrefix: dept.phonePrefix,  // Asigna el prefijo telefónico del departamento
          countryId: dept.countryId,  // Asigna el ID del país al que pertenece el departamento
          regionId: dept.regionId // Asigna el ID de la región a la que pertenece el departamento
        })
      }
  // Devuelve un mensaje de éxito en la respuesta JSON
      return response.json({
        message: 'Departamentos actualizados exitosamente'
      })
    } catch (error) {
       // Si ocurre un error, devuelve una respuesta con un estado 500 y un mensaje de error
      return response.status(500).json({
        message: 'Error al obtener y guardar departamentos',
        error: error.message
      })
    }
  }
}
