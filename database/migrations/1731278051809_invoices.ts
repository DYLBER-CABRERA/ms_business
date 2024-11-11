import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'invoices'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('date') // Fecha de la factura
      table.integer('total') // Total de la factura
      table.boolean('status') // Estado de la factura
      table.integer('quota_id').unsigned().references('quotas.id').onDelete('CASCADE')
      table.integer('expense_id').unsigned().references('expenses.id').onDelete('CASCADE')


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
