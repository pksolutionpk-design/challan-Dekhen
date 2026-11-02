const express=require('express'),path=require('path'),provider=require('./providers');
const app=express(); app.use(express.json());
const hits=new Map(); // simple rate limit 20/min/ip
app.post('/api/check',async(req,res)=>{
  const ip=req.ip,now=Date.now(),h=(hits.get(ip)||[]).filter(t=>now-t<60000); h.push(now); hits.set(ip,h);
  if(h.length>20) return res.status(429).json({error:'rate_limited'});
  const plate=String(req.body.plate||'').toUpperCase().replace(/\s+/g,'').replace(/^([A-Z]+)(\d+)$/,'$1-$2');
  if(!/^[A-Z]{1,4}-?\d{1,5}$/.test(plate)) return res.status(400).json({error:'invalid'});
  try{ res.json(await provider.lookup(plate)); }catch(e){ res.status(502).json({error:e.message}); }
});
app.get('/api/fines',(q,r)=>r.json(require('./fines.json')));
app.use(express.static(path.join(__dirname,'public'),{extensions:['html']}));
const port=process.env.PORT||3000;
app.listen(port,'0.0.0.0',()=>console.log('Challan Check on http://localhost:'+port+' provider='+provider.name));
