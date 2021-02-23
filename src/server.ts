import express from 'express'

const app = express()

const PORT = 3333

app.get('/users', (req, res) => {
   return res.json({ message: 'Hello NLW' })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
