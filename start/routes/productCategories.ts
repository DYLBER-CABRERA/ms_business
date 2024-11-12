import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/productCategories", "ProductCategoriesController.find");
    Route.get("/productCategories/:id", "ProductCategoriesController.find");
    Route.post("/productCategories", "ProductCategoriesController.create");
    Route.put("/productCategories/:id", "ProductCategoriesController.update");
    Route.delete("/productCategories/:id", "ProductCategoriesController.delete");
})
