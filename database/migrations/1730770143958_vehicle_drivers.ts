import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "vehicle_drivers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      //!PARA LA RELACIÓN CON VEHICULOS
       table.integer("vehicle_id").unsigned().references("vehicles.id");
      // .onDelete("CASCADE"); //FORMA DE crear una clave foranea, identificador, referencia a la clase pelicula y eliminacion en cascada

      table.integer("driver_id").unsigned().references("drivers.id");
      //    .onDelete("CASCADE");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
