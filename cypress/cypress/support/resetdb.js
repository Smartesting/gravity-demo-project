const { Client } = require("pg");
const bcrypt = require("bcryptjs");

async function truncateDB() {
	const client = new Client(
		process.env.DATABASE_URL || "postgres://postgres@localhost:5431/planka",
	);

	await client.connect();
	await client.query("TRUNCATE TABLE project CASCADE");
	await client.query("TRUNCATE TABLE user_account CASCADE");
	await client.query("TRUNCATE TABLE session CASCADE");
	await client.query("TRUNCATE TABLE board CASCADE");
	await client.query("TRUNCATE TABLE project_manager CASCADE");
	await client.query("TRUNCATE TABLE board_membership CASCADE");
	await client.query("TRUNCATE TABLE label CASCADE");
	await client.query("TRUNCATE TABLE list CASCADE");
	await client.query("TRUNCATE TABLE card CASCADE");
	await client.query("TRUNCATE TABLE card_label CASCADE");
	await client.query("TRUNCATE TABLE action CASCADE");
	await client.query("TRUNCATE TABLE task CASCADE");
	await client.query("TRUNCATE TABLE card_membership CASCADE");
	await client.query("TRUNCATE TABLE card_subscription CASCADE");
	await client.query("TRUNCATE TABLE attachment CASCADE");
	await client.query("TRUNCATE TABLE notification CASCADE");
	await client.query("TRUNCATE TABLE archive CASCADE");
	await client.query("TRUNCATE TABLE migration CASCADE");
	await client.query("TRUNCATE TABLE migration_lock CASCADE");

	console.log("DB truncate");
}

async function insertTable(tables) {
	const client = new Client(
		process.env.DATABASE_URL || "postgres://postgres@localhost:5431/planka",
	);
	await client.connect();
	for (const table of tables) {
		switch (table.table) {
			case "user_account":
				await client.query(
					'insert into "user_account" ("id", "email", "password", "is_admin", "name", "username", "phone", "organization", "subscribe_to_own_cards", "created_at", "updated_at", "deleted_at", "language", "password_changed_at", "avatar") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
					[
						table.id,
						table.email,
						table.password,
						table.is_admin,
						table.name,
						table.username,
						table.phone,
						table.organization,
						table.subscribe_to_own_cards,
						table.created_at,
						table.updated_at,
						table.deleted_at,
						table.language,
						table.password_changed_at,
						table.avatar,
					],
				);
				break;
			case "project":
				await client.query(
					'insert into "project" ("id", "name", "background", "created_at", "updated_at", "background_image") values ($1, $2, $3, $4, $5, $6)',
					[
						table.id,
						table.name,
						table.background,
						table.created_at,
						table.updated_at,
						table.background_image,
					],
				);
				break;
			case "board":
				await client.query(
					'insert into "board" ("id", "project_id", "position", "name", "created_at", "updated_at") values ($1, $2, $3, $4, $5, $6)',
					[
						table.id,
						table.project_id,
						table.position,
						table.name,
						table.created_at,
						table.updated_at,
					],
				);
				break;
			case "project_manager":
				await client.query(
					'insert into "project_manager" ("id", "project_id", "user_id", "created_at", "updated_at") values ($1, $2, $3, $4, $5)',
					[table.id, table.project_id, table.user_id, table.created_at, table.updated_at],
				);
				break;
			case "board_membership":
				await client.query(
					'insert into "board_membership" ("id", "board_id", "user_id", "created_at", "updated_at", "role", "can_comment") values ($1, $2, $3, $4, $5, $6, $7)',
					[
						table.id,
						table.board_id,
						table.user_id,
						table.created_at,
						table.updated_at,
						table.role,
						table.can_comment,
					],
				);
				break;
			case "list":
				await client.query(
					'insert into "list" ("id", "board_id", "position", "name", "created_at", "updated_at") values ($1, $2, $3, $4, $5, $6)',
					[
						table.id,
						table.board_id,
						table.position,
						table.name,
						table.created_at,
						table.updated_at,
					],
				);
				break;
			/*case 'card_membership':

                                  break;*/
			/*case 'card':

                                  break;*/
			/*case 'card_label':

                                  break;*/
			/*case 'action':

                                  break;*/
			/*case 'task':

                                  break;*/
			/*case 'card_subscription':

                                  break;*/
			/*case 'attachment':

                                  break;*/
			/*case 'notification':

                                  break;*/
			/*case 'archive':

                                  break;*/
			/*case 'migration':

                                  break;*/
			/*case 'migration_lock':

                                  break;*/
			/*case 'session':

                                  break;*/
		}
	}
}

module.exports.truncateDB = truncateDB;
module.exports.insertTable = insertTable;
