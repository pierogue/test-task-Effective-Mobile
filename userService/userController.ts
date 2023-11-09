import {Request, Response} from "express";
import pool from "./db";
import User, {UserUpdate} from "./userModel";

import {createHash} from 'crypto'
import {createLog} from "./historyApi";

class UserController {
    async getAllUsers(req: Request, res:Response){
        res.setHeader('Content-Type', 'text/json');

        const result = await pool.query('SELECT * from users')

        res.send(result.rows)
    }

    async createUser(req:Request<{},{},User>, res:Response){
        const name = req.body.name;
        const password = req.body.password;
        const age = req.body.age;


        const hPassword = createHash('md5').update(password).digest('hex');

        const userId = await pool.query(`INSERT INTO USERS (name, age, password)
                values ('${name}',${age},'${hPassword}') returning id`)
            .then((res)=>res.rows[0])
                .catch((err)=>{console.log(err)});
                await createLog(userId.id, `User ${name} was created. Age:${age}, password : ${hPassword}`)
                res.end('success')
    }

    async updateUser(req:Request<{}, {}, UserUpdate>, res:Response){
        const id = req.body.id;
        const oldData = await pool.query(`select * from users where id = ${id}`)


        if (!oldData.rows[0]) return res.status(400);

        const oldName = oldData.rows[0].name;
        const oldAge = oldData.rows[0].age;
        const oldPassword = oldData.rows[0].password;

        const newName = req.body.newName ?? oldName;
        const newAge = req.body.newAge ?? oldAge;

        let newPassword : string;
        if(req.body.newPassword){
            newPassword = req.body.newPassword;
            newPassword = createHash('md5').update(newPassword).digest('hex');
        }
        else newPassword = oldPassword;



        if (!(newName || newAge || newPassword)) return res.status(400);

        await pool.query(`CALL updateUser(${id}, '${newName}', '${newPassword}', ${newAge})`)
            .then(()=>{
                createLog(id, `User ${oldName} was updated. New name: ${newName}. \
New age: ${newAge}. New password: ${newPassword}`)
                res.status(200).send('success')
            })

    }
}

export default new UserController()