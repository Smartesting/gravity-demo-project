const initKnex = require('knex')
const knexfile = require('planka-server/db/knexfile')
const seed = require('planka-server/db/seeds/default')

async function resetDB() {
  const knex = initKnex(knexfile)

  // Log all SQL queries executed
  // knex.on('query', function (queryData) {
  //   console.log(queryData.sql)
  // })

  await knex.migrate.rollback(undefined, true)
  await knex.migrate.latest()
  await knex.seed.run()

  console.log('DB reset')
}

module.exports.resetDB = resetDB
