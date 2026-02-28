const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 8000
app.use(express.json());

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
    try {
        if (!conn) return res.status(500).json({ message: 'Database not connected' });
        const [rows] = await conn.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
})

// path = POST /users สำหรับเพิ่ม user ใหม่
app.post('/users', async (req, res) => {
   try {
       const user = req.body;
       if (!user || Object.keys(user).length === 0) return res.status(400).json({ message: 'Missing user data' });
       if (!conn) return res.status(500).json({ message: 'Database not connected' });
       const [result] = await conn.query('INSERT INTO users SET ?', user);
       console.log('insert result:', result);
       res.status(201).json({
           message: 'User created successfully',
           insertId: result.insertId
       });
   } catch (error) {
       console.error('Error creating user:', error);
       res.status(500).json({ message: 'Error creating user', error: error.message });
   }
})

// path GET /users/:id สำหรับดึง get ข้อมูล user ที่มี id ตรงกับที่ส่งมา
app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!conn) return res.status(500).json({ message: 'Database not connected' });
        const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length === 0) {
            const err = new Error('User not found');
            err.statusCode = 404;
            throw err;
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching user:', error.message || error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error fetching user',
            error: error.message || error
        });
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const [result] = await conn.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            message: 'User deleted successfully'
        });

    } catch (error) {
        console.error('Error delete user:', error.message || error);
        res.status(500).json({
            message: 'Error delete user',
            error: error.message
        });
    }
});

app.listen(port, async () => {
    try {
        await initDBConnection();
        console.log(`Server is running on port ${port}`)
    } catch (error) {
        console.error('Failed to initialize DB connection:', error);
        process.exit(1);
    }
});