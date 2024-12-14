import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/companies", "CompaniesController.find");
    Route.get("/companies/:id", "CompaniesController.find");
    Route.post("/companies", "CompaniesController.create");
    Route.put("/companies/:id", "CompaniesController.update");
    Route.delete("/companies/:id", "CompaniesController.delete");
})//.middleware(["security"]);
