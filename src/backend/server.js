import app from "./app"

import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/projects')

// Express startup
const port = 3001
app.listen(port, () => console.log(`Server running on port ${port}`))