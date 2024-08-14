import type { MigrationContext, ReversibleMigration } from '@db/types';

const tableName = 'invalid_auth_token';

export class CreateInvalidAuthTokenTable1723627610222 implements ReversibleMigration {
	async up({ schemaBuilder: { createTable, column } }: MigrationContext) {
		await createTable(tableName)
			.withColumns(column('token').text.primary, column('expiresAt').timestamp().notNull)
			.withIndexOn('token', true);
	}

	async down({ schemaBuilder: { dropTable } }: MigrationContext) {
		await dropTable(tableName);
	}
}
