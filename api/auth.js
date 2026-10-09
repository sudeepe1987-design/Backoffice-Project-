const {json,guard,body,email,challenge,authReady}=require('../lib/server');
const cookieName='__Host-bo-session';
function cookie(req){const entry=String(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(cookieName+'='));return entry?entry.slice(cookieName.length+1):'';}
function setCookie(res,value,seconds){res.setHeader('Set-Cookie',cookieName+'='+value+'; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age='+seconds);}
async function call(route,method='GET',payload,token){return fetch(process.env.SUPABASE_URL.replace(/\/$/,'')+'/auth/v1/'+route,{method,headers:{apikey:process.env.SUPABASE_ANON_KEY,Authorization:'Bearer '+(token||process.env.SUPABASE_ANON_KEY),'Content-Type':'application/json'},body:payload?JSON.stringify(payload):undefined,signal:AbortSignal.timeout(12000)});}
module.exports=async(req,res)=>{
 if(req.method==='GET'){
  if(!authReady()||!cookie(req))return json(res,401,{error:'Sign in required'});
  try{const r=await call('user','GET',null,cookie(req));if(!r.ok){setCookie(res,'',0);return json(res,401,{error:'Please sign in again'});}const user=await r.json();return json(res,200,{email:user.email});}catch{return json(res,503,{error:'Account service unavailable'});}
 }
 if(!guard(req,res))return;const b=body(req);if(!b)return json(res,400,{error:'Invalid request'});
 if(b.action==='logout'){const t=cookie(req);setCookie(res,'',0);if(t&&authReady()){try{await call('logout','POST',{},t);}catch{}}return json(res,200,{ok:true});}
 if(!authReady())return json(res,503,{error:'Online sign-in is not available yet.'});
 if(!email(b.email))return json(res,400,{error:'Enter a valid email address'});
 try{
  if(b.action==='send'){
   if(!await challenge(b.turnstileToken))return json(res,400,{error:'Please complete the verification again.'});
   const r=await call('otp','POST',{email:b.email,create_user:true});if(!r.ok)return json(res,429,{error:'Unable to send a code. Please wait and try again.'});return json(res,200,{ok:true});
  }
  if(b.action==='verify'){
   if(typeof b.token!=='string'||!/^\d{6,10}$/.test(b.token))return json(res,400,{error:'Enter the code from your email.'});
   const r=await call('verify','POST',{email:b.email,token:b.token,type:'email'});const data=await r.json();if(!r.ok||!data.access_token)return json(res,401,{error:'Code invalid or expired. Reload to request a new code.'});
   if(!/^[A-Za-z0-9_.-]+$/.test(data.access_token))return json(res,502,{error:'Unable to establish session'});
   setCookie(res,data.access_token,Math.min(Number(data.expires_in)||3600,3600));return json(res,200,{ok:true});
  }
  return json(res,400,{error:'Unknown action'});
 }catch{return json(res,503,{error:'Sign-in is temporarily unavailable. Please try again.'});}
};
