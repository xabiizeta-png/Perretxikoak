(function(){
"use strict";
/* ---------- Texts ---------- */
var TX={
 es:{title:"Mapa de setas",spLabel:"Seta",addPhoto:"Cambiar por una foto mía",low:"Baja",high:"Alta",cond:"Condiciones",
  condNote:"Si hay datos del tiempo actualizados, salen ya puestos al abrir el mapa; si no, ajusta los controles a mano. Puedes moverlos para probar otros escenarios.",wxUpd:"Tiempo actualizado",
  month:"Mes",rain:"Lluvia de los últimos 26 días",temp:"Temperatura media a 800 m",days:"Días desde la última lluvia fuerte",
  frost:"Ha helado estos días",myPts:"Mis puntos",ptsNote:"Se guardan solo en este dispositivo.",noPts:"Aún no has guardado ningún punto. Toca el mapa y pulsa Guardar punto.",
  warnT:"Esto es una estimación, no una garantía.",
  warnB:"El mapa es esquemático y orienta sobre zonas favorables. No comas ninguna seta sin que la identifique un experto, y consulta la normativa y los permisos de cada zona antes de recolectar.",
  best:"Mejores zonas ahora",none:"Con estas condiciones no hay zonas favorables para esta seta.",
  tap:"Toca el mapa para ver el detalle de una zona.",save:"Guardar punto",del:"Borrar",saved:"Punto guardado",
  hab:"Hábitat",alt:"Altitud",sea:"Temporada",rainF:"Lluvia",tempF:"Temperatura",lag:"Días tras la lluvia",
  where:"Dónde sale",look:"Parecidos peligrosos",prob:"Probabilidad",approx:"aprox.",
  lv:["Muy baja","Baja","Media","Alta"],
  moon:"Luna",
  ph:["Luna nueva","Cuarto creciente","Luna llena","Cuarto menguante"],
  months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
  presets:["Otoño lluvioso","Otoño seco","Primavera","Verano de tormentas"],
  habs:{pinoMont:"Pinar de montaña",pinoBajo:"Pinar",haya:"Hayedo",roble:"Robledal",encina:"Encinar",prados:"Prados",pastos:"Pastos y páramo",cultivo:"Cultivos y eriales",estepa:"Estepa y regadío"}},
 eu:{title:"Perretxiko mapa",spLabel:"Perretxikoa",addPhoto:"Aldatu nire argazki batekin",low:"Txikia",high:"Handia",cond:"Baldintzak",
  condNote:"Eguraldiaren datu eguneratuak badaude, mapa irekitzean jarrita agertzen dira; bestela, doitu kontrolak eskuz. Mugi ditzakezu beste egoera batzuk probatzeko.",wxUpd:"Eguraldia eguneratuta",
  month:"Hilabetea",rain:"Azken 26 egunetako euria",temp:"Batez besteko tenperatura 800 m-tan",days:"Egunak azken euri handitik",
  frost:"Izoztea egin du egunotan",myPts:"Nire puntuak",ptsNote:"Gailu honetan bakarrik gordetzen dira.",noPts:"Oraindik ez duzu punturik gorde. Ukitu mapa eta sakatu Gorde puntua.",
  warnT:"Hau estimazio bat da, ez berme bat.",
  warnB:"Mapa eskematikoa da eta eremu egokiei buruzko orientazioa ematen du. Ez jan perretxikorik aditu batek identifikatu gabe, eta bildu aurretik begiratu eremu bakoitzeko araudia eta baimenak.",
  best:"Eremu onenak orain",none:"Baldintza hauekin ez dago eremu egokirik perretxiko honentzat.",
  tap:"Ukitu mapa eremu baten xehetasunak ikusteko.",save:"Gorde puntua",del:"Ezabatu",saved:"Puntua gordeta",
  hab:"Habitata",alt:"Altitudea",sea:"Sasoia",rainF:"Euria",tempF:"Tenperatura",lag:"Egunak euriaren ondoren",
  where:"Non ateratzen den",look:"Antzeko arriskutsuak",prob:"Probabilitatea",approx:"gutxi gorabehera",
  lv:["Oso txikia","Txikia","Ertaina","Handia"],
  moon:"Ilargia",
  ph:["Ilberria","Ilgora","Ilbetea","Ilbehera"],
  months:["Urtarrila","Otsaila","Martxoa","Apirila","Maiatza","Ekaina","Uztaila","Abuztua","Iraila","Urria","Azaroa","Abendua"],
  presets:["Udazken euritsua","Udazken lehorra","Udaberria","Udako ekaitzak"],
  habs:{pinoMont:"Mendiko pinudia",pinoBajo:"Pinudia",haya:"Pagadia",roble:"Hariztia",encina:"Artadia",prados:"Belardiak",pastos:"Larreak eta paramoa",cultivo:"Laborantza-lurrak eta lugorriak",estepa:"Estepa eta ureztalurrak"}}
};
/* ---------- Species ---------- */
var LOOK_BOL={es:"Boletos de pie rojo que azulean (Rubroboletus satanas, tóxico) y Tylopilus felleus, muy amargo.",eu:"Hanka gorriko onddoak, urdintzen direnak (Rubroboletus satanas, toxikoa), eta Tylopilus felleus, oso mingotsa."};
var SP=[
 {id:"edulis",es:"Hongo blanco",eu:"Onddo zuria",sci:"Boletus edulis, B. pinophilus",
  hab:{pinoMont:1,haya:1,roble:.8,pinoBajo:.35,encina:.2,prados:.05},alt:[500,800,1700,2000],t:[5,10,16,20],rain:50,
  m:[0,0,0,0,.1,.3,.3,.4,.9,1,.8,.2],lag:[6,12,22,30],cold:.5,
  w:{es:"Pinares de montaña, hayedos y robledales en suelo ácido.",eu:"Mendiko pinudiak, pagadiak eta hariztiak, lur azidoan."},l:LOOK_BOL},
 {id:"aereus",es:"Hongo negro y de verano",eu:"Onddo beltza eta udakoa",sci:"Boletus aereus, B. aestivalis",
  hab:{roble:1,encina:.9,haya:.6,pinoMont:.2},alt:[200,400,1100,1400],t:[10,15,23,27],rain:40,
  m:[0,0,0,0,.3,.9,.8,.7,1,.7,.2,0],lag:[5,10,20,28],cold:.3,
  w:{es:"Robledales, encinares y castañares soleados; sale con calor tras las tormentas.",eu:"Harizti, artadi eta gaztainadi eguzkitsuak; beroarekin ateratzen da, ekaitzen ondoren."},l:LOOK_BOL},
 {id:"niscalo",es:"Níscalo",eu:"Esne-gorria",sci:"Lactarius deliciosus",
  hab:{pinoMont:1,pinoBajo:1},alt:[0,300,1500,1900],t:[3,7,15,19],rain:40,
  m:[.1,0,0,0,0,0,0,.1,.5,1,1,.6],lag:[6,12,25,35],cold:.7,
  w:{es:"Siempre bajo pinos, en claros y bordes de pinar.",eu:"Beti pinuen azpian, pinudien soilgune eta ertzetan."},
  l:{es:"Lactarius torminosus (falso níscalo, tóxico): sombrero lanoso y látex blanco.",eu:"Lactarius torminosus (toxikoa): kapela iletsua eta esne zuria."}},
 {id:"perretxiko",es:"Perretxiko",eu:"Perretxikoa",sci:"Calocybe gambosa",
  hab:{prados:1,pastos:.7,roble:.3,haya:.2,cultivo:.15},alt:[100,500,1400,1700],t:[4,8,15,19],rain:35,
  m:[0,.1,.6,1,1,.5,0,0,0,0,0,0],lag:[3,8,20,30],cold:.5,
  w:{es:"Prados y pastos de montaña, junto a espinos y setos; repite cada año en los mismos corros.",eu:"Mendiko belardi eta larreak, elorri eta heskaien ondoan; urtero leku berean ateratzen da."},
  l:{es:"Entoloma sinuatum e Inosperma erubescens, ambas tóxicas graves.",eu:"Entoloma sinuatum eta Inosperma erubescens, biak oso toxikoak."}},
 {id:"cardo",es:"Seta de cardo",eu:"Gardu-ziza",sci:"Pleurotus eryngii",
  hab:{pastos:1,cultivo:.5,estepa:.5,prados:.3,encina:.3},alt:[200,500,1200,1400],t:[5,9,17,21],rain:30,
  m:[0,0,.1,.4,.5,.2,0,0,.6,1,1,.3],lag:[5,10,20,28],cold:.5,
  w:{es:"Pastos, eriales y páramos con cardo corredor.",eu:"Larreak, lugorriak eta paramoak, gardu-lekuetan."},
  l:{es:"Clitocybes blancos de prado (Clitocybe rivulosa), tóxicos.",eu:"Belardietako Clitocybe zuriak (Clitocybe rivulosa), toxikoak."}},
 {id:"rebozuelo",es:"Rebozuelo",eu:"Zizahoria",sci:"Cantharellus cibarius",
  hab:{roble:1,haya:.9,encina:.7,pinoMont:.7,pinoBajo:.4},alt:[200,500,1500,1800],t:[8,12,20,24],rain:45,
  m:[0,0,0,0,.2,.8,.8,.7,1,.9,.5,.1],lag:[6,12,25,32],cold:.4,
  w:{es:"Robledales, hayedos y encinares con musgo; también pinares.",eu:"Harizti, pagadi eta artadi goroldiotsuak; pinudietan ere bai."},
  l:{es:"Seta de olivo (Omphalotus olearius), tóxica: tiene láminas verdaderas y crece sobre madera.",eu:"Omphalotus olearius, toxikoa: benetako orriak ditu eta egurraren gainean hazten da."}},
 {id:"trompeta",es:"Trompeta de los muertos",eu:"Tronpeta beltza",sci:"Craterellus cornucopioides",
  hab:{haya:1,roble:.8,encina:.2},alt:[300,500,1400,1700],t:[3,7,14,18],rain:60,
  m:[.1,0,0,0,0,0,0,.1,.4,1,1,.6],lag:[8,14,28,36],cold:.6,
  w:{es:"Hayedos y robledales húmedos, entre la hojarasca.",eu:"Pagadi eta harizti hezeak, orbelaren artean."},
  l:{es:"Pocas confusiones peligrosas; se parece a Craterellus cinereus, comestible.",eu:"Nahasketa arriskutsu gutxi; Craterellus cinereus jangarriaren antza du."}},
 {id:"angula",es:"Angula de monte",eu:"Tronpeta horia",sci:"Craterellus lutescens",
  hab:{pinoMont:1,pinoBajo:.8,haya:.3},alt:[0,400,1600,1900],t:[1,4,12,16],rain:60,
  m:[.7,.3,0,0,0,0,0,0,.2,.7,1,1],lag:[8,14,30,40],cold:.9,
  w:{es:"Pinares húmedos con musgo, en grupos numerosos; aguanta bien el frío.",eu:"Pinudi heze eta goroldiotsuak, talde handitan; hotza ondo jasaten du."},
  l:{es:"Pocas confusiones peligrosas; descarta las setas pardas pequeñas con láminas verdaderas.",eu:"Nahasketa arriskutsu gutxi; baztertu benetako orriak dituzten perretxiko arre txikiak."}},
 {id:"senderuela",es:"Senderuela",eu:"Marasmio jangarria",sci:"Marasmius oreades",
  hab:{prados:1,pastos:1,cultivo:.2},alt:[0,300,1600,1900],t:[6,10,18,22],rain:30,
  m:[0,0,.2,.7,1,.8,.3,.2,.7,1,.6,.1],lag:[2,5,14,20],cold:.5,
  w:{es:"Prados y pastos, en corros de brujas.",eu:"Belardi eta larreak, sorgin-zirkuluetan."},
  l:{es:"Clitocybe rivulosa (tóxica, en los mismos prados) y lepiotas e inocibes pequeños.",eu:"Clitocybe rivulosa (toxikoa, belardi berberetan) eta lepiota eta inozibe txikiak."}},
 {id:"galamperna",es:"Galamperna",eu:"Galanperna",sci:"Macrolepiota procera",
  hab:{prados:.8,roble:.8,pastos:.6,pinoBajo:.6,pinoMont:.5,haya:.5,encina:.5},alt:[0,200,1300,1600],t:[7,11,18,22],rain:40,
  m:[0,0,0,0,0,.1,.2,.4,1,1,.6,.1],lag:[5,10,20,28],cold:.4,
  w:{es:"Claros de bosque, bordes y prados.",eu:"Basoko soilguneak, ertzak eta belardiak."},
  l:{es:"Lepiotas pequeñas, mortales: no recojas ejemplares de menos de 10 cm de sombrero.",eu:"Lepiota txikiak, hilgarriak: ez bildu 10 cm baino kapela txikiagoa dutenak."}},
 {id:"gibelurdin",es:"Gibelurdina",eu:"Gibelurdina",sci:"Russula virescens",
  hab:{haya:1,roble:.9,encina:.4,pinoMont:.15},alt:[100,300,1300,1600],t:[10,14,21,25],rain:40,
  m:[0,0,0,0,.2,.8,1,.9,.9,.6,.2,0],lag:[4,8,18,26],cold:.3,
  w:{es:"Hayedos y robledales, también castañares; sale con el calor del verano tras las tormentas.",eu:"Pagadi eta hariztiak, baita gaztainadiak ere; udako beroarekin ateratzen da, ekaitzen ondoren."},
  l:{es:"Amanita phalloides (mortal), también de sombrero verdoso: tiene anillo y volva. La gibelurdina no tiene ninguno de los dos, su sombrero se cuartea en placas y su carne se rompe como tiza.",eu:"Amanita phalloides (hilgarria), hura ere kapela berdexkakoa: eraztuna eta bolba ditu. Gibelurdinak ez du bat ere; kapela plaketan pitzatzen zaio eta haragia klariona bezala hausten."}}
];
/* ---------- Geography (schematic) ---------- */
var B={x0:-4.45,x1:-0.6,y0:41.0,y1:43.5},STEP=0.04,KX=0.74;
/* Orden de las provincias: Bizkaia, Gipuzkoa, Álava, Navarra, La Rioja, Soria, Burgos */
var POLY=[
 [[-3.15,43.36],[-2.95,43.44],[-2.75,43.45],[-2.5,43.38],[-2.41,43.32],[-2.5,43.2],[-2.55,43.08],[-2.72,43.03],[-2.9,43.03],[-3.0,43.1],[-3.15,43.17],[-3.3,43.14],[-3.45,43.2],[-3.4,43.3],[-3.22,43.3]],
 [[-2.41,43.32],[-2.2,43.31],[-1.98,43.33],[-1.79,43.39],[-1.73,43.3],[-1.9,43.2],[-1.92,43.1],[-2.02,43.03],[-2.05,42.95],[-2.25,42.93],[-2.37,42.95],[-2.5,42.98],[-2.55,43.08],[-2.5,43.2]],
 [[-2.55,43.08],[-2.5,42.98],[-2.37,42.95],[-2.25,42.93],[-2.24,42.84],[-2.28,42.75],[-2.3,42.65],[-2.42,42.6],[-2.42,42.49],[-2.6,42.48],[-2.82,42.55],[-2.86,42.63],[-3.0,42.64],[-3.05,42.76],[-3.28,42.83],[-3.25,42.92],[-3.1,42.9],[-3.05,42.98],[-3.15,43.17],[-3.0,43.1],[-2.9,43.03],[-2.72,43.03]],
 [[-1.73,43.3],[-1.62,43.3],[-1.48,43.29],[-1.38,43.25],[-1.35,43.1],[-1.28,43.07],[-1.15,43.02],[-1.0,43.0],[-0.85,42.95],[-0.72,42.89],[-0.78,42.78],[-0.9,42.72],[-1.03,42.68],[-1.15,42.6],[-1.17,42.48],[-1.33,42.4],[-1.38,42.25],[-1.33,42.08],[-1.4,41.91],[-1.6,41.95],[-1.78,42.0],[-1.87,42.05],[-1.8,42.13],[-1.69,42.18],[-1.95,42.34],[-2.08,42.42],[-2.3,42.46],[-2.42,42.49],[-2.42,42.6],[-2.3,42.65],[-2.28,42.75],[-2.24,42.84],[-2.25,42.93],[-2.05,42.95],[-2.02,43.03],[-1.92,43.1],[-1.9,43.2]],
 [[-2.42,42.49],[-2.3,42.46],[-2.08,42.42],[-1.95,42.34],[-1.69,42.18],[-1.8,42.13],[-1.87,42.05],[-1.9,41.95],[-2.05,41.93],[-2.15,42.08],[-2.35,42.1],[-2.5,42.1],[-2.58,42.0],[-2.75,42.0],[-2.9,42.02],[-3.0,42.08],[-3.1,42.2],[-3.13,42.35],[-3.05,42.45],[-3.1,42.55],[-3.0,42.64],[-2.86,42.63],[-2.82,42.55],[-2.6,42.48]],
 [[-2.9,42.02],[-2.75,42.0],[-2.58,42.0],[-2.5,42.1],[-2.35,42.1],[-2.15,42.08],[-2.05,41.93],[-1.9,41.95],[-1.8,41.9],[-1.78,41.78],[-1.95,41.6],[-1.98,41.45],[-2.05,41.35],[-2.1,41.12],[-2.35,41.06],[-2.6,41.1],[-2.9,41.25],[-3.25,41.3],[-3.5,41.45],[-3.55,41.6],[-3.4,41.7],[-3.25,41.75],[-3.12,41.83],[-3.1,41.92],[-2.98,41.95]],
 [[-3.7,43.15],[-3.58,43.17],[-3.45,43.13],[-3.3,43.14],[-3.15,43.17],[-3.05,42.98],[-3.1,42.9],[-3.25,42.92],[-3.28,42.83],[-3.05,42.76],[-3.0,42.64],[-3.1,42.55],[-3.05,42.45],[-3.13,42.35],[-3.1,42.2],[-3.0,42.08],[-2.9,42.02],[-2.98,41.95],[-3.1,41.92],[-3.12,41.83],[-3.25,41.75],[-3.4,41.7],[-3.55,41.6],[-3.52,41.47],[-3.75,41.45],[-3.98,41.58],[-4.1,41.77],[-4.03,41.95],[-4.2,42.1],[-4.33,42.3],[-4.3,42.4],[-4.25,42.6],[-4.05,42.78],[-4.0,42.85],[-4.05,42.98],[-3.85,43.05]]
];
var ZONES=[
 ["Moncayo",-1.87,41.8,.09,.07,"roble"],["Irati",-1.12,42.98,.22,.09,"haya"],["Roncal / Erronkari",-0.9,42.83,.12,.11,"pinoMont"],
 ["Quinto Real / Kintoa",-1.48,43.03,.14,.08,"haya"],["Baztan",-1.5,43.17,.14,.08,"roble"],["Aralar",-2.0,42.97,.13,.055,"haya"],
 ["Urbasa-Andía",-2.08,42.84,.24,.06,"haya"],["Aizkorri",-2.33,42.94,.13,.05,"haya"],["Gorbeia",-2.78,43.03,.15,.07,"haya"],
 ["Izki",-2.48,42.7,.16,.06,"roble"],["Sierra de Cantabria / Toloño",-2.6,42.61,.3,.035,"haya"],["Valderejo-Obarenes",-3.22,42.76,.2,.08,"roble"],
 ["Merindades",-3.55,43.0,.35,.12,"roble"],["Páramos de Masa y La Lora",-3.82,42.7,.3,.14,"pastos"],["Hayedos de la Demanda",-3.05,42.28,.28,.07,"haya"],
 ["Juarros-Pradoluengo",-3.38,42.25,.14,.08,"roble"],["Pinares de Urbión",-2.97,41.93,.38,.13,"pinoMont"],["Neila",-3.05,42.07,.15,.05,"pinoMont"],
 ["Cebollera",-2.62,42.04,.17,.07,"pinoMont"],["Cameros",-2.55,42.2,.28,.08,"roble"],["Valonsadero-Tierras Altas",-2.42,41.9,.2,.08,"roble"],
 ["Pinares de Almazán",-2.72,41.55,.3,.11,"pinoBajo"],["Arlanza",-3.45,42.0,.25,.08,"encina"],["Sur de Soria",-2.6,41.3,.6,.14,"encina"],
 ["Sierra de Leyre",-1.18,42.64,.15,.06,"pinoBajo"],["Navarra Media",-1.78,42.66,.42,.09,"encina"],["Bardenas-Ribera",-1.5,42.2,.33,.17,"estepa"],
 ["Pinares de Bizkaia y Gipuzkoa",-2.5,43.2,.8,.12,"pinoBajo"]
];
var CITIES=[["Bilbao",-2.93,43.26],["Donostia",-1.98,43.32],["Vitoria-Gasteiz",-2.67,42.85],["Pamplona / Iruña",-1.64,42.82],["Logroño",-2.45,42.47],["Burgos",-3.7,42.34],["Soria",-2.47,41.76]];

function inPoly(x,y,p){var c=false;for(var i=0,j=p.length-1;i<p.length;j=i++){var a=p[i],b=p[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])c=!c;}return c;}
/* Altitud real de la celda (elev.js); 700 m si faltara el archivo. */
function elevAt(x,y){var E=window.SETAS_ELEV;if(E){var ex=Math.round((x-E.x0)/E.step),ey=Math.round((y-E.y0)/E.step);if(ex>=0&&ey>=0&&ex<E.nx&&ey<E.ny)return Math.max(0,E.d[ey*E.nx+ex]);}return 700;}
function zoneAt(x,y){for(var i=0;i<ZONES.length;i++){var z=ZONES[i],a=(x-z[1])/z[3],b=(y-z[2])/z[4];if(a*a+b*b<=1)return i;}return -1;}
var CELLS=[];
(function(){for(var y=B.y0+STEP/2;y<B.y1;y+=STEP)for(var x=B.x0+STEP/2;x<B.x1;x+=STEP){var ok=false;for(var k=0;k<POLY.length;k++)if(inPoly(x,y,POLY[k])){ok=true;break;}if(!ok)continue;var el=elevAt(x,y),z=zoneAt(x,y),h;if(z>=0)h=ZONES[z][5];else h=y>42.95?"prados":(el>1050?"pastos":"cultivo");CELLS.push({x:x,y:y,el:el,z:z,h:h,pv:k,s:0,f:null});}})();

/* ---------- Model ---------- */
function clamp(v,a,b){return v<a?a:(v>b?b:v);}
function trap(v,q){if(v<=q[0]||v>=q[3])return 0;if(v<q[1])return (v-q[0])/(q[1]-q[0]);if(v>q[2])return (q[3]-v)/(q[3]-q[2]);return 1;}
var S={sp:0,lang:"es",month:new Date().getMonth(),rain:50,temp:8,days:12,frost:false,sel:null,pts:[],photos:{}};
function factors(c,sp){
  var atl=clamp((c.y-42.75)/0.5,0,1),dry=(c.el<500&&c.y<42.65)?0.6:1;
  var wx=c.wx||S;
  var rl=wx.rain*(1+0.35*atl)*(1+0.25*clamp((c.el-800)/1000,-0.3,1))*dry;
  var tl=wx.temp-6*(c.el-800)/1000;
  return {hab:sp.hab[c.h]||0,alt:trap(c.el,sp.alt),sea:sp.m[S.month],rain:clamp(rl/sp.rain,0,1),temp:trap(tl,sp.t),lag:trap(wx.days,[sp.lag[0]-1,sp.lag[1],sp.lag[2],sp.lag[3]]),rl:rl,tl:tl,dy:wx.days,fr:!!wx.frost};
}
function score(f,sp){var w=Math.pow(f.rain*f.temp*f.lag,0.7);return 100*f.hab*f.alt*f.sea*w*(f.fr?sp.cold:1);}
function compute(){var sp=SP[S.sp];for(var i=0;i<CELLS.length;i++){var c=CELLS[i];c.f=factors(c,sp);c.s=score(c.f,sp);}}
function level(s){return s<15?0:(s<40?1:(s<65?2:3));}
var STOPS=[[.15,[230,213,138]],[.4,[240,178,62]],[.65,[224,106,44]],[1,[155,28,70]]];
function ramp(s){var v=s/100;if(v<=STOPS[0][0])return STOPS[0][1];for(var i=1;i<STOPS.length;i++){if(v<=STOPS[i][0]){var a=STOPS[i-1],b=STOPS[i],t=(v-a[0])/(b[0]-a[0]);return [0,1,2].map(function(k){return Math.round(a[1][k]+(b[1][k]-a[1][k])*t);});}}return STOPS[3][1];}
function rgb(a){return "rgb("+a[0]+","+a[1]+","+a[2]+")";}

/* ---------- Rendering ---------- */
var $=function(id){return document.getElementById(id);};
var cv=$("map"),ctx=cv.getContext("2d"),W=0,H=0,HC=0;
/* Vista del mapa: k = aumento (1 a KMAX); ox, oy = esquina superior izquierda en coordenadas del mapa sin ampliar. */
var V={k:1,ox:0,oy:0,big:false},KMAX=48,IM={};
/* Teselas de OpenStreetMap en directo para el zoom profundo. Si no se pueden cargar (por ejemplo, dentro de Claude), se usa la imagen guardada. */
var TL={},TLN=0,TFAIL=0,RAF=0;
function later(){if(RAF)return;RAF=(window.requestAnimationFrame||setTimeout)(function(){RAF=0;draw();},16);}
function tile(z,x,y){var k=z+"/"+x+"/"+y,t=TL[k];if(!t){if(TLN>220){TL={};TLN=0;}t=TL[k]=new Image();TLN++;t.onload=function(){t.ok=true;later();};t.onerror=function(){t.bad=true;TFAIL++;};t.src="https://tile.openstreetmap.org/"+k+".png";}return t;}
function lon2x(lon,z){return (lon+180)/360*Math.pow(2,z);}
function lat2y(lat,z){var r=lat*Math.PI/180;return (1-Math.log(Math.tan(r)+1/Math.cos(r))/Math.PI)/2*Math.pow(2,z);}
function y2lat(y,z){var n=Math.PI-2*Math.PI*y/Math.pow(2,z);return 180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n)));}
function drawTiles(){
  if(V.k<2.6||TFAIL>8)return false;
  var span=B.x1-B.x0,z=Math.max(9,Math.min(16,Math.ceil(Math.log(360*W*V.k/(span*256))/Math.LN2-0.35)));
  var lonW=B.x0+V.ox/W*span,lonE=lonW+(W/V.k)/W*span,latN=B.y1-V.oy/H*(B.y1-B.y0),latS=latN-(HC/V.k)/H*(B.y1-B.y0);
  var x0=Math.floor(lon2x(lonW,z)),x1=Math.floor(lon2x(lonE,z)),y0=Math.floor(lat2y(latN,z)),y1=Math.floor(lat2y(latS,z)),any=false,n=Math.pow(2,z);
  if((x1-x0+1)*(y1-y0+1)>60)return false;
  for(var tx=x0;tx<=x1;tx++)for(var ty=y0;ty<=y1;ty++){
    var t=tile(z,tx,ty);if(!t.ok)continue;any=true;
    var ax=px(tx/n*360-180),bx=px((tx+1)/n*360-180),ay=py(y2lat(ty,z)),by=py(y2lat(ty+1,z));
    ctx.drawImage(t,ax,ay,bx-ax+0.5,by-ay+0.5);
  }
  return any;
}
function loadImg(n,src){if(IM[n])return;var im=new Image();IM[n]=im;im.onload=function(){im.ok=true;draw();};im.src=src;}
function bgImg(){
  if(V.k>=3){loadImg("hi","img/base-hi.jpg");if(IM.hi.ok)return IM.hi;}
  if(V.k>=1.35){loadImg("base","img/base.jpg");if(IM.base.ok)return IM.base;}
  return (IM.relief&&IM.relief.ok)?IM.relief:((IM.base&&IM.base.ok)?IM.base:null);
}
function clampV(){
  V.k=Math.max(1,Math.min(KMAX,V.k));
  V.ox=Math.max(0,Math.min(W-W/V.k,V.ox));
  if(H*V.k<=HC)V.oy=-(HC/V.k-H)/2;else V.oy=Math.max(0,Math.min(H-HC/V.k,V.oy));
  cv.style.touchAction=(V.k>1.01||V.big)?"none":"pan-y";
}
function zoomAt(f,sx,sy){var k0=V.k,k1=Math.max(1,Math.min(KMAX,k0*f));if(k1===k0)return;var ux=sx/k0+V.ox,uy=sy/k0+V.oy;V.k=k1;V.ox=ux-sx/k1;V.oy=uy-sy/k1;clampV();draw();}
function centerOn(x,y,kmin){if(kmin&&V.k<kmin)V.k=kmin;var u=(x-B.x0)/(B.x1-B.x0)*W,v=(B.y1-y)/(B.y1-B.y0)*H;V.ox=u-W/(2*V.k);V.oy=v-HC/(2*V.k);clampV();draw();}
function tok(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim();}
function px(x){return ((x-B.x0)/(B.x1-B.x0)*W-V.ox)*V.k;}
function py(y){return ((B.y1-y)/(B.y1-B.y0)*H-V.oy)*V.k;}
function draw(){
  var cw=cv.clientWidth||320,dpr=window.devicePixelRatio||1;W=cw;H=Math.round(cw*(B.y1-B.y0)/((B.x1-B.x0)*KX));
  HC=V.big?Math.max(H,Math.round(Math.min((window.innerHeight||700)*0.74,W*1.6))):H;
  clampV();
  var pw=Math.round(W*dpr),ph=Math.round(HC*dpr);
  if(cv.width!==pw||cv.height!==ph){cv.style.height=HC+"px";cv.width=pw;cv.height=ph;}
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,W,HC);
  var land=tok("--land"),ink=tok("--ink"),card=tok("--card"),cwid=STEP/(B.x1-B.x0)*W*V.k+0.6,chei=STEP/(B.y1-B.y0)*H*V.k+0.6;
  var RL=bgImg(),rok=!!RL,i,c,cx,cy;
  function vis(){cx=px(c.x-STEP/2);cy=py(c.y+STEP/2);return cx<W&&cy<HC&&cx+cwid>0&&cy+chei>0;}
  for(i=0;i<CELLS.length;i++){c=CELLS[i];if(!vis())continue;ctx.fillStyle=(c.s<5||rok)?land:rgb(ramp(c.s));ctx.fillRect(cx,cy,cwid,chei);}
  if(rok){ctx.drawImage(RL,-V.ox*V.k,-V.oy*V.k,W*V.k,H*V.k);
    if(drawTiles()&&IM.relief&&IM.relief.ok){ctx.globalAlpha=Math.max(.22,Math.min(.75,2.2/V.k));ctx.drawImage(IM.relief,-V.ox*V.k,-V.oy*V.k,W*V.k,H*V.k);}
    ctx.globalAlpha=V.k>=1.35?.5:.7;for(i=0;i<CELLS.length;i++){c=CELLS[i];if(c.s<5||!vis())continue;ctx.fillStyle=rgb(ramp(c.s));ctx.fillRect(cx,cy,cwid,chei);}ctx.globalAlpha=1;}
  ctx.strokeStyle=ink;ctx.globalAlpha=.45;ctx.lineWidth=1;
  POLY.forEach(function(p){ctx.beginPath();p.forEach(function(q,k){k?ctx.lineTo(px(q[0]),py(q[1])):ctx.moveTo(px(q[0]),py(q[1]));});ctx.closePath();ctx.stroke();});
  ctx.globalAlpha=1;ctx.font="600 11px "+tok("--body");ctx.textBaseline="middle";
  CITIES.forEach(function(c){var x=px(c[1]),y=py(c[2]);ctx.fillStyle=card;ctx.beginPath();ctx.arc(x,y,3.5,0,6.3);ctx.fill();ctx.strokeStyle=ink;ctx.lineWidth=1.5;ctx.stroke();
    ctx.lineWidth=3;ctx.strokeStyle=card;ctx.strokeText(c[0],x+6,y-8);ctx.fillStyle=ink;ctx.fillText(c[0],x+6,y-8);});
  S.pts.forEach(function(p){var x=px(p.x),y=py(p.y);ctx.fillStyle=tok("--accent");ctx.strokeStyle=card;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-6,y-11);ctx.arc(x,y-13,6.5,Math.PI*0.9,Math.PI*0.1);ctx.closePath();ctx.fill();ctx.stroke();});
  if(window.setasExtra)window.setasExtra.draw(ctx,px,py);
  if(S.sel){ctx.strokeStyle=ink;ctx.lineWidth=2;ctx.strokeRect(px(S.sel.x-STEP/2)-1,py(S.sel.y+STEP/2)-1,cwid+2,chei+2);}
}
function t(k){return TX[S.lang][k];}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function pill(s){return '<span class="pill" style="background:'+(s<15?"#7d8a84":rgb(ramp(Math.max(s,45))))+'">'+t("lv")[level(s)]+" · "+Math.round(s)+"</span>";}
function renderSummary(){
  var sp=SP[S.sp],agg={};
  CELLS.forEach(function(c){if(c.z<0)return;var a=agg[c.z]||(agg[c.z]={n:0,s:0});a.n++;a.s+=c.s;});
  var list=Object.keys(agg).map(function(k){return {z:+k,s:agg[k].s/agg[k].n};}).filter(function(a){return a.s>=15;}).sort(function(a,b){return b.s-a.s;}).slice(0,3);
  var own=S.photos[sp.id],img=own||("img/"+sp.id+".jpg");
  var h='<div class="sphead"><button type="button" class="photo has" id="ph-btn" aria-label="'+t("addPhoto")+'"><img src="'+img+'" alt="'+esc(sp[S.lang])+'"></button><div><h2>'+esc(sp[S.lang])+'</h2><div class="sci">'+esc(sp.sci)+'</div></div></div><p>'+esc(sp.w[S.lang])+'</p><p class="muted"><b>'+t("look")+":</b> "+esc(sp.l[S.lang])+'</p>';
  h+='<p style="margin-top:12px"><b>'+t("best")+'</b></p>';
  if(!list.length)h+='<p class="muted">'+t("none")+'</p>';
  else h+='<ul class="best">'+list.map(function(a){return '<li><span>'+esc(ZONES[a.z][0])+'</span>'+pill(a.s)+'</li>';}).join("")+'</ul>';
  $("summary").innerHTML=h;$("ph-btn").onclick=function(){$("f-photo").click();};
}
function bar(label,v,txt){return '<span>'+label+'</span><div class="track"><div class="fill" style="width:'+Math.round(v*100)+'%"></div></div><span>'+txt+'</span>';}
function renderDetail(){
  var c=S.sel,el=$("detail");
  if(!c){el.innerHTML='<p class="muted">'+t("tap")+'</p>';return;}
  var f=c.f,name=c.z>=0?ZONES[c.z][0]:t("habs")[c.h];
  el.innerHTML='<div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><h2 style="margin:0">'+esc(name)+'</h2>'+pill(c.s)+'</div>'+
   '<div class="muted">'+c.y.toFixed(2)+"° N, "+Math.abs(c.x).toFixed(2)+"° W · "+Math.round(c.el/50)*50+" m "+t("approx")+'</div>'+
   '<div class="factors">'+bar(t("hab"),f.hab,esc(t("habs")[c.h]))+bar(t("alt"),f.alt,Math.round(f.alt*100)+"%")+bar(t("sea"),f.sea,Math.round(f.sea*100)+"%")+
   bar(t("rainF"),f.rain,Math.round(f.rl)+" mm")+bar(t("tempF"),f.temp,Math.round(f.tl)+" °C")+bar(t("lag"),f.lag,f.dy+" d")+'</div>'+
   '<button type="button" class="btn primary" id="save">'+t("save")+'</button>';
  $("save").onclick=function(){S.pts.push({x:c.x,y:c.y,sp:SP[S.sp].id,d:new Date().toISOString().slice(0,10),n:name});store();renderPts();draw();this.textContent=t("saved");this.disabled=true;};
}
function renderPts(){
  var el=$("pts");
  if(!S.pts.length){el.innerHTML='<li class="muted">'+t("noPts")+'</li>';return;}
  el.innerHTML=S.pts.map(function(p,i){var sp=SP.filter(function(s){return s.id===p.sp;})[0]||SP[0];
    return '<li><span><b>'+esc(sp[S.lang])+'</b><br><span class="muted">'+esc(p.n)+" · "+p.y.toFixed(2)+"° N, "+Math.abs(p.x).toFixed(2)+"° W · "+esc(p.d)+'</span></span><button type="button" class="btn" data-del="'+i+'">'+t("del")+'</button></li>';}).join("");
}
$("pts").addEventListener("click",function(e){var b=e.target.closest("[data-del]");if(!b)return;S.pts.splice(+b.getAttribute("data-del"),1);store();renderPts();draw();});
function moonText(){
  var now=Date.now(),syn=29.530588853,age=(((now-Date.UTC(2000,0,6,18,14))/864e5)%syn+syn)%syn;
  var ill=Math.round((1-Math.cos(2*Math.PI*age/syn))/2*100),ph=Math.floor(((age/syn)*4+0.5))%4;
  return "<b>"+t("moon")+":</b> "+t("ph")[ph]+", "+ill+"%.";
}
function renderStatic(){
  document.documentElement.lang=S.lang;document.title=t("title");
  document.querySelectorAll("[data-i]").forEach(function(e){e.textContent=t(e.getAttribute("data-i"));});
  $("lang-es").setAttribute("aria-pressed",S.lang==="es");$("lang-eu").setAttribute("aria-pressed",S.lang==="eu");
  $("f-sp").innerHTML=SP.map(function(s,i){return '<option value="'+i+'"'+(i===S.sp?" selected":"")+'>'+esc(s[S.lang])+'</option>';}).join("");
  $("f-month").innerHTML=t("months").map(function(m,i){return '<option value="'+i+'"'+(i===S.month?" selected":"")+'>'+m+'</option>';}).join("");
  $("presets").innerHTML=t("presets").map(function(p,i){return '<button type="button" data-pre="'+i+'">'+p+'</button>';}).join("");
  $("moon").innerHTML=(WX&&WX.updated?"<b>"+t("wxUpd")+":</b> "+esc(String(WX.updated).split("-").reverse().join("/"))+(WX.source?" ("+esc(WX.source)+")":"")+"<br>":"")+moonText();cv.setAttribute("aria-label",t("title"));
}
function syncInputs(){
  $("f-month").value=S.month;$("f-rain").value=S.rain;$("f-temp").value=S.temp;$("f-days").value=S.days;$("f-frost").checked=S.frost;
  $("v-rain").textContent=S.rain+" mm";$("v-temp").textContent=S.temp+" °C";$("v-days").textContent=S.days;
}
function refresh(){compute();if(window.setasExtra)window.setasExtra.refresh();syncInputs();renderSummary();renderDetail();draw();}
function all(){renderStatic();renderPts();refresh();}

/* ---------- Storage ---------- */
function store(){try{localStorage.setItem("setas-pts",JSON.stringify(S.pts));localStorage.setItem("setas-lang",S.lang);localStorage.setItem("setas-photos",JSON.stringify(S.photos));}catch(e){}}
try{var sp0=JSON.parse(localStorage.getItem("setas-pts")||"[]");if(Array.isArray(sp0))S.pts=sp0;var p0=JSON.parse(localStorage.getItem("setas-photos")||"{}");if(p0&&typeof p0==="object")S.photos=p0;var l0=localStorage.getItem("setas-lang");if(l0==="es"||l0==="eu")S.lang=l0;}catch(e){}

/* ---------- Events ---------- */
S.temp=[3,4,7,9,13,17,20,20,16,11,6,4][S.month];
var WX=window.SETAS_WEATHER||null;
if(WX){if(typeof WX.rain==="number")S.rain=Math.min(150,Math.max(0,Math.round(WX.rain/5)*5));if(typeof WX.temp==="number")S.temp=Math.min(26,Math.max(0,Math.round(WX.temp)));if(typeof WX.days==="number")S.days=Math.min(45,Math.max(0,Math.round(WX.days)));S.frost=!!WX.frost;}
var PRE=[[9,70,11,14,false],[9,10,14,30,false],[4,50,11,10,false],[6,45,19,10,false]];
$("presets").addEventListener("click",function(e){var b=e.target.closest("[data-pre]");if(!b)return;var p=PRE[+b.getAttribute("data-pre")];S.month=p[0];S.rain=p[1];S.temp=p[2];S.days=p[3];S.frost=p[4];refresh();});
$("f-sp").onchange=function(){S.sp=+this.value;refresh();};
$("f-photo").onchange=function(){var f=this.files&&this.files[0];if(!f)return;var u=URL.createObjectURL(f),im=new Image();
  im.onload=function(){var k=Math.min(1,320/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext("2d").drawImage(im,0,0,c.width,c.height);S.photos[SP[S.sp].id]=c.toDataURL("image/jpeg",.8);URL.revokeObjectURL(u);store();renderSummary();};
  im.src=u;this.value="";};
$("lang-es").onclick=function(){S.lang="es";store();all();};
$("lang-eu").onclick=function(){S.lang="eu";store();all();};
$("f-month").onchange=function(){S.month=+this.value;refresh();};
$("f-rain").oninput=function(){S.rain=+this.value;refresh();};
$("f-temp").oninput=function(){S.temp=+this.value;refresh();};
$("f-days").oninput=function(){S.days=+this.value;refresh();};
$("f-frost").onchange=function(){S.frost=this.checked;refresh();};
/* Gestos: pellizco con dos dedos para ampliar, un dedo para mover (cuando está ampliado), rueda y arrastre con ratón. */
var G=null,moved=false;
function tdist(t){var dx=t[0].clientX-t[1].clientX,dy=t[0].clientY-t[1].clientY;return Math.sqrt(dx*dx+dy*dy)||1;}
function gstart(t){
  if(t.length>=2)G={two:true,d:tdist(t),k:V.k};
  else if(t.length===1)G={x:t[0].clientX,y:t[0].clientY,ox:V.ox,oy:V.oy};
  else G=null;
}
cv.addEventListener("touchstart",function(e){moved=false;gstart(e.touches);if(e.touches.length>=2)e.preventDefault();},{passive:false});
cv.addEventListener("touchmove",function(e){
  var t=e.touches;if(!G)return;
  if(t.length>=2){
    if(!G.two)gstart(t);
    var r=cv.getBoundingClientRect(),mx=(t[0].clientX+t[1].clientX)/2-r.left,my=(t[0].clientY+t[1].clientY)/2-r.top;
    zoomAt(G.k*tdist(t)/G.d/V.k,mx,my);moved=true;e.preventDefault();
  }else if(t.length===1&&!G.two&&(V.k>1.01||V.big)){
    var dx=t[0].clientX-G.x,dy=t[0].clientY-G.y;if(Math.abs(dx)+Math.abs(dy)>6)moved=true;
    V.ox=G.ox-dx/V.k;V.oy=G.oy-dy/V.k;clampV();draw();e.preventDefault();
  }
},{passive:false});
cv.addEventListener("touchend",function(e){gstart(e.touches);});
cv.addEventListener("touchcancel",function(){G=null;});
cv.addEventListener("wheel",function(e){if(!e.ctrlKey&&V.k<=1.01&&!V.big)return;e.preventDefault();var r=cv.getBoundingClientRect();zoomAt(e.deltaY<0?1.25:0.8,e.clientX-r.left,e.clientY-r.top);},{passive:false});
var MD=null;
cv.addEventListener("mousedown",function(e){moved=false;MD={x:e.clientX,y:e.clientY,ox:V.ox,oy:V.oy};});
window.addEventListener("mousemove",function(e){if(!MD)return;var dx=e.clientX-MD.x,dy=e.clientY-MD.y;if(Math.abs(dx)+Math.abs(dy)>4)moved=true;if(V.k<=1.01&&!V.big)return;V.ox=MD.ox-dx/V.k;V.oy=MD.oy-dy/V.k;clampV();draw();});
window.addEventListener("mouseup",function(){MD=null;});
cv.addEventListener("dblclick",function(e){var r=cv.getBoundingClientRect();zoomAt(1.8,e.clientX-r.left,e.clientY-r.top);});
cv.addEventListener("click",function(e){
  if(moved){moved=false;return;}
  var r=cv.getBoundingClientRect(),x=B.x0+((e.clientX-r.left)/V.k+V.ox)/W*(B.x1-B.x0),y=B.y1-((e.clientY-r.top)/V.k+V.oy)/H*(B.y1-B.y0),best=null,bd=1e9;
  for(var i=0;i<CELLS.length;i++){var c=CELLS[i],d=Math.abs(c.x-x)+Math.abs(c.y-y);if(d<bd){bd=d;best=c;}}
  S.sel=bd<STEP*1.5?best:null;renderDetail();draw();
});
window.addEventListener("resize",draw);
if(window.matchMedia)try{window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",draw);}catch(e){}
new MutationObserver(draw).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(draw);
loadImg("relief","img/relief.png");
if(window.setasExtra)window.setasExtra.init({S:S,SP:SP,CELLS:CELLS,ZONES:ZONES,KX:KX,esc:esc,pill:pill,tok:tok,redraw:draw,select:function(c){S.sel=c;renderDetail();draw();},
  zoom:function(f){zoomAt(f,W/2,HC/2);},centerOn:centerOn,
  expand:function(){V.big=!V.big;var cxw=V.ox+W/(2*V.k),cyw=V.oy+HC/(2*V.k);draw();if(V.big&&H*V.k<HC)V.k=HC/H;V.ox=cxw-W/(2*V.k);V.oy=cyw-HC/(2*V.k);clampV();draw();return V.big;},
  view:function(){return {k:V.k,big:V.big};}});
all();
})();
