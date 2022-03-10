const app = require('./app')
const port = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.send('App is up and running')
})


// port listening
app.listen(port,() => {
    console.log('Server is up on port ' + port)
})
