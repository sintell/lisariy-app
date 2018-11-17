const http = require('http');
const shutdown = require('koa-graceful-shutdown');
const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const logger = require('koa-logger');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();


const _images = [
    {id: 1, name: "Some picture with name", description: 'image #1', src: 'https://dummyimage.com/400x400/aaafff/000000.jpg'},
    {id: 2, name: "Some picture with name", description: 'image #2', src: 'https://dummyimage.com/400x400/faaaff/000333.jpg'},
    {id: 3, name: "Some picture with name", description: 'image #3', src: 'https://dummyimage.com/400x400/ffaaaf/0033330.jpg'},
    {id: 4, name: "Some picture with name", description: 'image #4', src: 'https://dummyimage.com/400x400/fffaaa/033300.jpg'},
    {id: 5, name: "Some picture with name", description: 'image #5', src: 'https://dummyimage.com/400x400/eeefff/333000.jpg'},
    {id: 6, name: "Some picture with name", description: 'image #6', src: 'https://dummyimage.com/400x400/feeeff/000333.jpg'},
    {id: 7, name: "Some picture with name", description: 'image #7', src: 'https://dummyimage.com/400x400/ffeeef/003330.jpg'},
    {id: 8, name: "Some picture with name", description: 'image #8', src: 'https://dummyimage.com/400x400/fffeee/033300.jpg'},
    {id: 9, name: "Some picture with name", description: 'image #9', src: 'https://dummyimage.com/400x400/ffffff/333000.jpg'},
]

router.get('/', (ctx, next) => {
    ctx.body = 'Hello world';
});

router
    .get('list_pictures', '/api/pictures', (ctx)=>{
        return ctx.body = JSON.stringify(_images);
    })
    .post('create_picture', '/api/pictures', ()=>{})
router
    .get('get_picture', '/api/pictures/:id', (ctx)=>{
        return ctx.body = JSON.stringify(_images.find(image => image.id === Number(ctx.params.id)));
    })
    .put('update_picture', '/api/pictures/:id', ()=>{})
    .delete('delete_picture', '/api/pictures/:id', ()=>{})


const server = http.createServer(app.callback());
app
    .use(logger())
    .use(koaBody())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(shutdown(server));


server.listen(5000, () => {
    const { address, port } = server.address();
    console.log('Listening on http://%s:%d', address, port);
});
