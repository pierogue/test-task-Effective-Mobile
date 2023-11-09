import pg from "pg";

const pool = new pg.Pool({
    host:'localhost',
    user:'postgres',
    database:'test_task',
    password:'0711',
    max:10,
})

export default pool;