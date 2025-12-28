const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fs = require('fs');
const data_parsed = JSON.parse(fs.readFileSync('./task.json', 'utf-8'));
let id = data_parsed.tasks.length + 1;

const validateTask = (req, res, next) => {
    const { title, description, completed, priority } = req.body;
    if (title === undefined || description === undefined || completed === undefined || typeof completed !== 'boolean') {
        return res.status(400).send('Invalid task input');
    }
    next();
}

const validateTaskId = (req, res, next) => {
    const id = req.params.id;
    if (!id || !data_parsed.tasks.find((task) => task.id === parseInt(id))) {
        return res.status(404).send('Invalid task ID');
    }
    next();
}

app.get('/tasks', (req, res) => {
    const queries = req.query;
    let tasks = [...data_parsed.tasks];

    if (queries.completed) {
        const completed = queries.completed === 'true';
        tasks = tasks.filter((task) => task.completed === completed);
    }

    tasks.sort((a, b) => {
        if (a.created_on && b.created_on) {
            return new Date(a.created_on) - new Date(b.created_on);
        }
        return 0;
    });

    res.send(tasks);
})

app.get('/tasks/:id', validateTaskId, (req, res) => {
    const id = req.params.id;
    const task = data_parsed.tasks.find((task) => task.id === parseInt(id));
    res.send(task);
})

app.post('/tasks', validateTask, (req, res) => {
    const task = req.body;
    data_parsed.tasks.push({
        id: id++,
        title: task.title,
        description: task.description,
        completed: task.completed,
        priority: task.priority,
        created_on: new Date(),
        updated_on: new Date()
    });
    // fs.writeFileSync('./task.json', JSON.stringify(data_parsed));
    res.status(201).send(task);
})

app.put('/tasks/:id', validateTaskId, validateTask, (req, res) => {
    const id = req.params.id;
    const task = data_parsed.tasks.find((task) => task.id === parseInt(id));
    task.title = req.body.title;
    task.description = req.body.description;
    task.completed = req.body.completed;
    // fs.writeFileSync('./task.json', JSON.stringify(data_parsed));
    data_parsed.tasks = data_parsed.tasks.map((task) => {
        if (task.id === parseInt(id)) {
            return {
                id: task.id,
                title: task.title,
                description: task.description,
                completed: task.completed,
                priority: task.priority,
                created_on: task.created_on,
                updated_on: new Date()
            };
        }
        return task;
    });
    res.status(200).send(task);
})

app.get('/tasks/priority/:level', (req, res) => {
    const level = req.params.level;
    const tasks = data_parsed.tasks.filter((task) => task.priority === level);
    res.status(200).send(tasks);
})

app.delete('/tasks/:id', validateTaskId, (req, res) => {
    const id = req.params.id;
    const task = data_parsed.tasks.find((task) => task.id === parseInt(id));
    data_parsed.tasks = data_parsed.tasks.filter((task) => task.id !== parseInt(id));
    // fs.writeFileSync('./task.json', JSON.stringify(data_parsed));
    res.status(200).send(task);
})

// app.listen(port, (err) => {
//     if (err) {
//         return console.log('Something bad happened', err);
//     }
//     console.log(`Server is listening on ${port}`);
// });



module.exports = app;