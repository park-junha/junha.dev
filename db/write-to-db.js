var fp = cat('./projects.json');
var fl = cat('./languages.json');
var p = JSON.parse(fp);
var l = JSON.parse(fl);
db = db.getSiblingDB('personalwebsite');
db.Projects.drop();
db.Projects.insert(p);
db.LanguageIds.drop();
db.LanguageIds.insert(l);
