import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"; // Importa el contrato de contexto HTTP de AdonisJS
import Municipality from "App/Models/Municipality"; // Importa el modelo Municipality
import axios from "axios"; // Importa la biblioteca axios para realizar solicitudes HTTP

export default class MunicipalitiesController {
  /**
   * Lista todas las ciudades
   */
  public async find({ request, params, response }: HttpContextContract) {
    try {
      if (params.id) {
        // Si se proporciona un ID, busca el municipio específico
        const municipality = await Municipality.findOrFail(params.id);
        await municipality.load("department"); // Carga la relación 'department' asociada al municipio
        await municipality.load("addresses"); // Carga la relación 'addresses' asociada al municipio
        await municipality.load("distributionCenters"); // Carga la relación 'distributionCenter' asociada a cada dirección
        await municipality.load("operations"); // Carga la relación 'address' asociada a cada centro de distribución
        return response.json(municipality);
      } else {
        // Si no se proporciona un ID, lista todos los municipios con paginación
        const page = request.input("page", 1); // Obtiene el número de página de la solicitud, por defecto es 1 si no se proporciona
        const limit = request.input("limit", 10); // Obtiene el límite de elementos por página de la solicitud, por defecto es 10 si no se proporciona
        const municipalities = await Municipality.query()
          .preload("department")
          .preload("addresses")
          .paginate(page, limit); // Aplica la paginación con el número de página y el límite de elementos por página

        return response.json(municipalities);
      }
    } catch (error) {
      // Si ocurre un error, devuelve una respuesta con un estado 500 y un mensaje de error
      return response.status(500).json({
        message: "Error al obtener ciudades",
        error: error.message,
      });
    }
  }

  /**
   * Lista las ciudades de un departamento específico
   */
  //municipalitiesByDepartment
  public async municipalitiesByDepartment({
    params,
    request,
    response,
  }: HttpContextContract) {
    try {
      const page = request.input("page", 1);
      const limit = request.input("limit", 10);

      const municipalities = await Municipality.query() // Inicia una nueva consulta
        .where("department_id", params.departmentId) // Filtra la consulta por el ID del departamento proporcionado en los parámetros de la solicitud
        .paginate(page, limit); // Aplica la paginación con el número de página y el límite de elementos por página

      return response.json(municipalities); // Devuelve los municipios paginados en la respuesta JSON
    } catch (error) {
      return response.status(500).json({
        message: "Error al obtener ciudades del departamento",
        error: error.message, // Detalle del error
      });
    }
  }

  /**
   * Obtiene los datos de la API y los guarda en la base de datos
   */
  public async fetchAndStore({ response }: HttpContextContract) {
    try {
      const apiResponse = await axios.get(
        "https://api-colombia.com/api/v1/City"
      ); // Realiza una solicitud GET a la API Colombia para obtener los datos de los municipios
      const municipalities = apiResponse.data; // Almacena los datos de los municipios obtenidos de la API
      //Inicia un bucle for que itera sobre cada elemento en el array municipalities.
      for (const municipality of municipalities) {
        //updateOrCreate busca un registro en la base de datos que coincida con las condiciones especificadas en el primer argumento
        //updateOrCreate del modelo Municipality para actualizar o crear un registro en la base de datos.
        await Municipality.updateOrCreate(
          { id: municipality.id },
          {
            name: municipality.name, // Asigna el nombre del municipio
            description: municipality.description, // Asigna la descripción del municipio
            surface: municipality.surface, // Asigna la superficie del municipio
            population: municipality.population, // Asigna la población del municipio
            postalCode: municipality.postalCode, // Asigna el código postal del municipio
            departmentId: municipality.departmentId, // Asigna el ID del departamento al que pertenece el municipio
          }
        );
      }

      return response.json({
        message: "Ciudades actualizadas exitosamente", // Mensaje de éxito
      });
    } catch (error) {
      return response.status(500).json({
        message: "Error al obtener y guardar ciudades", // Mensaje de error
        error: error.message, // Detalle del error
      });
    }
  }

  public async getDistributionCenters({
    params,
    response,
  }: HttpContextContract) {
    try {
      //con el metodo findOrFail busca un municipio en especifico en la base de datos utilizando el valor de la calse primaria osea por su id
      const municipality = await Municipality.findOrFail(params.id);
      await municipality.load("distributionCenters"); //carga la relacion de centro de distribucion
      return response.json(municipality.distributionCenters); //Devuelve los centros de distribución cargados en formato JSON como respuesta a la solicitud HTTP
    } catch (error) {
      if (error.code === "E_ROW_NOT_FOUND") {
        return response.status(404).json({
          message: "Municipio no encontrado",
        });
      }
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }
}
