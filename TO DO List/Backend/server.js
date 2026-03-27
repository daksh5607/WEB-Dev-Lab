const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("db.sqlite");

db.run(`CREATE TABLE IF NOT EXISTS tasks(
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT NOT NULL,
priority TEXT DEFAULT 'Medium',
isDone INTEGER DEFAULT 0,
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// GET tasks
app.get("/tasks",(req,res)=>{
db.all("SELECT * FROM tasks",(err,rows)=>{
res.json(rows);
});
});

// ADD task
app.post("/tasks",(req,res)=>{
const {title,priority}=req.body;

db.run(
"INSERT INTO tasks(title,priority) VALUES(?,?)",
[title,priority],
function(){
res.json({id:this.lastID});
});
});

// UPDATE task
app.put("/tasks/:id",(req,res)=>{
const {title,priority}=req.body;

db.run(
"UPDATE tasks SET title=?,priority=? WHERE id=?",
[title,priority,req.params.id]
);

res.send("updated");
});

// TOGGLE status
app.patch("/tasks/:id/status",(req,res)=>{

db.run(
"UPDATE tasks SET isDone = CASE WHEN isDone=0 THEN 1 ELSE 0 END WHERE id=?",
[req.params.id]
);

res.send("status updated");

});

// DELETE
app.delete("/tasks/:id",(req,res)=>{

db.run(
"DELETE FROM tasks WHERE id=?",
[req.params.id]
);

res.send("deleted");

});

app.listen(3000,()=>{
console.log("Server running on port 3000");
});
