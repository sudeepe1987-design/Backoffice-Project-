const {json,guard,body,clean,email,challenge,enquiryReady}=require('../lib/server');
module.exports=async(req,res)=>{
 if(!guard(req,res))return;
 if(!enquiryReady())return json(res,503,{error:'Online requests are unavailable. Please use email or WhatsApp.'});
 const b=body(req);if(!b||!email(b.email)||!['contact','agency-offer','referral'].includes(b.formType))return json(res,400,{error:'Please check your email and request details.'});
 const required=b.formType==='contact'?['name','phone','message']:b.formType==='agency-offer'?['agencyName','contactPerson','phone','monthlyFiles','destinations','budget']:['name','message'];
 if(required.some(k=>!clean(b[k],4000)))return json(res,400,{error:'Please complete all required fields.'});
 if(b.formType==='agency-offer'&&(!Number.isFinite(Number(b.monthlyFiles))||Number(b.monthlyFiles)<1||!Number.isFinite(Number(b.budget))||Number(b.budget)<1))return json(res,400,{error:'Enter a valid file volume and budget.'});
 if(b.preferredDate&&!/^\d{4}-\d{2}-\d{2}$/.test(b.preferredDate))return json(res,400,{error:'Invalid preferred date.'});
 try{
  if(!await challenge(b.turnstileToken))return json(res,400,{error:'Verification expired or failed. Please verify again.'});
  const fields=['formType','name','agencyName','contactPerson','email','phone','company','service','country_program','message','monthlyFiles','destinations','complexity','budget','turnaround','notes','preferredDate','referralCode'];
  const text=fields.map(k=>[k,clean(b[k],k==='message'||k==='notes'?4000:300)]).filter(([,v])=>v).map(([k,v])=>k+': '+v).join('\n\n');
  const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.ENQUIRY_FROM,to:[process.env.ENQUIRY_TO],reply_to:clean(b.email,254),subject:'Your Back Office: '+b.formType,text}),signal:AbortSignal.timeout(12000)});
  const data=await r.json();if(!r.ok||!data.id)return json(res,502,{error:'Your request could not be sent. Please retry or contact us directly.'});
  return json(res,200,{message:'Thank you. Your request has been sent to our team. We will confirm the next steps.'});
 }catch{return json(res,502,{error:'Delivery is temporarily unavailable. Please use email or WhatsApp.'});}
};
