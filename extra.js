/* Mapa de setas: pueblos y montes con más brotación estimada, y precios de mercado. */
(function(){
"use strict";
var TX={
 es:{pl:"Dónde más brota ahora (estimación)",towns:"Pueblos",mounts:"Montes",
  plNote:"Estimación del modelo con las condiciones de abajo; no son registros reales de recolección. Los números del mapa marcan los cinco primeros. Toca un nombre para verlo en el mapa.",
  plNone:"Con estas condiciones no destaca ningún sitio para esta seta.",
  pr:"Precios en el mercado de Ordizia",prUnit:"€/kg",prNone:"Esta seta no figura en la lista de precios de Ordizia.",
  prOther:"Referencia: «Otras setas» en Mercabarna",prNote:"Precio de venta en la feria de los miércoles; no es lo que se paga al recolector. Se actualiza solo cada miércoles por la tarde.",upd:"Última actualización",tr:"Árboles donde fijarte",trNone:"Esta seta sale en prados abiertos, sin árbol asociado: busca corros de hierba más verde y alta.",trCred:"Fotos: Wikimedia Commons — Crusier, Blackerking, penarc, Gouwenaar, Bernd Haynold; CC BY-SA y dominio público",kg:"kg en venta",pmax:"Máximo",pmin:"mínimo",
  src:"Fuente",vsPrev:"respecto al dato anterior",vsYear:"respecto a octubre de 2025 (25,00 €/kg)",same:"Sin cambio",plSeen:"Dónde ha brotado",altT:"A qué altitud",altR:"entre {a} y {b} m; la mitad de los avistamientos, por encima de {m} m",seen:"Avistamientos",other:"Otros lugares",near:"Cerca de",lastSeen:"último:",seenNone:"No hay avistamientos registrados de esta seta en el último año.",p45:"en los últimos 45 días",p365:"en el último año (no hay ninguno en los últimos 45 días)",seenNote:"Avistamientos reales registrados en iNaturalist {p}, agrupados por el pueblo o monte más cercano; cada punto del mapa es uno. Solo aparece lo que alguien ha subido: que no haya puntos no significa que no haya setas.",mT:"Luna",mph:["Nueva","Creciente","Cuarto creciente","Gibosa creciente","Llena","Gibosa menguante","Cuarto menguante","Menguante"],mIll:"{n} % iluminada",mFull:"Llena",mNew:"Nueva",mQ1:"C. creciente",mQ3:"C. menguante",mLeft:"faltan {n} días",mToday:"hoy",mNote:"Fechas aproximadas (pueden variar un día).",trend:"Tendencia desde la feria anterior",up:"Sube",down:"Baja",flat:"Se mantiene",mid:"precio medio del rango",last:"Última vez en la lista"},
 eu:{pl:"Non ateratzen da gehien orain (estimazioa)",towns:"Herriak",mounts:"Mendiak",
  plNote:"Ereduaren estimazioa, beheko baldintzekin; ez dira benetako bilketa-erregistroak. Mapako zenbakiek lehen bostak adierazten dituzte. Ukitu izen bat mapan ikusteko.",
  plNone:"Baldintza hauekin ez da lekurik nabarmentzen perretxiko honentzat.",
  pr:"Ordiziako azokako salneurriak",prUnit:"€/kg",prNone:"Perretxiko hau ez dago Ordiziako salneurrien zerrendan.",
  prOther:"Erreferentzia: «Beste perretxikoak» Mercabarnan",prNote:"Asteazkenetako azokako salneurria; ez da biltzaileari ordaintzen zaiona. Asteazken arratsaldero eguneratzen da berez.",upd:"Azken eguneraketa",tr:"Zein zuhaitzi begiratu",trNone:"Perretxiko hau belardi irekietan ateratzen da, zuhaitzik gabe: bilatu belar berdeago eta altuagoko zirkuluak.",trCred:"Argazkiak: Wikimedia Commons — Crusier, Blackerking, penarc, Gouwenaar, Bernd Haynold; CC BY-SA eta jabari publikoa",kg:"kg salgai",pmax:"Gehienekoa",pmin:"gutxienekoa",
  src:"Iturria",vsPrev:"aurreko datuarekiko",vsYear:"2025eko urriarekiko (25,00 €/kg)",same:"Aldaketarik gabe",plSeen:"Non atera den",altT:"Zer altitudetan",altR:"{a} eta {b} m artean; behaketen erdia {m} m-tik gora",seen:"Behaketak",other:"Beste leku batzuk",near:"Hemendik gertu:",lastSeen:"azkena:",seenNone:"Ez dago perretxiko honen behaketarik erregistratuta azken urtean.",p45:"azken 45 egunetan",p365:"azken urtean (azken 45 egunetan ez dago bat ere)",seenNote:"iNaturalisten erregistratutako benetako behaketak {p}, herri edo mendi hurbilenaren arabera taldekatuta; mapako puntu bakoitza bat da. Norbaitek igotakoa bakarrik agertzen da: punturik ez egoteak ez du esan nahi perretxikorik ez dagoenik.",mT:"Ilargia",mph:["Ilberria","Ilgora","Ilgora (laurdena)","Ilgora (ia betea)","Ilbetea","Ilbehera (ia betea)","Ilbehera (laurdena)","Ilbehera"],mIll:"% {n} argituta",mFull:"Ilbetea",mNew:"Ilberria",mQ1:"Ilgora",mQ3:"Ilbehera",mLeft:"{n} egun falta dira",mToday:"gaur",mNote:"Gutxi gorabeherako datak (egun bat alda daitezke).",trend:"Joera aurreko azokatik",up:"Gora",down:"Behera",flat:"Berdin",mid:"tartearen batez besteko prezioa",last:"Azken aldiz zerrendan"}
};
/* [nombre, longitud, latitud] — posiciones aproximadas */
var TOWNS=[
 ["Covaleda",-2.88,41.93],["Duruelo de la Sierra",-2.93,41.95],["Vinuesa",-2.76,41.91],["Navaleno",-3.0,41.84],["San Leonardo de Yagüe",-3.07,41.83],
 ["Quintanar de la Sierra",-3.04,41.98],["Canicosa de la Sierra",-3.04,41.93],["Vilviestre del Pinar",-3.08,41.95],["Hontoria del Pinar",-3.16,41.85],["Neila",-3.0,42.06],
 ["Abejar",-2.78,41.81],["Molinos de Duero",-2.79,41.88],["El Royo",-2.65,41.91],["Almazán",-2.53,41.49],["Tardelcuende",-2.64,41.59],["Quintana Redonda",-2.61,41.64],
 ["Ágreda",-1.92,41.86],["Salas de los Infantes",-3.28,42.02],["Covarrubias",-3.52,42.06],["Pradoluengo",-3.2,42.33],["Espinosa de los Monteros",-3.55,43.08],
 ["Medina de Pomar",-3.49,42.93],["Sedano",-3.75,42.72],
 ["Ezcaray",-3.01,42.33],["Anguiano",-2.76,42.26],["Torrecilla en Cameros",-2.63,42.25],["Ortigosa de Cameros",-2.7,42.18],["Villoslada de Cameros",-2.67,42.11],["Lumbreras",-2.62,42.1],
 ["Ochagavía / Otsagabia",-1.09,42.91],["Isaba / Izaba",-0.92,42.86],["Roncal / Erronkari",-0.96,42.81],["Orbaizeta",-1.23,42.98],["Auritz / Burguete",-1.33,42.99],
 ["Eugi",-1.51,42.98],["Elizondo",-1.52,43.14],["Etxalar",-1.64,43.23],["Lesaka",-1.7,43.25],["Leitza",-1.91,43.08],["Lekunberri",-1.89,43.0],
 ["Altsasu / Alsasua",-2.17,42.9],["Zudaire",-2.09,42.78],["Estella-Lizarra",-2.03,42.67],["Yesa",-1.2,42.62],
 ["Zegama",-2.29,42.97],["Oñati",-2.41,43.03],["Ataun",-2.18,43.0],["Zeanuri",-2.75,43.1],["Orozko",-2.91,43.11],["Murgia",-2.82,42.96],
 ["Agurain / Salvatierra",-2.39,42.85],["Maeztu",-2.45,42.74],["Kanpezu / Campezo",-2.37,42.67],["Bernedo",-2.5,42.63],["Laguardia",-2.58,42.55],["Valdegovía / Gaubea",-3.1,42.85]
];
/* Precios: vienen de data.js (window.SETAS_DATA), que se actualiza cada semana. */
var D=window.SETAS_DATA||{prices:{},sources:[],lastFair:"",updated:""};
/* Árboles y plantas donde fijarse. img: archivo en img/ (opcional). */
var TREES={
 pino:{img:"tree-pino.jpg",es:"Pino silvestre",eu:"Pinu gorria",sci:"Pinus sylvestris",tip:{es:"Corteza anaranjada en la parte alta del tronco y acículas cortas, de dos en dos.",eu:"Azal laranja enborraren goialdean eta orratz laburrak, binaka."}},
 haya:{img:"tree-haya.jpg",es:"Haya",eu:"Pagoa",sci:"Fagus sylvatica",tip:{es:"Tronco liso y gris; hoja ovalada con el borde ondulado y hojarasca cobriza en el suelo.",eu:"Enbor leun eta grisa; hosto obalatua, ertz uhinduna, eta orbel gorrixka lurrean."}},
 roble:{img:"tree-roble.jpg",es:"Roble",eu:"Haritza",sci:"Quercus robur, Q. pyrenaica",tip:{es:"Hoja lobulada y bellotas; corteza agrietada. Mira en claros y bordes soleados.",eu:"Hosto gingilduna eta ezkurrak; azal pitzatua. Begiratu soilgune eta ertz eguzkitsuetan."}},
 encina:{img:"tree-encina.jpg",es:"Encina",eu:"Artea",sci:"Quercus ilex",tip:{es:"Hoja pequeña, dura y perenne, verde oscura por arriba y grisácea por debajo.",eu:"Hosto txiki, gogor eta iraunkorra, gainetik berde iluna eta azpitik grisaxka."}},
 castano:{img:"tree-castano.jpg",es:"Castaño",eu:"Gaztainondoa",sci:"Castanea sativa",tip:{es:"Hoja larga y aserrada; erizos con castañas en el suelo en otoño.",eu:"Hosto luze eta zerraduna; udazkenean morkotsak gaztainekin lurrean."}},
 espino:{img:"tree-espino.jpg",es:"Espino albar",eu:"Elorri zuria",sci:"Crataegus monogyna",tip:{es:"Arbusto espinoso de setos y prados, con flor blanca en primavera y fruto rojo en otoño.",eu:"Heskai eta belardietako zuhaixka arantzaduna; udaberrian lore zuria eta udazkenean fruitu gorria."}},
 cardo:{img:"tree-cardo.jpg",es:"Cardo corredor",eu:"Gardu korrokoila",sci:"Eryngium campestre",tip:{es:"Cardo bajo, gris azulado y muy pinchudo, en pastos secos y eriales; la seta sale sobre sus raíces muertas.",eu:"Gardu baxua, gris-urdinxka eta oso arantzatsua, larre lehor eta lugorrietan; ziza haren sustrai hiletan ateratzen da."}}
};
var SPTREES={edulis:["pino","haya","roble"],aereus:["roble","encina","castano"],niscalo:["pino"],perretxiko:["espino"],cardo:["cardo"],rebozuelo:["roble","haya","encina"],
 trompeta:["haya","roble"],angula:["pino"],senderuela:[],galamperna:["roble","pino"],gibelurdin:["haya","roble","castano"]};
var MES={es:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],eu:["urt.","ots.","mar.","api.","mai.","eka.","uzt.","abu.","ira.","urr.","aza.","abe."]};

var api=null,OBS=window.SETAS_OBS||null,mode=OBS?"seen":"towns",rank={towns:[],mounts:[],seen:[]},seenInfo={recent:true,pts:[]};
function L(k){return TX[api.S.lang][k];}
function eur(v){return v.toFixed(2).replace(".",",");}
function fdate(d){if(!d)return "";var p=d.split("-"),m=MES[api.S.lang][+p[1]-1],y=p[0]===String(D.updated).slice(0,4)?"":" "+p[0];return api.S.lang==="eu"?(y?p[0]+"ko ":"")+m+" "+(+p[2]):(+p[2])+" "+m+y;}
function nearCell(x,y){var C=api.CELLS,b=null,bd=1e9;for(var j=0;j<C.length;j++){var d=Math.abs(C[j].x-x)+Math.abs(C[j].y-y);if(d<bd){bd=d;b=C[j];}}return b;}
var REF=[["Bilbao",-2.93,43.26],["Donostia",-1.98,43.32],["Vitoria-Gasteiz",-2.67,42.85],["Pamplona / Iruña",-1.64,42.82],["Logroño",-2.45,42.47],["Burgos",-3.7,42.34],["Soria",-2.47,41.76],
 ["Miranda de Ebro",-2.94,42.69],["Tudela",-1.61,42.06],["Aranda de Duero",-3.69,41.67],["Durango",-2.63,43.17],["Tolosa",-2.08,43.14],["Gernika",-2.68,43.32],["Balmaseda",-3.19,43.19],
 ["Tafalla",-1.67,42.53],["Sangüesa / Zangoza",-1.28,42.58],["Calahorra",-1.96,42.3],["Haro",-2.85,42.58],["Briviesca",-3.32,42.55],["Lerma",-3.76,42.03],["El Burgo de Osma",-3.07,41.59],
 ["Villarcayo",-3.57,42.94],["Azpeitia",-2.27,43.18],["Eibar",-2.47,43.18],["Laudio / Llodio",-2.96,43.14],["Irun",-1.79,43.34],["Zarautz",-2.17,43.28],["Arnedo",-2.1,42.23],["Nájera",-2.73,42.42],
 ["Medinaceli",-2.43,41.17],["Berlanga de Duero",-2.86,41.47],["Ordizia",-2.18,43.05],["Bermeo",-2.72,43.42],["Karrantza",-3.36,43.23]];
function placeOf(x,y){
  var KX=api.KX,all=TOWNS.concat(REF),b=null,bd=1e9,i;
  for(i=0;i<all.length;i++){var dx=(x-all[i][1])*KX,dy=y-all[i][2],d=dx*dx+dy*dy;if(d<bd){bd=d;b=all[i][0];}}
  if(bd<=0.1*0.1)return b;
  for(i=0;i<api.ZONES.length;i++){var z=api.ZONES[i],a=(x-z[1])/z[3],c=(y-z[2])/z[4];if(a*a+c*c<=1)return z[0];}
  return bd<=0.3*0.3?L("near")+" "+b:null;
}
function seenRank(){
  seenInfo={recent:true,pts:[]};
  if(!OBS||!OBS.by)return [];
  var all=OBS.by[api.SP[api.S.sp].id]||[],lim=new Date(new Date(OBS.updated).getTime()-45*864e5).toISOString().slice(0,10);
  var pts=all.filter(function(o){return o[2]>=lim;});
  if(!pts.length){pts=all;seenInfo.recent=false;}
  seenInfo.pts=pts;
  var al=pts.map(function(o){return o[3];}).filter(function(v){return typeof v==="number";}).sort(function(a,b){return a-b;});
  seenInfo.alt=al.length?[al[0],al[Math.floor(al.length/2)],al[al.length-1],al.length]:null;
  var g={},other=L("other");
  pts.forEach(function(o){var n=placeOf(o[0],o[1])||other,p=g[n]||(g[n]={n:n,k:0,last:"",x:0,y:0,as:0,an:0});p.k++;if(typeof o[3]==="number"){p.as+=o[3];p.an++;}p.x+=o[0];p.y+=o[1];if(o[2]>p.last){p.last=o[2];p.lx=o[0];p.ly=o[1];}});
  return Object.keys(g).map(function(n){var p=g[n];p.x/=p.k;p.y/=p.k;p.c=nearCell(p.lx,p.ly);return p;}).sort(function(a,b){return (a.n===other)-(b.n===other)||b.k-a.k||(b.last>a.last?1:-1);}).slice(0,8);
}
function compute(){
  var C=api.CELLS,KX=api.KX,R=0.075,towns=[],agg={},i,j;
  for(i=0;i<TOWNS.length;i++){
    var tw=TOWNS[i],near=[];
    for(j=0;j<C.length;j++){var dx=(C[j].x-tw[1])*KX,dy=C[j].y-tw[2];if(dx*dx+dy*dy<=R*R)near.push(C[j]);}
    if(!near.length)continue;
    near.sort(function(a,b){return b.s-a.s;});
    var top=near.slice(0,6),sum=0;for(j=0;j<top.length;j++)sum+=top[j].s;
    towns.push({n:tw[0],x:tw[1],y:tw[2],s:sum/top.length,c:near[0]});
  }
  for(j=0;j<C.length;j++){var c=C[j];if(c.z<0)continue;var a=agg[c.z]||(agg[c.z]={n:0,s:0,c:c});a.n++;a.s+=c.s;if(c.s>a.c.s)a.c=c;}
  var mounts=Object.keys(agg).map(function(k){var a=agg[k],z=api.ZONES[+k];return {n:z[0],x:z[1],y:z[2],s:a.s/a.n,c:a.c};});
  function fin(l){return l.filter(function(p){return p.s>=15;}).sort(function(a,b){return b.s-a.s;}).slice(0,8);}
  rank={towns:fin(towns),mounts:fin(mounts),seen:seenRank()};
}
function m50(v){return String(Math.round(v/50)*50).replace(/\B(?=(\d{3})+(?!\d))/g,".");}
function renderPlaces(){
  var el=document.getElementById("places");if(!el)return;
  var list=rank[mode],e=api.esc,seen=mode==="seen";
  function tab(m,k){return '<button type="button" data-mode="'+m+'" aria-pressed="'+(mode===m)+'">'+L(k)+'</button>';}
  var h='<h2>'+L(seen?"plSeen":"pl")+'</h2><div class="seg" role="group">'+(OBS?tab("seen","seen"):"")+tab("towns","towns")+tab("mounts","mounts")+'</div>';
  if(!list.length){if(!seen)h+='<p class="muted">'+L("plNone")+'</p>';}
  else h+='<ol class="rank">'+list.map(function(p,i){return '<li><button type="button" data-go="'+i+'"><span class="num">'+(i+1)+'</span><span class="nm">'+e(p.n)+(seen?'<br><span class="muted">'+L("lastSeen")+" "+fdate(p.last)+(p.an?" \u00b7 "+m50(p.as/p.an)+" m":"")+'</span>':'')+'</span>'+(seen?'<b>'+p.k+'</b>':api.pill(p.s))+'</button></li>';}).join("")+'</ol>';
  if(seen&&list.length&&seenInfo.alt)h+='<p><b>'+L("altT")+':</b> '+(seenInfo.alt[3]>1?L("altR").replace("{a}",m50(seenInfo.alt[0])).replace("{b}",m50(seenInfo.alt[2])).replace("{m}",m50(seenInfo.alt[1])):m50(seenInfo.alt[0])+" m")+'</p>';
  if(!seen||list.length)h+='<p class="muted">'+(seen?L("seenNote").replace("{p}",L(seenInfo.recent?"p45":"p365"))+" "+L("upd")+": "+fdate(OBS.updated)+".":L("plNote"))+'</p>';
  el.innerHTML=h;
}
function hi(p){return p[2]==null?p[1]:p[2];}
function num(v){return v%1===0?String(v):eur(v);}
function ptxt(p,full){return hi(p)===p[1]?(full?eur(p[1]):num(p[1])):num(p[1])+"–"+num(hi(p));}
function chg(a,b){var d=(a-b)/b*100;return d===0?"=":(d>0?"▲ +":"▼ −")+Math.abs(d).toFixed(0)+" %";}
function quoteHtml(q){
  var e=api.esc,s=q.serie,last=s[s.length-1],lang=api.S.lang;
  var h='<li><div class="q"><span><b>'+e(q.m)+'</b><br><span class="muted">'+(q.lab?q.lab[lang]:fdate(last[0]))+(last[3]?" · "+last[3]+" "+L("kg"):"")+'</span></span><span class="price">'+ptxt(last,true)+' <small>'+L("prUnit")+'</small></span></div>';
  if(s.length>1){
    var prev=s[s.length-2],mx=0,i;
    for(i=0;i<s.length;i++)mx=Math.max(mx,hi(s[i]));
    h+='<div class="spark">'+s.map(function(p){var top=Math.round(hi(p)/mx*44),low=hi(p)===p[1]?0:Math.round(p[1]/mx*44);return '<div><span class="val">'+ptxt(p,false)+'</span><i style="height:'+Math.max(top-low,3)+'px;margin-bottom:'+low+'px'+(low?";border-radius:3px":"")+'"></i><span class="lab">'+fdate(p[0])+'</span></div>';}).join("")+'</div>';
    var range=hi(last)!==last[1]||hi(prev)!==prev[1],ml=(last[1]+hi(last))/2,mp=(prev[1]+hi(prev))/2,d=(ml-mp)/mp*100;
    var word=d>0.5?"▲ "+L("up")+" +"+d.toFixed(0)+" %":(d<-0.5?"▼ "+L("down")+" −"+Math.abs(d).toFixed(0)+" %":"= "+L("flat"));
    h+='<div style="margin-top:6px"><span class="muted">'+L("trend")+" ("+fdate(prev[0])+'):</span><br><b style="display:inline-block;margin-top:4px;padding:5px 11px;border-radius:999px;background:var(--land);font-size:15px">'+word+'</b></div>';
    if(range)h+='<div class="muted" style="margin-top:4px">'+L("pmax")+" "+chg(hi(last),hi(prev))+", "+L("pmin")+" "+chg(last[1],prev[1])+" ("+L("mid")+": "+num(mp)+" → "+num(ml)+" €/kg)</div>";
  }
  if(q.year){h+='<div class="muted">'+chg(last[1],q.year)+" "+L("vsYear")+'</div>';}
  if(D.note&&last[0]>=D.lastFair)h+='<div class="muted">'+D.note[lang]+'</div>';
  if(last[0]<D.lastFair)h+='<div class="muted">'+L("last")+": "+fdate(last[0])+'.</div>';
  h+='<div style="font-size:13px">'+L("src")+": "+D.sources.map(function(x){return '<a href="'+x[1]+'" target="_blank" rel="noopener">'+e(x[0])+'</a>';}).join(" · ")+'</div></li>';
  return h;
}
function renderPrices(){
  var el=document.getElementById("prices");if(!el)return;
  var id=api.SP[api.S.sp].id,p=D.prices[id],qs=p&&p.serie&&p.serie.length?[{m:"Ordizia"+(p.name?" ("+p.name+")":""),serie:p.serie}]:null,h='<h2>'+L("pr")+'</h2>';
  if(!qs){el.style.display="none";el.innerHTML="";return;}
  el.style.display="";
  if(qs)h+='<ul class="quotes">'+qs.map(quoteHtml).join("")+'</ul>';
  else h+='<p>'+L("prNone")+'</p>';
  h+='<p class="muted">'+L("prNote")+" "+L("upd")+": "+fdate(D.updated)+'.</p>';
  el.innerHTML=h;
}
function renderTrees(){
  var el=document.getElementById("trees");if(!el)return;
  var id=api.SP[api.S.sp].id,list=SPTREES[id]||[],lang=api.S.lang,e=api.esc,any=false,h='<h2>'+L("tr")+'</h2>';
  if(!list.length)h+='<p class="muted">'+L("trNone")+'</p>';
  else h+='<ul class="trees">'+list.map(function(k){var t=TREES[k];if(t.img)any=true;return '<li>'+(t.img?'<img src="img/'+t.img+'" alt="'+e(t[lang])+'" loading="lazy">':'')+'<div><b>'+e(t[lang])+'</b> <span class="sci">'+e(t.sci)+'</span><br><span class="muted">'+e(t.tip[lang])+(t.cred?" · "+e(t.cred):"")+'</span></div></li>';}).join("")+'</ul>';
  if(any)h+='<p class="cred">'+L("trCred")+'</p>';
  el.innerHTML=h;
}
/* ---- Veredicto de hoy y base científica ---- */
var SCI_URL={parlade:"https://www.sciencedirect.com/science/article/abs/pii/S0378112717301317",porcini:"https://www.biorxiv.org/content/10.64898/2025.12.12.693895v1.full.pdf",
 pinar:"https://elige.soria.es/productividad-micologica-en-pinar-grande/",varga:"https://pubmed.ncbi.nlm.nih.gov/23392533/",mpena:"https://www.researchgate.net/publication/237836204_Yield_models_for_ectomycorrhizal_mushrooms_in_Pinus_sylvestris_forests_with_special_focus_on_Boletus_edulis_and_Lactarius_group_deliciosus",
 egli:"https://www.zobodat.at/pdf/Sydowia_063_0023-0033.pdf"};
var SCI={
 es:{t:"Qué dice la ciencia",none:"De esta seta no he encontrado estudios: sus valores de lluvia, temperatura y altitud son orientativos, de guías micológicas.",
  rest:"Burgos, La Rioja, Álava, Navarra, Gipuzkoa y Bizkaia",restTxt:"No he encontrado estudios de campo hechos en estas provincias; el mapa les aplica lo que se sabe de Soria y de fuera.",out:"Fuera de España",
  all:[["Soria","La lluvia es lo que más manda: en los pinares, la del otoño (septiembre a noviembre) es la que explica la cosecha de hongo."]],
  sp:{edulis:[["Soria","En Pinar Grande tarda unos 11 días en madurar desde que asoma, y el 43 % de la cosecha salió en la tercera semana de octubre."],
              ["Fuera de España","En hayedos de Alemania (2015-2024) brota sobre todo con unos 13 °C de media en los 20 días anteriores, y más cuanta más lluvia se acumula en 26 días. El mapa usa ese óptimo y esa ventana de lluvia."]],
      niscalo:[["Soria","En los pinares su cosecha sube con la lluvia y la humedad y baja cuando las temperaturas son altas."],
               ["Soria","La lluvia de agosto y septiembre es de lo que más pesa en la cosecha del año."]]}},
 eu:{t:"Zer dio zientziak",none:"Perretxiko honi buruz ez dut ikerketarik aurkitu: euri, tenperatura eta altitude balioak orientagarriak dira, mikologia-gidetatik hartuak.",
  rest:"Burgos, Errioxa, Araba, Nafarroa, Gipuzkoa eta Bizkaia",restTxt:"Ez dut probintzia hauetan egindako landa-ikerketarik aurkitu; mapak Soriari eta kanpokoari buruz dakiguna aplikatzen die.",out:"Espainiatik kanpo",
  all:[["Soria","Euria da garrantzitsuena: pinudietan, udazkeneko euriak (irailetik azarora) azaltzen du onddo-uzta."]],
  sp:{edulis:[["Soria","Pinar Granden 11 egun inguru behar ditu heltzeko, eta uztaren % 43 urriko hirugarren astean atera zen."],
              ["Espainiatik kanpo","Alemaniako pagadietan (2015-2024) batez ere aurreko 20 egunetan 13 °C inguruko batez bestekoarekin ateratzen da, eta gehiago 26 egunetan euri gehiago pilatzen den heinean. Mapak optimo eta euri-leiho hori erabiltzen ditu."]],
      niscalo:[["Soria","Pinudietan uzta euriarekin eta hezetasunarekin igotzen da, eta tenperatura altuekin jaitsi."],
               ["Soria","Abuztuko eta iraileko euriak pisu handia du urteko uztan."]]}}
};
var VT={es:{t:"Hoy para",lv:["Muy poco probable","Poco probable","Posible","Buen momento"],fail:"Lo que más frena",sea:"Temporada",rain:"Lluvia",temp:"Temperatura",lag:"Días tras la lluvia",
  seaTxt:"{m}: {n} % de su temporada",rainTxt:"{a} mm en 26 días; necesita unos {b} mm",tempTxt:"{a} °C a 800 m; ideal entre {b} y {c} °C",lagTxt:"{a} días; ideal entre {b} y {c}",frost:"Ha helado estos días: resta probabilidad.",
  where:"Mejor zona",noz:"ninguna zona destaca",swipe:"Desliza a los lados para cambiar de provincia",lagNone:"sin lluvia fuerte en el último mes"},
 eu:{t:"Gaur:",lv:["Oso aukera gutxi","Aukera gutxi","Litekeena","Une ona"],fail:"Gehien oztopatzen duena",sea:"Sasoia",rain:"Euria",temp:"Tenperatura",lag:"Egunak euriaren ondoren",
  seaTxt:"{m}: sasoiaren % {n}",rainTxt:"{a} mm 26 egunetan; {b} mm inguru behar ditu",tempTxt:"{a} °C 800 m-tan; egokiena {b} eta {c} °C artean",lagTxt:"{a} egun; egokiena {b} eta {c} artean",frost:"Izoztea egin du egunotan: aukera murrizten du.",
  where:"Eremu onena",noz:"ez da eremurik nabarmentzen",swipe:"Irristatu alboetara probintzia aldatzeko",lagNone:"euri handirik gabe azken hilabetean"}};
var MFULL={es:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],eu:["urtarrila","otsaila","martxoa","apirila","maiatza","ekaina","uztaila","abuztua","iraila","urria","azaroa","abendua"]};
var PORD=["Gipuzkoa","Bizkaia","Álava","Navarra","La Rioja","Burgos","Soria"],vProv=null,vList=[];
try{vProv=localStorage.getItem("setas-prov")||null;}catch(e){}
function vPanel(cur){
  var S=api.S,sp=api.SP[S.sp],T=VT[S.lang],C=api.CELLS,e=api.esc,i,n=0,a={rain:0,temp:0},agg={},X=S;
  for(i=0;i<C.length;i++){var c=C[i],f=c.f;if(!f||(cur&&c.pn!==cur))continue;if(cur&&c.wx)X=c.wx;
    if(f.hab>0&&f.alt>0){n++;a.rain+=f.rain;a.temp+=f.temp;}
    if(c.z>=0){var g=agg[c.z]||(agg[c.z]={n:0,s:0});g.n++;g.s+=c.s;}}
  var best=-1,bs=0;Object.keys(agg).forEach(function(k){if(agg[k].n<3)return;var m=agg[k].s/agg[k].n;if(m>bs){bs=m;best=+k;}});
  var lag=[sp.lag[0]-1,sp.lag[1],sp.lag[2],sp.lag[3]],d=X.days,fl=(d<=lag[0]||d>=lag[3])?0:(d<lag[1]?(d-lag[0])/(lag[1]-lag[0]):(d>lag[2]?(lag[3]-d)/(lag[3]-lag[2]):1));
  var rows=[["sea",sp.m[S.month],T.seaTxt.replace("{m}",MFULL[S.lang][S.month]).replace("{n}",Math.round(sp.m[S.month]*100))],
            ["rain",n?a.rain/n:0,T.rainTxt.replace("{a}",X.rain).replace("{b}",sp.rain)],
            ["temp",n?a.temp/n:0,T.tempTxt.replace("{a}",X.temp).replace("{b}",sp.t[1]).replace("{c}",sp.t[2])],
            ["lag",fl,d>=45?T.lagNone:T.lagTxt.replace("{a}",X.days).replace("{b}",sp.lag[1]).replace("{c}",sp.lag[2])]];
  var lvl=bs<15?0:(bs<40?1:(bs<65?2:3)),col=["#7d8a84","#c9892b","#d9662a","#9b1c46"][lvl],worst=rows.slice().sort(function(x,y){return x[1]-y[1];})[0];
  function mark(v){return v>=0.66?['✓',"#1c8a5a"]:(v>=0.33?['~',"#c9892b"]:['✕',"#c2334d"]);}
  var h='<div class="muted" style="font-size:12px">'+T.t+" "+e(sp[S.lang])+'</div>'+(cur?'<div style="font:700 26px var(--display);line-height:1.1;margin:2px 0 6px">'+e(cur)+'</div>':'')+
    '<div style="display:flex;align-items:center;gap:10px;margin:2px 0 10px"><span style="width:14px;height:14px;border-radius:50%;background:'+col+';flex:none"></span><span style="font:700 20px var(--display);line-height:1.15">'+T.lv[lvl]+'</span></div>';
  h+='<div style="display:flex;flex-direction:column;gap:7px">'+rows.map(function(r){var m=mark(r[1]);return '<div style="display:flex;gap:10px;align-items:flex-start"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:'+m[1]+';color:#fff;font:700 14px/24px var(--body);text-align:center">'+m[0]+'</span><span style="min-width:0"><b>'+T[r[0]]+'</b><br><span class="muted">'+r[2]+'</span></span></div>';}).join("")+'</div>';
  if(lvl<3&&worst[1]<0.66)h+='<p style="margin-top:10px"><b>'+T.fail+":</b> "+T[worst[0]].toLowerCase()+'.</p>';
  if(X.frost)h+='<p class="muted">'+T.frost+'</p>';
  if(best>=0&&bs>=15)h+='<p class="muted"><b>'+T.where+":</b> "+e(api.ZONES[best][0])+'</p>';
  return h;
}
function vMark(){
  var el=document.getElementById("verdict");if(!el||!el.querySelectorAll)return;
  var k=vList.indexOf(vProv);
  Array.prototype.forEach.call(el.querySelectorAll("[data-vp]"),function(b,j){var on=j===k;b.setAttribute("aria-pressed",on);b.style.background=on?"var(--accent)":"var(--card)";b.style.color=on?"var(--accent-ink)":"var(--ink)";if(on&&b.parentNode){var bar=b.parentNode,x=b.offsetLeft-bar.offsetLeft-(bar.clientWidth-b.offsetWidth)/2;if(bar.scrollTo)try{bar.scrollTo({left:x,behavior:"smooth"});}catch(e){bar.scrollLeft=x;}else bar.scrollLeft=x;}});
  Array.prototype.forEach.call(el.querySelectorAll("[data-vd]"),function(d,j){d.style.background=j===k?"var(--accent)":"var(--line)";d.style.width=j===k?"18px":"7px";});
}
function vSet(p,scroll){
  if(vList.indexOf(p)<0)return;
  var ch=p!==vProv;vProv=p;try{localStorage.setItem("setas-prov",p);}catch(e){}
  vMark();
  var tr=document.getElementById("vtrack");
  if(scroll&&tr){var x=vList.indexOf(p)*tr.clientWidth;if(tr.scrollTo)try{tr.scrollTo({left:x,behavior:"smooth"});}catch(e){tr.scrollLeft=x;}else tr.scrollLeft=x;}
  if(ch){wxProv=p;renderWeather();}
}
function renderVerdict(){
  var el=document.getElementById("verdict");if(!el)return;
  var C=api.CELLS,e=api.esc,T=VT[api.S.lang],i,bc=null;
  vList=PORD.filter(function(p){for(var j=0;j<C.length;j++)if(C[j].pn===p)return true;return false;});
  if(!vList.length){el.innerHTML=vPanel(null);return;}
  for(i=0;i<C.length;i++){if(C[i].f&&(!bc||C[i].s>bc.s))bc=C[i];}
  if(!vProv||vList.indexOf(vProv)<0)vProv=(bc&&bc.pn)||vList[0];
  var h='<div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:8px;margin-bottom:6px;scrollbar-width:none">'+vList.map(function(p){return '<button type="button" data-vp="'+e(p)+'" style="flex:none;border:1px solid var(--line);border-radius:999px;padding:7px 12px;font:600 13px var(--body);cursor:pointer;transition:background .2s,color .2s">'+e(p)+'</button>';}).join("")+'</div>';
  h+='<div id="vtrack" style="display:flex;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;overscroll-behavior-x:contain;margin:0 -14px">'+vList.map(function(p){return '<div style="flex:0 0 100%;scroll-snap-align:center;scroll-snap-stop:always;padding:0 14px;min-width:0">'+vPanel(p)+'</div>';}).join("")+'</div>';
  h+='<div style="display:flex;justify-content:center;align-items:center;gap:6px;margin-top:12px">'+vList.map(function(){return '<span data-vd style="height:7px;width:7px;border-radius:4px;background:var(--line);transition:width .2s,background .2s"></span>';}).join("")+'</div><p class="cred" style="text-align:center">'+T.swipe+'</p>';
  el.innerHTML=h;
  var tr=document.getElementById("vtrack");
  if(tr){tr.scrollLeft=vList.indexOf(vProv)*tr.clientWidth;var tm=null;
    if(tr.addEventListener)tr.addEventListener("scroll",function(){if(tm)clearTimeout(tm);tm=setTimeout(function(){var w=tr.clientWidth||1,j=Math.max(0,Math.min(vList.length-1,Math.round(tr.scrollLeft/w)));if(vList[j]!==vProv)vSet(vList[j],false);},90);},{passive:true});}
  vMark();
  if(!el._vp){el._vp=1;el.addEventListener("click",function(ev){var b=ev.target.closest?ev.target.closest("[data-vp]"):null;if(b)vSet(b.getAttribute("data-vp"),true);});}
}
function renderScience(){
  var el=document.getElementById("science");if(!el)return;
  var K=SCI[api.S.lang],id=api.SP[api.S.sp].id,own=K.sp[id]||[],e=api.esc,g={},order=[];
  if(!own.length){el.style.display="none";el.innerHTML="";return;}
  el.style.display="";
  own.concat(id==="edulis"?K.all:[]).forEach(function(x){if(!g[x[0]]){g[x[0]]=[];order.push(x[0]);}g[x[0]].push(x[1]);});
  var h='<h2>'+K.t+" \u00b7 "+e(api.SP[api.S.sp][api.S.lang])+'</h2>';
  order.forEach(function(p){h+='<p style="margin:10px 0 4px"><b>'+e(p)+'</b></p><ul style="margin:0;padding-left:18px">'+g[p].map(function(t){return '<li style="margin-bottom:6px">'+e(t)+'</li>';}).join("")+'</ul>';});
  el.innerHTML=h;
}
/* ---- Resumen del tiempo de las últimas 4 semanas ---- */
var WT={es:{t:"El tiempo de las últimas 4 semanas",wk:"Semana",rain:"lluvia",tm:"media",mn:"mínima",fr:"heladas",nofr:"sin heladas",how:"Cómo afecta a las setas",
  upto:"Datos de AEMET hasta el {d} ({n} estaciones). AEMET publica con unos 3 días de retraso, así que lo de los últimos días aún no cuenta.",allp:"Todas",tapp:"Lluvia de los últimos 26 días, temperatura media y mínima de la última semana. Toca una provincia para ver el detalle por semanas y cómo afecta a las setas.",sts:"Estaciones",lv:["Muy seco","Justo de agua","Buena humedad","Muy regado"],
  r0:"Muy seco: {n} mm en 26 días. Sin agua en el suelo el micelio no fructifica; hace falta un episodio de lluvia de verdad.",
  r1:"Justo de agua: {n} mm en 26 días. Puede salir algo en umbrías, vaguadas y zonas altas o del norte, pero poco.",
  r2:"Buena humedad: {n} mm en 26 días, suficiente para la mayoría de las setas de temporada.",
  r3:"Suelo muy bien regado: {n} mm en 26 días. Si acompaña la temperatura, es de las mejores situaciones.",
  l0:"No ha habido ninguna lluvia fuerte (10 mm o más) en el último mes.",
  l1:"La última lluvia fuerte fue el {d}. Las setas tardan entre una y tres semanas en salir tras la lluvia (el hongo, unos 11 días en madurar), así que lo que mueva esa lluvia se verá entre el {a} y el {b}.",
  l2:"La última lluvia fuerte fue el {d}, hace ya más de tres semanas: su efecto se ha agotado.",
  f1:"Ha helado en {n} de las {m} estaciones (mínima de {t} °C en {s}, el {d}). Las heladas cortan el hongo, el rebozuelo y la gibelurdina; aguantan mejor el níscalo, la angula de monte y la trompeta.",
  f0:"Sin heladas en los últimos días: nada que corte la brotación por frío.",
  t0:"Temperatura media de {n} °C: frío para la mayoría; quedan las especies tardías.",t1:"Temperatura media de {n} °C: fresca, por debajo del óptimo del hongo (unos 13 °C) pero válida para níscalo y angula de monte.",
  t2:"Temperatura media de {n} °C: en el rango bueno para las setas de otoño.",t3:"Temperatura media de {n} °C: calor; favorece a hongo negro y gibelurdina si hay tormentas."},
 eu:{t:"Azken 4 asteetako eguraldia",wk:"Astea",rain:"euria",tm:"batez beste",mn:"minimoa",fr:"izozteak",nofr:"izozterik gabe",how:"Nola eragiten dien perretxikoei",
  upto:"AEMETen datuak {d} arte ({n} estazio). AEMETek 3 egun inguruko atzerapenarekin argitaratzen du, beraz azken egunetakoa ez da oraindik zenbatzen.",allp:"Denak",tapp:"Azken 26 egunetako euria, eta azken asteko batez besteko tenperatura eta minimoa. Ukitu probintzia bat asteroko xehetasuna eta perretxikoengan duen eragina ikusteko.",sts:"Estazioak",lv:["Oso lehor","Ur gutxi","Hezetasun ona","Oso bustita"],
  r0:"Oso lehor: {n} mm 26 egunetan. Lurrean urik gabe mizelioak ez du fruiturik ematen; benetako euri-aldi bat behar da.",
  r1:"Ur gutxi: {n} mm 26 egunetan. Zerbait atera daiteke leku itzaltsu, sakan eta eremu garai edo iparraldekoetan, baina gutxi.",
  r2:"Hezetasun ona: {n} mm 26 egunetan, sasoiko perretxiko gehienentzat nahikoa.",
  r3:"Lurra oso ondo bustita: {n} mm 26 egunetan. Tenperaturak laguntzen badu, egoera onenetakoa da.",
  l0:"Ez da euri handirik (10 mm edo gehiago) izan azken hilabetean.",
  l1:"Azken euri handia {d} izan zen. Perretxikoek aste bat eta hiru aste artean behar dute euriaren ondoren ateratzeko (onddoak 11 egun inguru heltzeko), beraz euri horrek eragindakoa {a} eta {b} artean ikusiko da.",
  l2:"Azken euri handia {d} izan zen, duela hiru aste baino gehiago: haren eragina agortu da.",
  f1:"Izoztea egin du {m} estazioetatik {n}tan (minimoa {t} °C, {s}, {d}). Izozteek onddoa, zizahoria eta gibelurdina mozten dituzte; hobeto eusten diote esne-gorriak, tronpeta horiak eta tronpeta beltzak.",
  f0:"Izozterik gabe azken egunetan: hotzak ez du ezer mozten.",
  t0:"Batez besteko tenperatura {n} °C: hotza gehienentzat; espezie berantiarrak geratzen dira.",t1:"Batez besteko tenperatura {n} °C: freskoa, onddoaren optimoaren azpitik (13 °C inguru) baina egokia esne-gorri eta tronpeta horiarentzat.",
  t2:"Batez besteko tenperatura {n} °C: udazkeneko perretxikoentzako tarte onean.",t3:"Batez besteko tenperatura {n} °C: beroa; onddo beltzari eta gibelurdinari mesede egiten die ekaitzak badaude."}};
function dnum(v){return String(Math.round(v*10)/10).replace(".",",");}
function addDays(iso,n){var d=new Date(iso+"T12:00:00Z");d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);}
var wxProv="";
function renderWeather(){
  var el=document.getElementById("wxcard"),WX=window.SETAS_WEATHER;if(!el||!WX||!WX.hist)return;
  var T=WT[api.S.lang],H=WX.hist,ST=WX.st||{},all=Object.keys(H),last="",i,k,e=api.esc;
  all.forEach(function(s){Object.keys(H[s]).forEach(function(d){if(d>last)last=d;});});
  if(!last){el.innerHTML="";return;}
  var provs=[];all.forEach(function(s){var p=(ST[s]||[])[2];if(p&&provs.indexOf(p)<0)provs.push(p);});
  function nm(s){return (ST[s]||[s])[0];}
  function sum(a){return a.reduce(function(q,w){return q+w;},0);}
  function stat(ids){
    var r={n:ids.length},rs=[],ts=[],mn=null,mnS="",mnD="",cold=0,j;
    ids.forEach(function(s){var p=0,got=0,tt=[],c=false;
      for(j=0;j<26;j++){var v=H[s][addDays(last,-j)];if(!v)continue;if(v[0]!=null){p+=v[0];got++;}
        if(j<7&&v[1]!=null)tt.push(v[1]);
        if(j<7&&v[2]!=null){if(mn===null||v[2]<mn){mn=v[2];mnS=s;mnD=addDays(last,-j);}if(j<5&&v[2]<=0)c=true;}}
      if(got>=10)rs.push(p);if(tt.length)ts.push(sum(tt)/tt.length);if(c)cold++;});
    r.rain=rs.length?sum(rs)/rs.length:null;r.temp=ts.length?sum(ts)/ts.length:null;r.mn=mn;r.mnS=mnS;r.mnD=mnD;r.cold=cold;
    r.lr=null;var need=Math.max(1,Math.ceil(ids.length/3));
    for(j=0;j<40&&!r.lr;j++){var d=addDays(last,-j),c2=0;ids.forEach(function(s){var v=H[s][d];if(v&&v[0]!=null&&v[0]>=10)c2++;});if(c2>=need)r.lr=d;}
    return r;
  }
  function lvl(R){return R==null?-1:(R<15?0:(R<35?1:(R<70?2:3)));}
  var COL=["#c2334d","#c9892b","#1c8a5a","#1c6b58"];
  function tab(p,lab){return '<button type="button" data-prov="'+e(p)+'" aria-pressed="'+(wxProv===p)+'" style="flex:none;border:1px solid var(--line);border-radius:999px;padding:6px 11px;font:600 13px var(--body);cursor:pointer;background:'+(wxProv===p?"var(--accent)":"var(--card)")+';color:'+(wxProv===p?"var(--accent-ink)":"var(--ink)")+'">'+e(lab)+'</button>';}
  var h='<h2>'+T.t+'</h2><div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:6px;margin-bottom:8px">'+tab("",T.allp)+provs.map(function(p){return tab(p,p);}).join("")+'</div>';
  if(!wxProv){
    h+='<div style="display:flex;flex-direction:column;gap:8px">'+provs.map(function(p){
      var ids=all.filter(function(s){return (ST[s]||[])[2]===p;}),r=stat(ids),L2=lvl(r.rain);
      return '<button type="button" data-prov="'+e(p)+'" style="text-align:left;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink);padding:10px;cursor:pointer;font:inherit">'+
        '<div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><b style="font-size:15px">'+e(p)+'</b><span style="font:700 12px var(--body);color:#fff;background:'+(L2<0?"#7d8a84":COL[L2])+';border-radius:999px;padding:3px 9px;white-space:nowrap">'+(L2<0?"?":T.lv[L2])+'</span></div>'+
        '<div class="muted" style="margin-top:3px">'+T.rain+" "+(r.rain==null?"?":dnum(r.rain))+" mm \u00b7 "+T.tm+" "+(r.temp==null?"?":dnum(r.temp))+" °C \u00b7 "+T.mn+" "+(r.mn==null?"?":dnum(r.mn).replace("-","\u2212"))+" °C"+(r.mnS?" ("+e(nm(r.mnS))+")":"")+'</div></button>';}).join("")+'</div>'+
      '<p class="muted" style="margin-top:8px">'+T.tapp+'</p>';
  } else {
    var ids=all.filter(function(s){return (ST[s]||[])[2]===wxProv;}),r=stat(ids),weeks=[],mx=1;
    for(k=0;k<4;k++){var a=addDays(last,-7*k-6),b=addDays(last,-7*k),rs=0,ts=0,tn=0,mn=null,mnS="",fd=0,any=false;
      for(i=0;i<7;i++){var d=addDays(a,i),p=[],t=[],m=[];ids.forEach(function(s){var v=H[s][d];if(!v)return;if(v[0]!=null)p.push(v[0]);if(v[1]!=null)t.push(v[1]);if(v[2]!=null){m.push(v[2]);if(mn===null||v[2]<mn){mn=v[2];mnS=s;}}});
        if(p.length){rs+=sum(p)/p.length;any=true;}if(t.length){ts+=sum(t)/t.length;tn++;}
        if(m.length&&m.filter(function(v){return v<=0;}).length>=Math.max(1,Math.ceil(ids.length/3)))fd++;}
      if(any){weeks.push({a:a,b:b,r:rs,t:tn?ts/tn:null,mn:mn,mnS:mnS,fd:fd});if(rs>mx)mx=rs;}}
    h+='<p class="muted" style="margin-top:0">'+T.sts+": "+ids.map(function(s){return e(nm(s))+" ("+(ST[s]||[0,0])[1]+" m)";}).join(", ")+'</p>';
    h+='<div style="display:flex;flex-direction:column;gap:10px">'+weeks.map(function(w){
      return '<div><div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline"><b>'+fdate(w.a)+" \u2013 "+fdate(w.b)+'</b><span style="font:700 16px var(--display);white-space:nowrap">'+dnum(w.r)+' mm</span></div>'+
        '<div style="height:8px;background:var(--land);border-radius:4px;overflow:hidden;margin:3px 0"><div style="height:100%;width:'+Math.max(2,Math.round(w.r/mx*100))+'%;background:#3b82c4"></div></div>'+
        '<div class="muted">'+(w.t!=null?T.tm+" "+dnum(w.t)+" °C":"")+(w.mn!=null?" \u00b7 "+T.mn+" "+dnum(w.mn).replace("-","\u2212")+" °C ("+e(nm(w.mnS))+")":"")+" \u00b7 "+(w.fd?T.fr+": "+w.fd+" d":T.nofr)+'</div></div>';}).join("")+'</div>';
    var msgs=[],R=r.rain==null?null:Math.round(r.rain);
    if(R!=null)msgs.push(T["r"+lvl(R)].replace("{n}",R));
    if(!r.lr)msgs.push(T.l0);else{var ago=Math.round((new Date(WX.updated+"T12:00:00Z")-new Date(r.lr+"T12:00:00Z"))/864e5);msgs.push((ago>24?T.l2:T.l1).replace("{d}",fdate(r.lr)).replace("{a}",fdate(addDays(r.lr,10))).replace("{b}",fdate(addDays(r.lr,21))));}
    msgs.push(r.cold>=Math.max(1,Math.ceil(ids.length/3))?T.f1.replace("{n}",r.cold).replace("{m}",ids.length).replace("{t}",dnum(r.mn).replace("-","\u2212")).replace("{s}",e(nm(r.mnS))).replace("{d}",fdate(r.mnD)):T.f0);
    if(r.temp!=null){var tt=Math.round(r.temp);msgs.push(T[tt<5?"t0":(tt<10?"t1":(tt<18?"t2":"t3"))].replace("{n}",tt));}
    h+='<h2 style="margin-top:14px">'+T.how+" \u00b7 "+e(wxProv)+'</h2><ul style="margin:0;padding-left:18px">'+msgs.map(function(m){return '<li style="margin-bottom:7px">'+m+'</li>';}).join("")+'</ul>';
  }
  h+='<p class="cred">'+T.upto.replace("{d}",fdate(last)).replace("{n}",all.length)+'</p>';
  el.innerHTML=h;
  if(!el._wx){el._wx=1;el.addEventListener("click",function(ev){var b=ev.target.closest?ev.target.closest("[data-prov]"):null;if(!b)return;wxProv=b.getAttribute("data-prov");renderWeather();});}
}
var SYN=29.530588853,MOON0=Date.UTC(2000,0,6,18,14);
function moonSvg(p){
  var R=30,c=34,k=Math.abs(Math.cos(2*Math.PI*p))*R,wax=p<0.5,cres=(p<0.25||p>0.75);
  var d="M"+c+" "+(c-R)+" A"+R+" "+R+" 0 0 "+(wax?1:0)+" "+c+" "+(c+R)+" A"+k.toFixed(2)+" "+R+" 0 0 "+((wax?!cres:cres)?1:0)+" "+c+" "+(c-R)+" Z";
  return '<svg viewBox="0 0 68 68" width="84" height="84" role="img" aria-hidden="true" style="flex:none"><circle cx="34" cy="34" r="30" fill="#2a333d"/><path d="'+d+'" fill="#f4ebc8"/><circle cx="34" cy="34" r="30" fill="none" stroke="#8a948f" stroke-width="1"/></svg>';
}
function renderMoon(){
  var el=document.getElementById("mooncard");if(!el)return;
  var now=Date.now(),age=(((now-MOON0)/864e5)%SYN+SYN)%SYN,p=age/SYN,ill=Math.round((1-Math.cos(2*Math.PI*p))/2*100),names=L("mph"),idx=Math.floor(p*8+0.5)%8;
  function next(frac){var d=((frac*SYN-age)%SYN+SYN)%SYN,t=new Date(now+d*864e5);return {d:d,txt:t.getDate()+" "+MES[api.S.lang][t.getMonth()]};}
  var full=next(0.5),nw=next(0),q1=next(0.25),q3=next(0.75),left=Math.round(full.d);
  var rows=[[L("mFull"),full],[L("mQ3"),q3],[L("mNew"),nw],[L("mQ1"),q1]].sort(function(a,b){return a[1].d-b[1].d;});
  el.innerHTML='<div style="display:flex;gap:14px;align-items:center">'+moonSvg(p)+'<div style="min-width:0"><h2 style="margin:0 0 2px">'+L("mT")+": "+names[idx]+'</h2><div class="muted">'+L("mIll").replace("{n}",ill)+'</div><div style="margin-top:4px"><b>'+L("mFull")+": "+full.txt+'</b> <span class="muted">('+(left<1?L("mToday"):L("mLeft").replace("{n}",left))+')</span></div></div></div>'+
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:10px;text-align:center;font-size:12px">'+rows.map(function(r){return '<div style="border:1px solid var(--line);border-radius:8px;padding:6px 2px"><span class="muted" style="font-size:11px">'+r[0]+'</span><br><b>'+r[1].txt+'</b></div>';}).join("")+'</div>'+
    '<p class="cred">'+L("mNote")+'</p>';
}
window.setasExtra={
  init:function(a){
    api=a;
    var WXP=window.SETAS_WEATHER&&window.SETAS_WEATHER.prov,PN=["Bizkaia","Gipuzkoa","Álava","Navarra","La Rioja","Soria","Burgos"];
    if(WXP)for(var ci=0;ci<api.CELLS.length;ci++){var cc=api.CELLS[ci],pw=WXP[PN[cc.pv]];if(pw){cc.wx=pw;cc.pn=PN[cc.pv];}}
    var sm=document.getElementById("summary");
    if(sm&&sm.parentNode&&document.createElement){var vd=document.createElement("section");vd.className="card";vd.id="verdict";sm.parentNode.insertBefore(vd,sm);
      var mc=document.createElement("section");mc.className="card";mc.id="mooncard";sm.parentNode.insertBefore(mc,sm);
      var fr=document.getElementById("f-rain"),old=fr&&fr.closest?fr.closest("section"):null;
      if(old&&old.parentNode&&window.SETAS_WEATHER&&window.SETAS_WEATHER.hist){var wc=document.createElement("section");wc.className="card";wc.id="wxcard";old.parentNode.insertBefore(wc,old);old.style.display="none";}
      var pts=document.getElementById("pts"),ps=pts&&pts.closest?pts.closest("section"):null;if(ps)ps.style.display="none";
      if(document.head&&document.createElement){var st=document.createElement("style");st.textContent="#save{display:none!important}";document.head.appendChild(st);}
      var pl=document.getElementById("places");if(pl&&pl.parentNode){var sc=document.createElement("section");sc.className="card";sc.id="science";pl.parentNode.insertBefore(sc,pl);}}
    var cv=document.getElementById("map");
    if(cv&&cv.parentNode&&api.zoom){
      var sec=cv.parentNode;sec.style.position="relative";
      var ctl=document.createElement("div");ctl.style.cssText="position:absolute;top:14px;right:14px;display:flex;flex-direction:column;gap:6px;z-index:2";
      [["+","Acercar",function(){api.zoom(1.7);}],["\u2212","Alejar",function(){api.zoom(1/1.7);}],["\u2922","Mapa grande",function(){this.textContent=api.expand()?"\u2921":"\u2922";}]].forEach(function(d){var b=document.createElement("button");b.type="button";b.textContent=d[0];b.setAttribute("aria-label",d[1]);
        b.style.cssText="width:42px;height:42px;border-radius:8px;border:1px solid var(--line);background:var(--card);color:var(--ink);font:700 20px/1 var(--body);cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.25)";
        b.onclick=d[2];ctl.appendChild(b);});
      sec.appendChild(ctl);
      var at=document.createElement("p");at.className="cred";at.style.margin="2px 4px 0";at.textContent="Pellizca con dos dedos para ampliar. Mapa: \u00a9 OpenStreetMap \u00b7 Relieve: Terrain Tiles (Mapzen)";sec.appendChild(at);
    }
    var el=document.getElementById("places");
    if(el)el.addEventListener("click",function(ev){
      var b=ev.target.closest("[data-mode]");
      if(b){mode=b.getAttribute("data-mode");renderPlaces();api.redraw();return;}
      var g=ev.target.closest("[data-go]");
      if(g){var p=rank[mode][+g.getAttribute("data-go")];if(p&&p.c){api.select(p.c);if(api.centerOn)api.centerOn(p.c.x,p.c.y,3);var m=document.getElementById("map");if(m&&m.scrollIntoView)m.scrollIntoView({block:"center"});}}
    });
  },
  refresh:function(){if(!api)return;compute();renderVerdict();renderMoon();renderWeather();renderScience();renderTrees();renderPlaces();renderPrices();},
  draw:function(ctx,px,py){
    if(!api)return;
    var list=rank[mode].slice(0,5),ink=api.tok("--ink"),card=api.tok("--card"),i;
    ctx.save();
    if(mode==="seen"){for(i=0;i<seenInfo.pts.length;i++){var o=seenInfo.pts[i];ctx.beginPath();ctx.arc(px(o[0]),py(o[1]),3.5,0,6.3);ctx.fillStyle=api.tok("--accent");ctx.fill();ctx.lineWidth=1.2;ctx.strokeStyle=card;ctx.stroke();}}
    ctx.font="700 11px "+api.tok("--body");ctx.textAlign="center";ctx.textBaseline="middle";
    for(i=list.length-1;i>=0;i--){var p=list[i];if(mode==="seen"&&p.n===L("other"))continue;var x=px(mode==="mounts"?p.c.x:p.x),y=py(mode==="mounts"?p.c.y:p.y);
      ctx.beginPath();ctx.arc(x,y,8.5,0,6.3);ctx.fillStyle=ink;ctx.fill();ctx.lineWidth=1.5;ctx.strokeStyle=card;ctx.stroke();ctx.fillStyle=card;ctx.fillText(String(i+1),x,y+0.5);}
    ctx.restore();
  }
};
})();
