module.exports = async (ctx,next) =>{
    try {
        ctx.name = await ctx.cookies.get('name'),
        ctx.tel = await ctx.cookies.get('tel'),
        ctx.id = await ctx.cookies.get('u_id')
        await next()        
    } catch (error) {
        console.log(error.message)
        return ctx.body('not login in')
    }
}