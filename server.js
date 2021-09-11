const express = require('express')
const {resolve} = require('https://git.heroku.com/agility-e-commerce-front-end.git')
const app = express()


app.use('/', express.static(
  resolve(__dirname,'./build')
))

app.listen(process.env.PORT || 3000, (err)=>{
  if(err){
    return console.log(err);
  }
  console.log('Biuld com sucesso')
})
