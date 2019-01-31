// 쿼리에 /api/posts가 왔을 때 koa-router(라우터 : 네트워크간 통신 도와주는 친구)를 사용해서 
// post안에 js파일 실행시켜줌 ( 어떤 함수가 동작할 것인가! )

const Router = require('koa-router');
const posts = require('./posts');


const api = new Router();

const auth = require('./auth');

api.use('/auth', auth.routes());
api.use('/posts', posts.routes());

module.exports = api;