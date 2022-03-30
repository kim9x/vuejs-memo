const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const database = require("./database")

const memos = [];

app.use(bodyParser.json());

app.get('/api/memos', async(req, res) => {
    const result = await database.run("SELECT * FROM memos");
    res.send(result)
})

app.post("/api/memos", async(req, res) => {
    await database.run(`INSERT INTO memos (content) VALUES (?)`, [req.body.content]);

    // memos.push(req.body.content);
    const result = await database.run("SELECT * FROM memos");
    res.send(result)
})

app.put("/api/memos/:id", async(req, res) => {
    await database.run(`UPDATE memos SET content = ? WHERE id = ?`, [req.body.content, req.params.id]);
    // memos[req.params.id] = req.body.content;
    // res.send(memos);

    const result = await database.run("SELECT * FROM memos");
    res.send(result)
})

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)
})

// app.get('/api/memos', (req, res) => {
//     res.send(memos)
// })

// app.post("/api/memos", (req, res) => {
//     memos.push(req.body.content);
//     res.send(memos)
// })

// app.put("/api/memos/:idx", (req, res) => {
//     memos[req.params.idx] = req.body.content;
//     res.send(memos);
// })

// app.listen(port, () => {

//     console.log(`Example app listening on port ${port}`)
// })