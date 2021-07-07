const secrets = {
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  uri: process.env.MONGO_URI,
  defaultDb: process.env.MONGO_DEFAULT_DB,
  jwt: process.env.JWT_SECRET
}
const mongoCredentials = `${secrets.user}:${secrets.password}@${secrets.uri}/${secrets.defaultDb}`

const config = {
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT,
	jwtSecret: secrets.jwt,
	mongoUri: 'mongodb+srv://' + mongoCredentials + '?retryWrites=true&w=majority'
}

export default config

