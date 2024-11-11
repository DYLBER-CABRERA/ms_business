import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "expenses";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("amount");
      table.integer("service_id").unsigned().references("services.id").onDelete("CASCADE"); //FORMA DE crear una clave foranea, identificador, referencia a la clase pelicula y eliminacion en cascada
      table.integer("driver_id").unsigned().references("drivers.id");
      //    .onDelete("CASCADE");

      table.integer("owner_id").unsigned().references("owners.id");
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
