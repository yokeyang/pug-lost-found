module.exports = (router) =>{
    const KoaBody = require('koa-body')
    const checkcookie = require('../middlewares/checkcookie')
    const sql = require('../middlewares/sql')
    router.post('/login', sql.checkLogin, async (ctx, next) => {
        try {
            ctx.cookies.set(
                'name',
                ctx.result.user,
                {
                    domain: 'localhost',  // 写cookie所在的域名
                    maxAge: 10 * 60 * 1000, // cookie有效时长
                    httpOnly: false,  // 是否只用于http请求中获取
                    overwrite: true  // 是否允许重写
                }
            )
            ctx.cookies.set(
                'tel',
                '130-xxxx-xxxx',
                {
                    domain: 'localhost',  // 写cookie所在的域名
                    maxAge: 10 * 60 * 1000, // cookie有效时长
                    httpOnly: false,  // 是否只用于http请求中获取
                    overwrite: true  // 是否允许重写
                }
            )
            ctx.cookies.set(
                'u_id',
                ctx.result.id,
                {
                    domain: 'localhost',  // 写cookie所在的域名
                    maxAge: 10 * 60 * 1000, // cookie有效时长
                    httpOnly: false,  // 是否只用于http请求中获取
                    overwrite: true  // 是否允许重写
                }
            )
            return ctx.body = { error: false }
        } catch (error) {
            return ctx.body = error.message
        }
    })

    router.get('/login',async (ctx)=>{
        await ctx.render('login')
    })
}