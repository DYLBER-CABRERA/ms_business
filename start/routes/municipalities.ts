import Route from '@ioc:Adonis/Core/Route'

// Rutas para activar los controladores

Route.group(() => {
  // Rutas para ciudades
  Route.get('municipalities', 'MunicipalitiesController.find')
  Route.get('municipalities/:id', 'MunicipalitiesController.find')
  Route.get('departments/:departmentId/municipalities', 'MunicipalitiesController.municipalitiesByDepartment')
  Route.get('/municipalities/:id/distributionCenters', 'MunicipalitiesController.getDistributionCenters')
  Route.post('municipalities/fetch', 'MunicipalitiesController.fetchAndStore')
  Route.post('municipalities', 'MunicipalitiesController.create')
  Route.put('municipalities/:id', 'MunicipalitiesController.update')
  Route.delete('municipalities/:id', 'MunicipalitiesController.delete')
}).prefix('api')//.middleware(['security'])
