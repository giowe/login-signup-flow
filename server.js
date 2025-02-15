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

app.post("/login", async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  if (!usersComponent.getUser(email)) {
    res.sendStatus(400)
  } else {
    const user = await usersComponent.login(email, password)
    if (user) {
      res.json(user)
    } else {
      res.sendStatus(400)
    }
  }  
})

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/signup.html"))
})

app.post("/signup", async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  if (usersComponent.getUser(email)) {
    res.sendStatus(400)
  } else {
    await usersComponent.create(email, password)
    res.sendStatus(200)
  }
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "./public/404.html"))
})

app.listen(PORT, () => console.log("server listening on port", PORT))