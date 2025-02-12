//rutas para activar los controladores
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/quotas", "QuotasController.find");
    Route.get("/quotas/:id", "QuotasController.find");
    Route.post("/quotas", "QuotasController.create");
    Route.post('/quotas/contract/:contract_id', 'QuotasController.createForContract');
    Route.put("/quotas/:id", "QuotasController.update");
    Route.delete("/quotas/:id", "QuotasController.delete");
})