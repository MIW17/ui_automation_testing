import { Client } from 'pg'
import { dbConfig } from '../../config';

export interface IDatabaseHelper {
    connect(): Promise<void>
    disconnect(): Promise<void>
    query(queryString: string, params?: any[]): Promise<any[]>
}

export class DatabaseHelper implements IDatabaseHelper {
    client: Client

    private constructor(client: Client) {
        this.client = client
    }

    public static getDatabaseInstance(): IDatabase {
        const client = new Client(dbConfig)
        return new DatabaseHelper(client)
    }

    async connect(): Promise<void> {
        await this.client.connect()
    }

    async disconnect(): Promise<void> {
        await this.client.end()
    }

    async query(queryString: string, params?: any[]): Promise<any[]> {
        try {
            const res = await this.client.query(queryString, params)
            return res.rows
        } catch (err) {
            console.error('Database query error:', err)
            throw err
        }
    }
}
