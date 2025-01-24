const express = require("express")
const path = require("path")
const UsersComponent = require("./UsersComponent")
const app = new express()
const PORT = 8080

const usersComponent = new UsersComponent("./state.json")

// Per abilitare il parsing delle form in formato urlencoded
app.use(express.urlencoded({ extended: true }))

// Middleware per servire i file statici
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.sendStatus(501) //TODO
})

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/login.html"))
})

app.post("/login", (req, res) => {
  console.log(req.body)
  res.sendStatus(501) //TODO
})

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/signup.html"))
})

app.post("/signup", (req, res) => {
  console.log(req.body)
  res.sendStatus(501) //TODO
})

app.listen(PORT, () => console.log("server listening on port", PORT))