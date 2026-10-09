// Local preview only; Vercel runs the api handlers natively.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{
 const pathname=new URL(req.url,'http://localhost').pathname;
 if(pathname.startsWith('/api/')){const name=pathname.slice(5);if(!['settings','enquiry','auth'].includes(name)){res.writeHead(404);return res.end();}let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>20000){res.writeHead(413);return res.end();}}try{req.body=raw?JSON.parse(raw):{};}catch{res.writeHead(400);return res.end();}res.status=n=>{res.statusCode=n;return res;};res.json=obj=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(obj));};try{return await require(path.join(root,'api',name+'.js'))(req,res);}catch{res.writeHead(500);return res.end('Preview server error');}}
 let p=pathname==='/'?'/index.html':pathname;if(!path.extname(p))p+='.html';const file=path.resolve(root,'.'+decodeURIComponent(p));if(!file.startsWith(root+path.sep)||!['.html','.css','.js','.json','.png','.jpg','.jpeg','.webp','.svg','.ico','.woff','.woff2'].includes(path.extname(file))||/^\/(api|lib|tests|scripts)\//.test(p)){res.writeHead(403);return res.end();}
 try{const bytes=fs.readFileSync(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(bytes);}catch{res.writeHead(404);res.end('Not found');}
}).listen(8766,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:8766'));
