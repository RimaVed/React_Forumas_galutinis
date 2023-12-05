# Predėti projectą taip:
a. Įsikelti į projektą turimus  node_modules paketus.
b.Terminale pasirinkti GitBash ir komandomis ls ir cd nusinaviguoti į aplankalą React_forumas, po to į aplankalą forumas, kur yra projectas. Įvedę ls komandą turite matyti : node_modules/  package.json  package-lock.json  public/  README.md  src/.
c.  Tada paleisti npm i komandą, kuri sužiūrės paketus.
### `npm i`

## Aplanke package.json, prie scripts nurodyti kur pasileis json serveris.
"json": "json-server --watch ./src/data.json --port 8080"


## Pirma pasileisti JSON serverį IR TIK po to  React aplikaciją
json serveris pasileidžia su šia komanda:
### `npm run json`

## TIK json serverio paleidimo paleisti React su šia komanda:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

