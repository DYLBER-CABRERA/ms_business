import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'batches'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.double('weight')
      table.integer('route_id').unsigned().references('routes.id')
      table.integer('addre_route_orders').unsigned().references('addre_route_orders.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
