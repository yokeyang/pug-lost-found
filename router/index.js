module.exports = (app) =>{

    const Router = require('koa-router')
    const sql = require('../middlewares/sql')
    const checkcookie = require('../middlewares/checkcookie')
    var router = new Router()
    router.get('/',checkcookie,sql.getgoods,async (ctx) =>{
        await ctx.render('home',{
            data:{
                name:ctx.name,
                tel:ctx.tel,
                goods:ctx.datas,
                posts:ctx.posted,
                comments:ctx.comments
            }
        })
    })

    router.post('/post',checkcookie,sql.checkgoods,async (ctx,next)=>{
        ctx.body = {error:false}
    })
    router.post('/comment',checkcookie,sql.checkComment,async (ctx,next)=>{
        ctx.body = {error:false}
    })
    router.post('/del',checkcookie,sql.delInfo,async (ctx,next)=>{
        ctx.body = {error:false}
    })
    require('./login')(router)
    app.use(router.routes())
        .use(router.allowedMethods())
}