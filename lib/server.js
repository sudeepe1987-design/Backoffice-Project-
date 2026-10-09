'use strict';
function json(res,status,data){res.setHeader('Cache-Control','no-store');res.status(status).json(data);}
function origins(){return [process.env.SITE_URL,process.env.VERCEL_URL&&'https://'+process.env.VERCEL_URL].filter(Boolean).map(v=>new URL(v).origin);}
function guard(req,res){if(req.method!=='POST'){res.setHeader('Allow','POST');json(res,405,{error:'Method not allowed'});return false;}if(!origins().includes(req.headers.origin)){json(res,403,{error:'Request origin is not allowed'});return false;}if(!String(req.headers['content-type']||'').includes('application/json')){json(res,415,{error:'JSON required'});return false;}if(JSON.stringify(req.body||{}).length>16000){json(res,413,{error:'Request is too large'});return false;}return true;}
function body(req){let b=req.body;if(typeof b==='string'){try{b=JSON.parse(b);}catch{return null;}}return b&&typeof b==='object'&&!Array.isArray(b)?b:null;}
function clean(value,max=200){return typeof value==='string'?value.trim().slice(0,max):'';}
function email(value){return typeof value==='string'&&value.length<=254&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);}
async function challenge(token){if(!process.env.TURNSTILE_SECRET_KEY||typeof token!=='string'||token.length>2048)return false;const r=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:process.env.TURNSTILE_SECRET_KEY,response:token}),signal:AbortSignal.timeout(10000)});if(!r.ok)return false;const data=await r.json();return data.success===true&&origins().some(o=>new URL(o).hostname===data.hostname);}
function authReady(){return Boolean(process.env.SUPABASE_URL&&process.env.SUPABASE_ANON_KEY&&process.env.TURNSTILE_SITE_KEY&&process.env.TURNSTILE_SECRET_KEY&&process.env.SITE_URL);}
function enquiryReady(){return Boolean(process.env.RESEND_API_KEY&&process.env.ENQUIRY_FROM&&process.env.ENQUIRY_TO&&process.env.TURNSTILE_SITE_KEY&&process.env.TURNSTILE_SECRET_KEY&&process.env.SITE_URL);}
module.exports={json,guard,body,clean,email,challenge,authReady,enquiryReady};
