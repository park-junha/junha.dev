var file = cat('./data.json');
var data = JSON.parse(file);
db = db.getSiblingDB('personalwebsite');
db.PersonalWebsite.drop();
db.PersonalWebsite.insert(data);
