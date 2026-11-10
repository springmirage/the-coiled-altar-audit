/* 11/09 is isolated from historical rendering and never invents missing rows. */
function initNov9(){
 document.body.classList.add('nov9');
 document.title=DATA.title+' · 11月9日';
 $('pageTitle').textContent=DATA.title;
 $('subtitle').textContent=DATA.subtitle;
 $('intro').textContent=DATA.intro;
 document.querySelector('.board-nav').innerHTML='<a href="#p3-soaks">01 · 分担</a><a href="#p3-orbs">02 · 绿紫球</a><a href="#p3-adds">03 · 套圈与打断</a><a href="#p3-resonance">04 · 恶毒共鸣</a><a href="#p3-rescue">05 · 救人</a><a href="#p3-sequence">06 · 减员</a><a href="#shield">07 · P3 盾 DPS</a>';
 for(const id of ['ghost','circle','interrupt'])$(id).hidden=true;
 $('ghost').insertAdjacentHTML('beforebegin',`<section id="p3-overview"><div class="nov9-scope"><strong>阅读范围</strong><p>${esc(DATA.scope)}</p></div><div class="nov9-priorities"><div><span>01</span><h2>分担落点站齐</h2><p>看结算位置的人数，区分点名移动和队伍没有跟到。</p></div><div><span>02</span><h2>重复分担先开免疫</h2><p>人数足够也会减员；第二次带易伤不能靠保护祝福。</p></div><div><span>03</span><h2>减员看完整经过</h2><p>区分前置减员、战复和已喊灭后的连锁结果。</p></div></div></section><section id="p3-soaks"><div class="chapter"><span>02</span><h2>P3 · 两次分担</h2><p>先看本轮结果，再展开异常。P3 分担为暗影伤害，保护祝福和闪避不能替代有效免疫。</p></div><div id="nov9SoakTable"></div><div id="nov9SoakResults"></div></section><section id="p3-sequence"><div class="chapter"><span>03</span><h2>P3 · 减员经过</h2><p>按死亡事实看连续减员，重点展开 WCL 10、22、23；战复单独列出。</p></div><div id="nov9Sequence"></div></section><section id="shield"><div class="chapter"><span>04</span><h2>P3 盾 DPS</h2><p id="nov9ShieldNote">仅统计 P3 护盾存在期间。</p></div><div id="nov9ShieldChart"></div></section><section id="nov9Coverage"><details class="nov9-coverage"><summary>数据范围与口径</summary><ul>${DATA.coverage.map(x=>'<li>'+esc(x)+'</li>').join('')}</ul><p>伤害、易伤和免疫光环应联合判断参与。位置是异步采样，不能把边缘距离当成同帧精准测量。指挥语音不在战斗日志内。</p></details></section>`);
 $('p3-soaks').querySelector('.chapter>span').textContent='01';
 $('p3-sequence').querySelector('.chapter>span').textContent='06';
 $('shield').querySelector('.chapter>span').textContent='07';
 $('p3-sequence').insertAdjacentHTML('beforebegin','<section id="p3-orbs"><div class="chapter"><span>02</span><h2>P3 · 绿紫球</h2><p>列出每次实际携带者和效果起止。原始记录不带球色字段，本版用技能名区分球型；效果消失不单独代表放置正确。</p></div><div id="nov9OrbResults"></div></section><section id="p3-adds"><div class="chapter"><span>03</span><h2>P3 · 套圈与大怪打断</h2><p>进入大怪的 5 把均只召出 1 只，按实际读条复盘。P3 第一轮圈出现时大怪尚未召出，不记漏套大怪。</p></div><div id="nov9CircleTable"></div><div id="nov9CircleFailures"></div><div id="nov9InterruptResults"></div></section>');
 $('p3-sequence').insertAdjacentHTML('beforebegin','<section id="p3-resonance"><div class="chapter"><span>04</span><h2>P3 · 恶毒共鸣</h2><p>按鬼与鬼接触的经过复盘，受害者不自动记为责任人。</p></div><article class="fight"><h3>本次证据范围</h3><p>已逐把补查本报告进入 P3 的 11 场，本阶段没有恶毒共鸣对应技能的事件，不展开空白伤害链。P3 前的记录不混入。</p><p>有实际链条时，需要对齐鬼的锁定关系、接触位置与伤害。若由漏断后恐惧造成接触，归入漏断的后果，不再另判主动撞鬼。</p></article></section><section id="p3-rescue"><div class="chapter"><span>05</span><h2>P3 · 救人复盘</h2><p>只展开恐惧行军点名波次中未救出的人；已救出的不列。</p></div><article class="fight"><h3>本次证据范围</h3><p>已核对 WCL 6、9、10、20、23 的 5 波真实恐惧行军点名。15 次受控均完成救出，没有需要展开的未救出记录。</p><p>仅按实际施法波次统计，后续单独出现的受控不冒充新一轮点名。</p></article></section>');
 $('footerText').textContent=DATA.footer;
 $('query').placeholder='例如：Qui、分担、墓缚';
 $('dateFilter').innerHTML=Object.entries(AUDIT_DATES).sort(([a],[b])=>b.localeCompare(a)).map(([date,meta])=>`<option value="${date}">${esc(meta.label)}</option>`).join('');
 $('dateFilter').value=AUDIT_DATE;
 $('dateFilter').addEventListener('change',()=>{const u=new URL(location.href);u.searchParams.set('date',$('dateFilter').value);u.hash='';location.assign(u.href);});
 $('fightFilter').innerHTML='<option value="">全部已收录场次</option>'+DATA.fights.map(f=>`<option value="${f.id}">WCL ${f.id}</option>`).join('');
 $('playerFilter').innerHTML='<option value="">全部玩家</option>'+Object.keys(DATA.roster).sort((a,b)=>a.localeCompare(b,'zh-CN')).map(n=>`<option value="${esc(n)}">${esc(n)}</option>`).join('');
 for(const id of ['fightFilter','playerFilter','query'])$(id).addEventListener(id==='query'?'input':'change',renderNov9);
 $('reset').addEventListener('click',()=>{for(const id of ['fightFilter','playerFilter','query'])$(id).value='';const u=new URL(location.href);u.hash='';u.searchParams.delete('fight');u.searchParams.delete('player');u.searchParams.delete('q');history.replaceState(null,'',u.href);renderNov9();});
 const url=new URL(location.href); if(DATA.fights.some(f=>String(f.id)===url.searchParams.get('fight')))$('fightFilter').value=url.searchParams.get('fight'); if(Object.hasOwn(DATA.roster,url.searchParams.get('player')))$('playerFilter').value=url.searchParams.get('player');$('query').value=url.searchParams.get('q')||'';
 renderNov9();
}
function nov9Accepts(x){const s=state();return(!s.fid||Number(s.fid)===x.fight)&&(!s.player||(x.players||[]).includes(s.player))&&(!s.q||JSON.stringify(x).toLowerCase().includes(s.q));}
function nov9Link(fight,label='查看 WCL ↗'){return `<a href="https://cn.warcraftlogs.com/reports/${DATA.report}#fight=${fight}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;}
function nov9Empty(text='此筛选范围没有已收录的记录。'){return '<p class="empty">'+esc(text)+'</p>';}
function nov9Table(headers,rows){return `<div class="read-table-wrap"><table class="read-table nov9-table"><thead><tr>${headers.map(h=>'<th scope="col">'+esc(h)+'</th>').join('')}</tr></thead><tbody>${rows.map(row=>'<tr>'+row.map((c,i)=>i?'<td>'+c+'</td>':'<th scope="row">'+c+'</th>').join('')+'</tr>').join('')}</tbody></table></div>`;}
function renderNov9(){
 const s=state(),soaks=DATA.soaks.filter(nov9Accepts),reviews=DATA.reviews.filter(nov9Accepts);
 $('filterState').textContent=`当前查看：11月9日 · ${s.fid?'WCL '+s.fid:'全部已收录场次'} · ${s.player||'全部玩家'}${s.q?' · “'+s.q+'”':''}`;
 $('playerFilter').style.color=COLORS[DATA.roster[s.player]]||'#1d2939';
 $('nov9SoakTable').innerHTML=soaks.length?nov9Table(['场次 / 轮次','点名 / 落地','实际参与记录','免疫 / 减伤','结果'],soaks.map(r=>[nov9Link(r.fight,'WCL '+r.fight)+`<small>第 ${r.round} 次</small>`,`${r.marked?person(r.marked):'—'}<small>${esc(r.time||'')}</small>`,prose(r.participants),prose(r.defenses||'—'),`<span class="nov9-badge ${esc(r.kind)}">${r.kind==='success'?'通过':r.kind==='context'?'连锁事实':r.kind==='notReached'?'未到本轮':'异常'}</span><p>${prose(r.outcome)}</p>`])):nov9Empty();
 $('nov9SoakResults').innerHTML=reviews.map(r=>`<article class="fight nov9-review ${r.kind==='context'?'nov9-context':''}" id="${esc(r.key)}"><div class="fightHead"><div><span class="eyebrow">WCL ${r.fight} · P3</span><h3>${esc(r.title)}</h3></div>${nov9Link(r.fight)}</div>${[['process','经过'],['result','结果'],['reminder',r.kind==='context'?'复盘边界':'下次怎么做']].map(([key,label])=>`<div class="copy-block ${key}"><h4>${label}</h4><p>${prose(r[key])}</p></div>`).join('')}<details class="nov9-evidence"><summary>核对依据</summary><p>${prose(r.evidenceText)}</p></details></article>`).join('')||nov9Empty(soaks.length?'本筛选范围仅有汇总记录，不另展开。':'本筛选范围没有异常详情。');
 const deaths=DATA.mechanics.flatMap(m=>m.deaths).filter(nov9Accepts),sequence=DATA.sequence.filter(nov9Accepts);
 const firstRows=DATA.mechanics.map(m=>{const ds=m.deaths.filter(nov9Accepts);return ds.length?{fight:m.fight,first:ds[0],count:ds.length}:null;}).filter(Boolean);
 const summary=firstRows.length?nov9Table(['场次','本筛选首个死亡','致死事件','死亡次数'],firstRows.map(m=>[nov9Link(m.fight,'WCL '+m.fight),person(m.first.name)+'<small>'+esc(m.first.time)+'</small>',esc(m.first.cause||'本条死亡未带致死技能'),String(m.count)])):nov9Empty();
 const groups=[...new Set(sequence.map(r=>r.fight))];
 $('nov9Sequence').innerHTML=summary+'<p class="abandoned">死亡次数按事件计，包含战复后的再次死亡；首个死亡不自动等于喊灭。只陈列事实，不按死亡人数分摊责任。</p>'+groups.map(f=>`<article class="fight"><div class="fightHead"><h3>WCL ${f} · ${f===10?'清盾后的分担、墓缚与战复':f===22?'残盾后的连续死亡':'墓缚连锁减员'}</h3>${nov9Link(f)}</div><ol class="nov9-timeline">${sequence.filter(r=>r.fight===f).map(r=>`<li><time>${esc(r.time)}</time><div><h4>${esc(r.label)}</h4><p>${prose(r.text)}</p></div></li>`).join('')}</ol></article>`).join('');
 renderNov9Mechanics();renderNov9Shield();formatDisplayedTimes();
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let textNode;while((textNode=walker.nextNode())){if(textNode.parentElement?.closest('script,style,textarea'))continue;textNode.nodeValue=textNode.nodeValue.replace(/(\d+)\.\d+\s*秒/g,(_,n)=>Number(n)===0?'不足1秒':n+'秒');}
}
function renderNov9Mechanics(){
 const s=state(),ms=DATA.mechanics.filter(m=>!s.fid||m.fight===Number(s.fid));
 $('nov9OrbResults').innerHTML=ms.map(m=>{const rows=m.orbs.filter(nov9Accepts);if(!rows.length)return '';return `<details class="fight nov9-fight-details" ${s.fid||s.player||s.q?'open':''}><summary>WCL ${m.fight} · ${rows.length} 次携带记录</summary>${nov9Table(['球型技能','实际携带者','拾取','效果结束','结束记录'],rows.map(r=>[esc(r.color),person(r.player),esc(r.pickup),esc(r.end),esc(r.result)]))}</details>`;}).join('')||nov9Empty();
 const circles=ms.flatMap(m=>m.circleRounds).filter(nov9Accepts);
 $('nov9CircleTable').innerHTML=circles.length?nov9Table(['场次 / P3轮次','点名','点名时间','效果结束','大怪盾结果'],circles.map(r=>[nov9Link(r.fight,'WCL '+r.fight)+`<small>第 ${r.wave} 轮</small>`,r.players.map(person).join('、'),esc(r.appliedAt),esc(r.end),esc(r.result)])):nov9Empty();
 const fail=circles.some(r=>r.fight===9&&r.wave===2);
 $('nov9CircleFailures').innerHTML=fail?`<article class="fight nov9-review"><div class="fightHead"><h3>WCL 9 · 8:23 套圈后还剩 1 层盾</h3>${nov9Link(9)}</div><div class="copy-block"><h4>经过</h4><p>大老板的猎手、Qui、小丶枂神、剑二十三丶本轮被点圈。8:23 只消掉一层，大怪还剩 1 层；到下一轮 9:01 才全破。</p></div><div class="copy-block reminder"><h4>位置核对</h4><p>补齐关键 8 秒事件后，可见大怪在 8:19、8:23 两次变位，时间均紧随打断；仅凭先后不能认定打断是原因。8:23 落圈时怪的位置稳定，Qui、小丶枂神、大老板的猎手、剑二十三丶距怪约 21、10、33、54 码，只有小丶枂神接近 10 码内，与只消 1 层相符。</p></div><div class="copy-block reminder"><h4>下次怎么做</h4><p>落圈前重新看大怪当前位置，不沿用读条时的旧位置。坐标是采样记录，且缺少当时分工与指挥语音，不单独把责任给某个打断者或点圈玩家。</p></div></article>`:'';
 $('nov9InterruptResults').innerHTML=ms.filter(m=>m.reads.length).map(m=>{const rows=m.reads.filter(nov9Accepts);if(!rows.length)return '';const success=rows.filter(r=>r.result==='成功打断');const ended=rows.filter(r=>r.result.includes('死亡'));const abnormal=m.missed.length>0;return `<article class="fight"><div class="fightHead"><h3>WCL ${m.fight} · 1 只大怪</h3>${nov9Link(m.fight)}</div><p>${s.player?'筛选记录中：':''}${success.length} 次成功打断${ended.length?'，'+ended.length+' 次读条随怪死亡结束':''}${abnormal?'；'+m.missed.map(t=>esc(t)).join('、')+' 读完恐惧哀嚎':'，没有读完恐惧哀嚎'}。</p>${abnormal?'<p class="nov9-callout">漏断之前已有前置减员。这里保留实际读条顺序；从本次漏断起，后续连锁不再另记独立执行责任。</p>':''}<details class="nov9-evidence" ${abnormal?'open':''}><summary>实际打断顺序</summary>${nov9Table(['条数','开始','结算','实际执行者','结果'],rows.map(r=>['第 '+r.ordinal+' 条',esc(r.start),esc(r.end),prose(r.who||'—'),esc(r.result)]))}</details></article>`;}).join('')||nov9Empty('此筛选范围没有 P3 大怪读条记录。');
}
function renderNov9Shield(){
 const s=state(); const windows=DATA.shieldWindows.filter(x=>!s.fid||x.fight===Number(s.fid));
 if(!windows.length){$('nov9ShieldNote').textContent='只统计 P3 的盾，含宠物。';$('nov9ShieldChart').innerHTML=nov9Empty('此筛选范围没有已收录的 P3 盾窗口。');return;}
 const merged=new Map(); let duration=0;
 for(const w of windows){duration+=w.durationMs/1000;for(const r of w.rows||[]){const a=merged.get(r.name)||{name:r.name,className:r.className,damage:0};a.damage+=r.damage;merged.set(r.name,a);}}
 const isAggregate=merged.size===0;
 let rows=isAggregate?windows.map(w=>({name:`WCL ${w.fight} · 第 ${w.ordinal} 盾 · 团队合计`,damage:w.damage,dps:w.damage/(w.durationMs/1000)})):[...merged.values()].map(r=>({...r,dps:r.damage/duration}));
 rows.sort((a,b)=>b.dps-a.dps); const max=Math.max(1,...rows.map(r=>r.dps));
 if(s.player)rows=isAggregate?[]:rows.filter(r=>r.name===s.player);
 if(s.q)rows=rows.filter(r=>JSON.stringify(r).toLowerCase().includes(s.q)||'p3盾dps'.includes(s.q));
 $('nov9ShieldNote').textContent=isAggregate?'当前已收录 WCL 10 第 1 盾团队合计，非个人排名。':'只统计 P3 的盾，含宠物。DPS 按所选盾窗口总时长计算。';
 $('nov9ShieldChart').innerHTML=rows.length?`<article class="fight"><div class="nov9-chart" role="img" aria-label="P3 盾期间 DPS，完整数值见下表"><div class="nov2-bars">${rows.map((r,i)=>`<div class="nov2-bar-row"><div class="nov2-bar-top"><span>${isAggregate?esc(r.name):person(r.name)}</span><strong>${(r.dps/10000).toFixed(2)} 万 / 秒</strong></div><div class="nov2-bar-track"><span style="width:${Math.max(0,r.dps/max*100).toFixed(3)}%;background:${COLORS[r.className]||'#2847a5'}"></span></div></div>`).join('')}</div></div><details class="nov9-evidence"><summary>查看数值与窗口</summary>${nov9Table(['玩家 / 范围','盾期伤害','盾期 DPS'],rows.map(r=>[isAggregate?esc(r.name):person(r.name),(r.damage/10000).toFixed(3)+' 万',(r.dps/10000).toFixed(2)+' 万 / 秒']))}<p>环境盾伤 ${(windows.reduce((a,w)=>a+(w.environmentDamage||0),0)/10000).toFixed(2)} 万，不分配给个人。${windows.map(w=>`WCL ${w.fight} 第 ${w.ordinal} 盾：${esc(w.start)}–${esc(w.end)}，${esc(w.status)}`).join('；')}</p></details></article>`:nov9Empty(s.player&&isAggregate?'当前只有团队合计，不能拆成个人伤害。':'此筛选范围没有已收录的 P3 盾伤害。');
}
