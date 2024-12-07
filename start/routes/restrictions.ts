// FILE: start/routes.ts
import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/restrictions', 'RestrictionsController.find')
  Route.get('/restrictions/:id', 'RestrictionsController.find')
  Route.post('/restrictions', 'RestrictionsController.create') // Crear restricciones
  Route.delete('/restrictions/:id', 'RestrictionsController.delete') // Borrar restricciones
})