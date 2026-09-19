const {onRequest}=require('firebase-functions/v2/https');
const {initializeApp}=require('firebase-admin/app');
const {getAuth}=require('firebase-admin/auth');
const {getDatabase}=require('firebase-admin/database');
const {validate}=require('./content.cjs');
const render=require('./render.cjs');
initializeApp({databaseURL:'https://travelvacationsadventure-1ec6d-default-rtdb.firebaseio.com'});
const store=()=>getDatabase().ref('travelJournal');
async function data(){let s=await store().get();if(!s.exists()){const posts=Object.fromEntries(require('./seed.json').map(p=>[p.slug,p]));await store().transaction(v=>v||{initialized:true,posts});s=await store().get();}return s.val();}
async function handler(req,res){
res.set('X-Content-Type-Options','nosniff');res.set('Cache-Control','no-store');
try{
const path=req.path;
if(path.startsWith('/api/')){
const token=(req.headers.authorization||'').replace(/^Bearer /,'');let user;
try{user=await getAuth().verifyIdToken(token,true);}catch{ return res.status(401).json({error:'Please sign in again.'});}
if(user.admin!==true)return res.status(403).json({error:'Admin access is not enabled for this account. Complete the one-time admin setup, then sign in again.'});
if(path==='/api/posts'&&req.method==='GET'){const state=await data();return res.json({posts:Object.values(state.posts||{})});}
if(path==='/api/posts'&&req.method==='PUT'){
let p;try{p=validate(req.body);}catch(e){return res.status(400).json({error:e.message});}
await data();let conflict=false;const previous=Number(req.body.revision)||0;
// A published URL remains stable. New posts reserve their slug atomically.
const result=await store().child('posts/'+p.slug).transaction(current=>{conflict=false;if((current?.revision||0)!==previous){conflict=true;return;}return {...p,revision:previous+1,createdAt:current?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};});
if(!result.committed||conflict)return res.status(409).json({error:'This URL exists or the article was edited elsewhere. Reload the post before saving.'});return res.json({post:result.snapshot.val()});
}
const match=path.match(/^\/api\/posts\/([a-z0-9-]+)$/);
if(match&&req.method==='DELETE'){await data();let conflict=false;const r=await store().child('posts/'+match[1]).transaction(p=>{conflict=false;if(!p||p.revision!==Number(req.body.revision)){conflict=true;return;}return null;});if(conflict||!r.committed)return res.status(409).json({error:'Post changed or was already deleted. Refresh and try again.'});return res.json({ok:true});}
return res.status(404).json({error:'Unknown API endpoint.'});
}
if(!['GET','HEAD'].includes(req.method))return res.status(405).send('Method not allowed');
if(path==='/robots.txt')return res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nSitemap: ${render.base}/sitemap.xml\n`);
const state=await data();const posts=Object.values(state.posts||{}).filter(p=>p.status==='published').sort((a,b)=>b.date.localeCompare(a.date));
if(path==='/sitemap.xml')return res.type('application/xml').send(render.sitemap(posts));
if(path==='/'||path==='/index.html')return res.send(render.home(posts));
if(path==='/blog'||path==='/blog/index.html')return res.redirect(301,'/blog/');
if(path==='/blog/')return res.send(render.listing(posts,String(req.query.q||'').slice(0,120),String(req.query.category||'').slice(0,80)));
let slug=path.split('/').pop();if(path==='/blog/post.html')slug=String(req.query.post||'');else slug=slug.replace(/\.html$/,'');
const p=posts.find(x=>x.slug===slug);
if(p){if(path!=='/blog/'+slug)return res.redirect(301,'/blog/'+slug);return res.send(render.article(p,posts));}
return res.status(404).send(render.layout('Story not found','This story is unavailable.','/blog/','<h1>Story not found</h1><p><a href="/blog/">Explore the journal</a></p>').replace('index,follow,max-image-preview:large','noindex,follow'));
}catch(e){console.error(e);return res.status(500).type('text/plain').send('The journal is temporarily unavailable. Please try again.');}}
exports.journal=onRequest({region:'us-central1',maxInstances:10,memory:'256MiB',timeoutSeconds:30,invoker:'public'},handler);
