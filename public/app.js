const f=document.getElementById('f');if(f)f.onsubmit=e=>{e.preventDefault();location='/results?plate='+encodeURIComponent(plate.value)};
const out=document.getElementById('out');
if(out){const pl=new URLSearchParams(location.search).get('plate')||'';p.textContent=pl.toUpperCase();
fetch('/api/check',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plate:pl})}).then(r=>r.json()).then(d=>{
if(d.error){out.innerHTML='<div class="card">Error: '+d.error+'</div>';return}
const tot=d.challans.filter(c=>c.status=='unpaid').reduce((a,c)=>a+c.amount,0);
out.innerHTML=(d.sample?'<p class="sample">⚠ SAMPLE DATA — demo only, not real challans.</p>':'')+
(d.challans.length?'<div class="card"><b>Unpaid total: Rs '+tot.toLocaleString()+'</b> · '+d.challans.length+' challan(s)</div>':'<div class="card">No challans found ✅</div>')+
d.challans.map(c=>'<div class="card"><div style="display:flex;justify-content:space-between"><b>'+c.violation+'</b><span class="badge '+c.status+'">'+c.status.toUpperCase()+'</span></div><div class="grid" style="margin-top:10px;font-size:14px"><div>💰 Rs '+c.amount.toLocaleString()+'</div><div>📅 '+c.date+'</div><div>📍 '+c.location+'</div><div>🧾 PSID: '+c.psid+'</div></div></div>').join('')})}
const fb=document.getElementById('fines');if(fb)fetch('/api/fines').then(r=>r.json()).then(a=>fb.innerHTML=a.map(r=>'<tr><td>'+r[0]+'</td><td class="ur">'+r[1]+'</td><td>'+r[2]+'</td></tr>').join(''));
