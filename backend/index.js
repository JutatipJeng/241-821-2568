const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const port = 8000
app.use(bodyParser.json());

let conn = null
const initDBConnection = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8821
    })
}

//path = GET /users สำหรับ get ข้อมูล user ทั้งหมด
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
})

// path = POST /users สำหรับเพิ่ม user ใหม่
app.post('/users', async (req, res) => {
   let user = req.body;
   const results = await conn.query('INSERT INTO users SET ?', user);
   console.log('results:', results);
    res.json({
        message: 'User created successfully',
        data: results[0]
    });
})

app.listen(port, async () => {
    await initDBConnection();
    console.log(`Server is running on port ${port}`)
});