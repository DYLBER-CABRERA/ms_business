/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});
// Importaciones de rutas
import "./routes/vehicles";
import "./routes/drivers";
import "./routes/shifts"; 
import "./routes/services";
import "./routes/expenses";
import "./routes/administrators";
import "./routes/restaurants";
import "./routes/hotels";
import "./routes/vehicleDrivers";
import './routes/departments';
import './routes/municipalities';
import './routes/addresses';
import './routes/distrubutionCenters';
import './routes/contracts';
import './routes/operations';
import './routes/routes';
import './routes/addreRouteOrders';
import './routes/categories'
import './routes/batches'
import './routes/clients'
import './routes/products'



