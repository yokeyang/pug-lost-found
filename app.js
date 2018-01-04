const Koa = require('koa')
    ,views = require('koa-views')
    ,static = require('koa-static')
    ,app = new Koa()
    ,convert = require('koa-convert')
    ,serve = require('koa-static2')
    ,bodyparser = require('koa-bodyparser')



app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(views(__dirname + '/view', { extension: 'pug' }))
app.use(convert(serve("static",__dirname + '/public')))


require('./router/index')(app)



app.listen(3000)
console.log('starting at port 3000')