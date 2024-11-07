import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "drivers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("license_number");
      table.dateTime("expiration_date");
      table.string("phone_number"); // Cambiado a string
      table.string("user_id"); //* EL USER YA DEBE ESTAR CREADO Y SE LE ASOCIOA AL CONDUCTOR

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
