// 컨트롤러 기반으로 뒤에 쿼리 뒤에 뭐가 오느냐에 따라서 어떤 함수가 작동할 것인가.

const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');

const posts = new Router();

posts.get('/', postsCtrl.list); // 지금은 얘만 쓰는거임 
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.read);
posts.delete('/:id', postsCtrl.remove);
//posts.patch('/', postsCtrl.update);

module.exports = posts;