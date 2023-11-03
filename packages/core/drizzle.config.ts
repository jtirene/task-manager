import type { Config } from 'drizzle-kit'

const connection = {
	user: process.env['SST_Secret_value_DATABASE_USERNAME'],
	password: process.env['SST_Secret_value_DATABASE_PASSWORD'],
	host: 'aws.connect.psdb.cloud',
}

export default {
	out: './migrations/',
	strict: true,
	schema: './src/**/*.sql.ts',
	verbose: true,
	driver: 'mysql2',
	dbCredentials: {
		connectionString: `mysql://${connection.user}:${connection.password}@${connection.host}:3306/test?ssl={"rejectUnauthorized":true}`,
	},
	tablesFilter: ['tm_'],
} satisfies Config
