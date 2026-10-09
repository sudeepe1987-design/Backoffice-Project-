const {json,authReady,enquiryReady}=require('../lib/server');
module.exports=(req,res)=>{if(req.method!=='GET')return json(res,405,{error:'Method not allowed'});json(res,200,{authReady:authReady(),enquiryReady:enquiryReady(),turnstileSiteKey:process.env.TURNSTILE_SITE_KEY||''});};
