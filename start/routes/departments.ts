import Route from '@ioc:Adonis/Core/Route'

// Rutas para activar los controladores

Route.group(() => {
  // Rutas para departamentos
  Route.get('departments', 'DepartmentsController.find')
  Route.get('departments/:id', 'DepartmentsController.find')
  Route.post('departments/fetch', 'DepartmentsController.fetchAndStore')
  Route.post('departments', 'DepartmentsController.create')
  Route.put('departments/:id', 'DepartmentsController.update')
  Route.delete('departments/:id', 'DepartmentsController.delete')
  
}).prefix('api')//.middleware(['security'])