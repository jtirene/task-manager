import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { Config } from 'sst/node/config'

const connection = connect({
	host: 'aws.connect.psdb.cloud',
	username: Config.DATABASE_USERNAME,
	password: Config.DATABASE_PASSWORD,
})

export const db = drizzle(connection)
