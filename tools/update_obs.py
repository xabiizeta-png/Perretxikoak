#!/usr/bin/env python3
"""Descarga de iNaturalist los avistamientos del último año de las setas del mapa y escribe sightings.js. Sale con código 2 si no hay conexión."""
import json, sys, time, math, io, urllib.request, urllib.parse, datetime
try:
    from PIL import Image
except Exception:
    Image=None
SP={"edulis":["Boletus edulis","Boletus pinophilus"],"aereus":["Boletus aereus","Boletus reticulatus"],"niscalo":["Lactarius deliciosus"],
    "perretxiko":["Calocybe gambosa"],"cardo":["Pleurotus eryngii"],"rebozuelo":["Cantharellus cibarius","Cantharellus pallens"],
    "trompeta":["Craterellus cornucopioides"],"angula":["Craterellus lutescens"],"senderuela":["Marasmius oreades"],
    "galamperna":["Macrolepiota procera"],"gibelurdin":["Russula virescens"]}
BOX=dict(swlat=41.0,swlng=-4.45,nelat=43.5,nelng=-0.6)
def get(path,**q):
    url="https://api.inaturalist.org/v1/"+path+"?"+urllib.parse.urlencode(q)
    for t in range(4):
        try:
            return json.load(urllib.request.urlopen(urllib.request.Request(url,headers={"User-Agent":"MapaSetas/1.0"}),timeout=40))
        except Exception as e:
            err=e; time.sleep(4*(t+1))
    print("SIN CONEXION con api.inaturalist.org:",err); sys.exit(2)
TILES={}
def alt(lon,lat,z=11):
    """Altitud (m) del punto, de las teselas abiertas Terrarium; None si no se puede."""
    if Image is None: return None
    n=2**z; x=(lon+180)/360*n; y=(1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*n; k=(int(x),int(y))
    if k not in TILES:
        try:
            raw=urllib.request.urlopen(urllib.request.Request("https://elevation-tiles-prod.s3.amazonaws.com/terrarium/%d/%d/%d.png"%(z,k[0],k[1]),headers={"User-Agent":"MapaSetas/1.0"}),timeout=40).read()
            TILES[k]=Image.open(io.BytesIO(raw)).convert("RGB")
        except Exception:
            TILES[k]=None
    im=TILES[k]
    if im is None: return None
    r,g,b=im.getpixel((min(255,int((x-k[0])*256)),min(255,int((y-k[1])*256))))
    return int(round(r*256+g+b/256-32768))
today=datetime.date.today(); d1=(today-datetime.timedelta(days=365)).isoformat()
out={}
for sid,names in SP.items():
    ids=[]
    for nm in names:
        r=get("taxa",q=nm,rank="species",per_page=5); time.sleep(1.1)
        for t in r.get("results",[]):
            if t.get("name","").lower()==nm.lower(): ids.append(t["id"]); break
    obs=[]
    if ids:
        page=1
        while page<=3:
            r=get("observations",taxon_id=",".join(map(str,ids)),d1=d1,per_page=200,page=page,order_by="observed_on",order="desc",geo="true",**BOX); time.sleep(1.1)
            for o in r.get("results",[]):
                if o.get("obscured") or not o.get("location") or not o.get("observed_on"): continue
                if o.get("quality_grade") not in ("research","needs_id"): continue
                la,lo=map(float,o["location"].split(","))
                obs.append([round(lo,3),round(la,3),o["observed_on"],alt(lo,la)])
            if page*200>=r.get("total_results",0): break
            page+=1
    out[sid]=obs; print(sid,ids,len(obs))
head="/* Mapa de setas — avistamientos reales (iNaturalist, último año, sin coordenadas ocultas). Lo reescribe la tarea programada (tools/update_obs.py).\n   by[seta] = lista de [longitud, latitud, fecha, altitud en m o null]. */\n"
open("sightings.js","w",encoding="utf-8").write(head+"window.SETAS_OBS="+json.dumps({"updated":today.isoformat(),"since":d1,"source":"iNaturalist","by":out},separators=(",",":"))+";\n")
