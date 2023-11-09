import pool from "./db.js";

class HistoryController {
    async getHistory(req, res){
        const response = await pool.query('SELECT * from history');
        res.send(response.rows);
    }

    async getHistoryByPage(req, res){
        const page = parseInt(req.params.page);
        if(page !== page) return res.send('incorrect page number')

        let min = parseInt(req.query.min);
        if(min !== min) min = 0;

        let max = parseInt(req.query.max)
        if(max !== max) max = Number.MAX_SAFE_INTEGER

        const response = await pool.query(`SELECT * from history where user_id < ${max}
            and user_id > ${min} limit 5 offset ${(page - 1) * 5} `)
        res.send(response.rows)
    }

    async createLog(req, res){
        const userId = req.body.user_id;
        const description = req.body.description;

        console.log(req.body)

        await pool.query(`CALL createLog('${userId}', '${description}')`)
            .then(()=>res.status(200).send('success'))
            .catch((err)=>console.log(err))

    }
}

export default new HistoryController()