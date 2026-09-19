const sanitizeHtml=require('sanitize-html');
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function clean(html){return sanitizeHtml(html,{allowedTags:['p','br','h2','h3','h4','strong','b','em','i','u','s','ul','ol','li','blockquote','a','img','hr','figure','figcaption','pre','code','table','thead','tbody','tr','th','td'],allowedAttributes:{a:['href','title'],img:['src','alt','width','height','loading'],h2:['id'],h3:['id']},allowedSchemes:['https','http','mailto'],allowProtocolRelative:false,transformTags:{img:sanitizeHtml.simpleTransform('img',{loading:'lazy'})}});}
function imageURL(value){if(!value)return '';if(/^\/[^/]/.test(value)||/^https:\/\//.test(value))return value;throw new Error('Use an HTTPS image URL or an uploaded image.');}
function validate(input){
const p={};for(const [key,max] of Object.entries({title:180,slug:180,description:400,category:80,author:120,date:10,image:2000,imageAlt:250,seoTitle:180,seoDescription:400,content:300000,status:12}))p[key]=String(input[key]??'').trim().slice(0,max);
if(!p.title)throw new Error('A title is required.');
if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug))throw new Error('Use lowercase letters, numbers and hyphens for the URL slug.');
if(['index','post','api','admin'].includes(p.slug))throw new Error('That URL slug is reserved.');
if(!['draft','published'].includes(p.status))throw new Error('Invalid post status.');
if(!/^\d{4}-\d{2}-\d{2}$/.test(p.date)||(Number.isNaN(Date.parse(p.date))||new Date(p.date).toISOString().slice(0,10)!==p.date))throw new Error('Choose a valid date.');
if(p.date>new Date().toISOString().slice(0,10)&&p.status==='published')throw new Error('Publication date cannot be in the future. Save a draft instead.');
p.content=clean(p.content);p.image=imageURL(p.image);p.tags=Array.isArray(input.tags)?input.tags.slice(0,15).map(x=>String(x).slice(0,40)):[];
if(p.status==='published'&&(!p.description||!p.content.replace(/<[^>]*>/g,'').trim()))throw new Error('Published posts need an excerpt and article text.');
if(p.image&&!p.imageAlt)throw new Error('Describe your image in the alt text field.');
return p;
}
module.exports={esc,clean,validate};
