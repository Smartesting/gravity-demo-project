const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function resetDB() {
  const client = new Client(process.env.DATABASE_URL);
  const email = 'demo@demo.demo'
  const password = bcrypt.hashSync('demo', 10)
  const isAdmin = true
  const name = 'Demo Demo'
  const username = 'demo'
  const subscribeToOwnCards = false
  const createdAt = new Date()
  const updatedAt = new Date()

  await client.connect();
  const drop = await client.query('DELETE FROM user_account WHERE email=$1', [email])
  console.log({ drop })
  const addUser = await client.query('insert into "user_account" ("created_at", "email", "is_admin", "name", "password", "subscribe_to_own_cards", "updated_at", "username") values ($1, $2, $3, $4, $5, $6, $7, $8)',
    [createdAt, email, isAdmin, name, password, subscribeToOwnCards, updatedAt, username])
  console.log({ addUser })

  console.log('DB reset')
}

module.exports.resetDB = resetDB
