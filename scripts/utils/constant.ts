// import dotenv from 'dotenv';
// import path from "path";
// dotenv.config({ path: 'env/.env.local' });

let currentEnv = process.env.TEST_ENV;
if (currentEnv == 'sit1') {
    // dotenv.config({ path: 'env/.env.sit1' });
} else {
    // dotenv.config({ path: 'env/.env.local' });
}
 // syntax là process.env. ...
export const UI_HOST = process.env.UI_HOST;
export const UI_PORT = process.env.UI_PORT;
export const UI_URL = `${UI_HOST}:${UI_PORT}`;
export const UI_ADMIN_PATH = `${UI_URL}/admin/login`;
export const UI_PRODUCTS_PATH = `${UI_URL}/api/products`;
export const ADMIN_USER_NAME = 'tony@gmail.com';
export const ADMIN_PASSWORD = '17101406';