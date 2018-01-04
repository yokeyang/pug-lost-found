'use strict'
const mysql = require('mysql')
const fs = require('fs')
// 创建数据池
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'yang218906',
    database: 'exam'
})
function con(sql) {
    return new Promise(resolve => {
        pool.getConnection((err, connection) => {
            connection.query(sql, (error, results, fields) => {
                resolve(results)
                if (error) throw error;
            })
        })
    })
}

exports.checkLogin = async (ctx,next) =>{
    try {
        let url = ctx.request.header.referer
        url = url.replace(/http:\/\/\w+:[0-9]+\//, '')
        ctx.referer = '/' + url
        let name = ctx.request.body.name,
            psd = ctx.request.body.psd
        var cpsd = ''
        let result = await con(`SELECT * FROM manager where user = '${name}'`)
        cpsd = result[0].password
        if (cpsd === psd){
            ctx.result = result[0]
            await next()
        }else{
            return ctx.body = {error:true}
        }
    } catch (error) {
        return ctx.body = error.message
    }
}

exports.delgoods = async (ctx,next) =>{
    try {
        if (ctx.name === '' || ctx.name === undefined) {
            return ctx.body = { error: true }
        }
        let id = ctx.request.body.id
        let result = await con(`delete from goods where id = '${id}'`)        
        await next()
    } catch (error) {
        return ctx.body = {error:true}
    }
}

const formidable = require("formidable")

exports.checkgoods = async (ctx,next) =>{
    try {
        if (ctx.name === '' || ctx.name === undefined) {
            return ctx.body = {error:true}
        }
        let data = ctx.request.body
        await con(`INSERT INTO goods (title,name,good,type,location,message,u_id) values ('${data.title}','${data.name}','${data.good}','${data.type}','${data.location}','${data.message}','${ctx.id}')`)
        await next()
    } catch (error) {
        return ctx.body = error.message        
    }
}

exports.getgoods = async (ctx,next) =>{
    try {
        ctx.datas = await con(`select * from goods`)
        ctx.posted = new Array()
        ctx.comments = new Array()
        let comments = await con(`select * from comment`)
        for(let data of ctx.datas){
            data.comments = new Array()
            ctx.posted.push
            for(let comment of comments){
                if(comment.c_id === data.id){
                    data.comments.push(comment)
                }
            }
            if(data.u_id === parseInt(ctx.id)){
                ctx.posted.push(data)
                ctx.comments = ctx.comments.concat(data.comments)
            }
        }
        await next()
    } catch (error) {
        return ctx.body = error.message
    }
}

exports.checkComment = async (ctx,next) =>{
    try {
        if (ctx.name === '' || ctx.name === undefined) {
            return ctx.body = {error:true}
        }
        let data = ctx.request.body
        await con(`INSERT INTO comment (msg,user,c_id) values ('${data.value}','${ctx.name}','${data.id}')`)
        await next()
    } catch (error) {
        return ctx.body = error.message        
    }
}

exports.delInfo = async (ctx,next) =>{
    try {
        if (ctx.name === '' || ctx.name === undefined) {
            return ctx.body = {error:true}
        }
        let data = ctx.request.body
        switch(data.type) {
            case 'post':
                await con(`DELETE FROM goods where id = '${data.id}'`)
                break;
        }
        await next()
    } catch (error) {
        return ctx.body = error.message        
    }
}
