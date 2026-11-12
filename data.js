/* Mapa de setas — precios de la feria de Ordizia (miércoles).
   Este archivo lo reescribe la tarea programada semanal. Formato:
   serie = lista de [fecha ISO, precio mínimo €/kg, precio máximo €/kg, kilos en venta], de más antigua a más reciente, máximo 6 entradas.
   Claves de seta: edulis, aereus (ambas = "hongo/onddoa"), niscalo, perretxiko (zizak), rebozuelo (ziza hori), trompeta (saltsa perretxiko beltza),
   angula (mendiko angula), gibelurdin, cardo, senderuela, galamperna. */
window.SETAS_DATA={
 updated:"2026-11-12",
 lastFair:"2026-11-04",
 note:{es:"El 11 de noviembre no hubo feria por huelga.",eu:"Azaroaren 11n ez zen azokarik izan, greba zela eta."},
 sources:[["Ordiziako Azoka","https://www.ordiziakoazoka.eus/es/precios"],["Goierriko Hitza","https://goierri.hitza.eus/2026/10/28/sagarrak-erosteko-aitzakiarik-ez/"]],
 prices:{
  edulis:{name:"hongo / onddoa",serie:[["2026-08-19",30,38,40],["2026-09-09",24,37,75],["2026-10-21",15,38,170],["2026-10-28",15,38,250],["2026-11-04",15,40,140]]},
  aereus:{name:"hongo / onddoa",serie:[["2026-08-19",30,38,40],["2026-09-09",24,37,75],["2026-10-21",15,38,170],["2026-10-28",15,38,250],["2026-11-04",15,40,140]]},
  rebozuelo:{name:"",serie:[["2026-08-19",25,25,20],["2026-09-09",18,22,40],["2026-10-21",22,24,18],["2026-10-28",25,25,23],["2026-11-04",24,30,36]]},
  trompeta:{name:"",serie:[["2026-10-21",37,37,6],["2026-10-28",22,22,2],["2026-11-04",22,30,11]]},
  angula:{name:"",serie:[["2026-10-21",33,33,15],["2026-10-28",33,33,5],["2026-11-04",33,33,5]]},
  niscalo:{name:"",serie:[["2026-10-21",28,28,10]]},
  perretxiko:{name:"zizak",serie:[["2026-04-29",35,65,83],["2026-05-06",19,58,113]]},
  gibelurdin:{name:"",serie:[["2025-09-24",24,24,5],["2025-10-15",28,28,10],["2025-10-29",25,25,2]]}
 }
};
