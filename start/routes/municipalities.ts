import Route from '@ioc:Adonis/Core/Route'

// Rutas para activar los controladores

Route.group(() => {
  // Rutas para ciudades
  Route.get('municipalities', 'MunicipalitiesController.find')
  Route.get('municipalities/:id', 'MunicipalitiesController.find')
  Route.get('departments/:departmentId/municipalities', 'MunicipalitiesController.municipalitiesByDepartment')
  Route.get('/municipalities/:id/distributionCenters', 'MunicipalitiesController.getDistributionCenters')
  Route.post('municipalities/fetch', 'MunicipalitiesController.fetchAndStore')
}).prefix('api').middleware(['security'])
