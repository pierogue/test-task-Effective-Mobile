import {Pool} from 'pg';

const pool = new Pool({
    host:'localhost',
    user:'postgres',
    database:'test_task',
    password:'0711',
    max:10
})

export default pool;