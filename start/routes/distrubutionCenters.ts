//rutas para activar los controladores
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/distributionCenter", "DistributionCentersController.find");
    Route.get("/distributionCenter/:id", "DistributionCentersController.find");
    Route.post("/distributionCenter", "DistributionCentersController.create");
    Route.put("/distributionCenter/:id", "DistributionCentersController.update");
    Route.delete("/distributionCenter/:id", "DistributionCentersController.delete");
})//.middleware(["security"]);



