#!/usr/bin/env python3
"""Calcula las condiciones del mapa de setas con datos de AEMET OpenData y escribe weather.js.
Uso: AEMET_KEY=... python3 update_weather.py   (si existe un weather.js anterior en la carpeta, conserva su historial).
Sale con código 2 si no hay conexión o falta la clave."""
import json, os, re, sys, time, datetime, urllib.request
KEY=os.environ.get("AEMET_KEY","").strip()
if not KEY: print("FALTA la clave AEMET_KEY"); sys.exit(2)
# indicativo: (nombre, altitud m, latitud, provincia)
ST={"2030":("Soria",1081,41.77,"Soria"),"2005Y":("Vinuesa",1197,41.97,"Soria"),"2017Y":("La Póveda de Soria",1260,42.0,"Soria"),
    "9287A":("San Pedro Manrique",1096,42.03,"Soria"),"2084Y":("Ucero",960,41.72,"Soria"),
    "2331":("Burgos",891,42.36,"Burgos"),"2302N":("Monterrubio de la Demanda",1197,42.15,"Burgos"),"9012E":("Santa Gadea de Alfoz",915,42.95,"Burgos"),"2106B":("Coruña del Conde",955,41.75,"Burgos"),
    "9115X":("Valdezcaray",1630,42.26,"La Rioja"),"9136X":("Valvanera",1006,42.23,"La Rioja"),"9188":("Enciso",855,42.15,"La Rioja"),
    "9091O":("Vitoria-Gasteiz",513,42.88,"Álava"),"9060X":("Lalastra (Valderejo)",910,42.88,"Álava"),"9073X":("Opakua",660,42.83,"Álava"),"9178X":("Kanpezu",570,42.67,"Álava"),
    "9228T":("Roncesvalles",947,43.01,"Navarra"),"9218A":("Isaba",838,42.86,"Navarra"),"9257X":("Eugi",615,42.97,"Navarra"),"1033X":("Areso",520,43.09,"Navarra"),"9238X":("Navascués",612,42.72,"Navarra"),
    "1037X":("Legazpi",460,43.05,"Gipuzkoa"),"1049N":("Elgeta",470,43.14,"Gipuzkoa"),"1026X":("Ordizia",290,43.06,"Gipuzkoa"),
    "1069Y":("Urkiola",747,43.1,"Bizkaia"),"1064L":("Orozko",270,43.1,"Bizkaia")}
def clamp(v,a,b): return a if v<a else (b if v>b else v)
def norm(alt,lat):
    """Factor con el que el mapa aumenta la lluvia en ese punto; se divide por él para llevar la lluvia medida a la referencia (800 m, interior)."""
    return (1+0.35*clamp((lat-42.75)/0.5,0,1))*(1+0.25*clamp((alt-800)/1000,-0.3,1))*(0.6 if (alt<500 and lat<42.65) else 1)
API="https://opendata.aemet.es/opendata/api/"
def get(url,key=True):
    err=None
    for t in range(5):
        try:
            req=urllib.request.Request(url,headers=({"api_key":KEY} if key else {}))
            raw=urllib.request.urlopen(req,timeout=40).read()
            try: return json.loads(raw.decode("utf-8"))
            except UnicodeDecodeError: return json.loads(raw.decode("latin-1"))
        except Exception as e:
            err=e; time.sleep(6*(t+1))
    raise RuntimeError(str(err))
def datos(path):
    r=get(API+path)
    if not r.get("datos"): raise RuntimeError(r.get("descripcion","sin datos"))
    time.sleep(1.5); return get(r["datos"],key=False)
def num(v):
    if v is None: return None
    if isinstance(v,(int,float)): return float(v)
    v=v.strip().replace(",",".")
    if v in ("Ip","Acum",""): return 0.0 if v=="Ip" else None
    try: return float(v)
    except ValueError: return None
today=datetime.date.today(); yday=today-datetime.timedelta(days=1)
hist={}
try:
    m=re.search(r"window\.SETAS_WEATHER=(\{.*\});",open("weather.js",encoding="utf-8").read(),re.S)
    if m: hist=(json.loads(m.group(1)) or {}).get("hist",{}) or {}
except Exception: hist={}
ok=0
for sid in ST:
    h=hist.setdefault(sid,{})
    try:
        ini=(today-datetime.timedelta(days=32)).isoformat()+"T00:00:00UTC"; fin=today.isoformat()+"T23:59:59UTC"
        for d in datos("valores/climatologicos/diarios/datos/fechaini/%s/fechafin/%s/estacion/%s"%(ini,fin,sid)):
            p,tm,tn=num(d.get("prec")),num(d.get("tmed")),num(d.get("tmin"))
            if p is None and tm is None: continue
            h[d["fecha"]]=[p,tm,tn,1]            # 1 = dato oficial
        ok+=1
    except Exception as e: print("aviso diarios",sid,e)
    time.sleep(1.5)
    try:
        obs=datos("observacion/convencional/datos/estacion/"+sid)
        ps=[num(o.get("prec")) for o in obs]; ts=[num(o.get("ta")) for o in obs]; mn=[num(o.get("tamin")) for o in obs]
        ps=[x for x in ps if x is not None]; ts=[x for x in ts if x is not None]; mn=[x for x in mn if x is not None]
        k=yday.isoformat()
        if len(ts)>=20 and not (k in h and len(h[k])>3 and h[k][3]==1):
            h[k]=[round(sum(ps),1),round(sum(ts)/len(ts),1),min(mn) if mn else None,0]   # 0 = provisional (últimas 24 h)
    except Exception as e: print("aviso observacion",sid,e)
    time.sleep(1.5)
if ok==0: print("SIN CONEXION con opendata.aemet.es o clave no válida"); sys.exit(2)
cut=(today-datetime.timedelta(days=40)).isoformat()
for sid in hist: hist[sid]={k:v for k,v in hist[sid].items() if k>=cut}
days20=[(yday-datetime.timedelta(days=i)).isoformat() for i in range(26)]   # ventana de 26 días (estudio de Bielefeld sobre Boletus edulis)
def val(sid,day,i): 
    v=hist.get(sid,{}).get(day); return None if not v else v[i]
rains=[];temps=[];cover=[];used=[]
for sid,(name,alt,lat,prov) in ST.items():
    pr=[val(sid,d,0) for d in days20]; got=[x for x in pr if x is not None]
    if len(got)>=10: rains.append(sum(got)/norm(alt,lat)); cover.append(len(got)); used.append(name)   # estaciones con hueco largo no cuentan
    tm=[val(sid,d,1) for d in days20]; tm=[x for x in tm if x is not None][:7]
    if tm: temps.append(sum(tm)/len(tm)+6*(alt-800)/1000)
if not rains or not temps: print("SIN DATOS suficientes"); sys.exit(2)
days=45
for i in range(40):
    d=(yday-datetime.timedelta(days=i)).isoformat()
    if sum(1 for sid in ST if (val(sid,d,0) or 0)>=10)>=max(3,len(ST)//5): days=i; break
cold=[sid for sid in ST if any((val(sid,d,2) is not None and val(sid,d,2)<=0) for d in days20[:5])]
frost=len(cold)>=max(4,len(ST)//3)   # helada medida en al menos un tercio de las estaciones
cov=min(cover)
# valores por provincia (misma lógica, con las estaciones de cada una)
prov={}
for pn in sorted(set(v[3] for v in ST.values())):
    ids=[sid for sid,v in ST.items() if v[3]==pn]; need=max(1,-(-len(ids)//3)); pr=[];pt=[]
    for sid in ids:
        name,alt,lat,_=ST[sid]
        got=[x for x in (val(sid,d,0) for d in days20) if x is not None]
        if len(got)>=10: pr.append(sum(got)/norm(alt,lat))
        tm=[x for x in (val(sid,d,1) for d in days20) if x is not None][:7]
        if tm: pt.append(sum(tm)/len(tm)+6*(alt-800)/1000)
    if not pr or not pt: continue
    pd=45
    for i in range(40):
        d=(yday-datetime.timedelta(days=i)).isoformat()
        if sum(1 for sid in ids if (val(sid,d,0) or 0)>=10)>=need: pd=i; break
    pc=sum(1 for sid in ids if any((val(sid,d,2) is not None and val(sid,d,2)<=0) for d in days20[:5]))
    prov[pn]={"rain":round(sum(pr)/len(pr)),"temp":round(sum(pt)/len(pt)),"days":pd,"frost":pc>=need}
out={"updated":today.isoformat(),"rain":round(sum(rains)/len(rains)),"temp":round(sum(temps)/len(temps)),"days":days,"frost":bool(frost),
     "source":"AEMET, %d estaciones"%len(rains)+("" if cov>=26 else ", %d de 26 días con dato"%cov),
     "prov":prov,"st":{sid:[v[0],v[1],v[3]] for sid,v in ST.items()},"hist":hist}
head=("/* Mapa de setas — tiempo reciente para las condiciones. Lo reescribe la tarea programada diaria (tools/update_weather.txt) con datos de AEMET OpenData.\n"
      "   26 estaciones de 7 provincias. rain: mm de los últimos 26 días llevados a la referencia del mapa (800 m, interior); temp: °C media a 800 m (últimos 7 días con dato); days: días desde la última lluvia fuerte (10 mm o más en una quinta parte de las estaciones); frost: heladas medidas en un tercio o más de las estaciones en los últimos 5 días.\n"
      "   prov: los mismos cuatro valores calculados para cada provincia. st: estaciones [nombre, altitud, provincia]. hist: datos diarios por estación [lluvia, t. media, t. mínima, 1=oficial / 0=provisional]. © AEMET. */\n")
open("weather.js","w",encoding="utf-8").write(head+"window.SETAS_WEATHER="+json.dumps(out,ensure_ascii=False,separators=(",",":"))+";\n")
print({k:v for k,v in out.items() if k!="hist"}); print("cobertura por estación (días de 26):",dict(zip(used,cover)))
