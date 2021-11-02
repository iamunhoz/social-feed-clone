const secrets = {
  user: 'admin-mern',
  password: 'asumdois345',
  uri: 'mern-projects.uuzhb.mongodb.net',
  defaultDb: 'classicalPeople',
  jwt: 'zubizarreta'
}
const mongoCredentials = `${secrets.user}:${secrets.password}@${secrets.uri}/${secrets.defaultDb}`

const config = {
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 8080,
	jwtSecret: secrets.jwt,
	mongoUri: 'mongodb+srv://' + mongoCredentials + '?retryWrites=true&w=majority'
}

export default config

