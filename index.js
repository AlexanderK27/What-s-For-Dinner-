const app = require('./app')
const PORT = process.env.PORT

async function start() {
    try {
        // await mongoose.connect(process.env.MONGODB_URL, {
        //     useNewUrlParser: true,
        //     useCreateIndex: true,
        //     useUnifiedTopology: true
        // })
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error:', e.message)
        process.exit(1)
    }
}

start()