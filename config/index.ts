import * as dotenv from 'dotenv'
import path from 'path'

// 1) Determine the current environment, by default is local
const env = process.env.NODE_ENV || 'local';

// 2) Load the corresponding .env file based on the current environment
// process.cwd() returns the current working directory of the Node.js process
// path.resolve() resolves a sequence of paths or path segments into an absolute path
// E.g, the current working directory is /Users/username/project and env is '.env.local', then envFilePath will be /Users/username/project/.env.local
const envFilePath = path.resolve(process.cwd(), `env/.env.${env}`)

// 3) Load the environment variables from the .env file into process.env
dotenv.config({ path: envFilePath })

// 4) Export the DB env variables for use in other parts of the application
export const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}
