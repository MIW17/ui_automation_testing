import {test, expect} from '../support/fixtures'
import {DatabaseHelper, IDatabaseHelper} from "../support/utils/databaseHelper"
import {customerQueries} from "../support/queries"

test.describe('Admin user', async () => {
    let db: IDatabaseHelper

    test.beforeAll( async () => {
        db = DatabaseHelper.getDatabaseInstance()
        await db.connect()
    })

    test.afterAll( async () => {
        await db?.disconnect()
    })

    test('Login as Admin user', async ( { page, login, logout }) => {
        const testData = {
            email: 'tony@gmail.com',
            password: 'Testing01'
        }

        await test.step('Verify if admin user exists in database', async () => {
            const result = await db.query(
                customerQueries.getAdminUserByEmail,
                [testData.email]
            )
            expect(result.length).toBeGreaterThan(0)
            expect(result[0].email).toBe(testData.email)
        })

        await page.goto('http://localhost:3000/admin/login')
        await login('tony@gmail.com', 'Testing01')
        await logout()
    })
})