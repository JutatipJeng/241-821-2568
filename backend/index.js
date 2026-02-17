const express = require('express');
const app = express();

const PORT = 8000;
app.use(express.json());


let users = [];
let counter = 1;
app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter;
    counter++;
    users.push(user);
    res.json({
        message: 'User data received successfully',
        user: user
    });
});


app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;

    let selectedindex = users.findIndex(user => user.id == id);

    if (selectedindex === -1) {
        return res.status(404).json({
            message: 'User not found',
            id: id
        });
    }

    if (updatedUser.name) {
        users[selectedindex].name = updatedUser.name;
    }

    if (updatedUser.age) {
        users[selectedindex].age = updatedUser.age;
    }

    res.json({
        message: 'User updated successfully',
        user: users[selectedindex],
        indexUpdated: selectedindex
    });
});

app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;

    let selectedindex = users.findIndex(user => user.id == id);

    if (selectedindex === -1) {
        return res.status(404).json({
            message: 'User not found',
            id: id
        });
    }

    updatedUser.id = id;
    users[selectedindex] = updatedUser;

    res.json({
        message: 'User updated successfully',
        user: updatedUser,
        indexUpdated: selectedindex
    });
});
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;

    let selectedindex = users.findIndex(user => user.id == id);
    
    if (selectedindex === -1) {
        return res.status(404).json({
            message: 'User not found',
            id: id
        });
    }

    users.splice(selectedindex, 1);

    res.json({
        message: 'User deleted successfully',
        indexDeleted: selectedindex
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});