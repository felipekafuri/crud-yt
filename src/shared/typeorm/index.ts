import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      type: process.env.NODE_ENV === 'test' ? 'sqlite' : defaultOptions.type,
      database:
        process.env.NODE_ENV === 'test'
          ? './src/__tests__/database/database.test.sqlite'
          : defaultOptions.database
    })
  )
}
