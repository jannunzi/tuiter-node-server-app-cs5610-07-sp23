const UserController = (app) => {

    const users = [
        {firstName: 'John', lastName: 'Cusack', age: 20, username: 'john123', password: '123'},
        {firstName: 'Jane', lastName: 'Tarzan', age: 21, username: 'jane123', password: '123'},
        {firstName: 'Jack', lastName: 'Skillington', age: 22, username: 'jack123', password: '123'}
    ]

    const register = (req, res) => {
        const name = req.params.name
        const age = parseInt(req.params.age)
        const user = {name, age}
        users.push(user)
        res.json(user)
    }

    let currentUser = null
    app.get('/register/:name/:age', register)
    app.get('/login/:username/:password', (req, res) => {
        const username = req.params.username
        const password = req.params.password
        const user = users.find(user => user.username === username && user.password === password)
        if (user) {
            currentUser = user
            res.json(user)
        } else {
            res.sendStatus(404)
        }
    })
    app.get('/currentUser', (req, res) => {
        if (!currentUser) {
            res.sendStatus(404)
            return
        }
        res.json(currentUser)
    })
    app.get('/logout', (req, res) => {
        currentUser = null
        res.sendStatus(200)
    })

    app.get('/users', (req, res) => {
        res.json(users)
    })

    app.get('/users/:name', (req, res) => {
        const name = req.params.name
        const user = users.find(user => user.name === name)
        res.json(user)
    })
    app.get('/profile/:name', (req, res) => {
        const name = req.params.name
        const profile = {
            name: name,
            age: 20,
            email: `${name}@gmail.com`
        }
        res.json(profile)
    })

}

module.exports = UserController