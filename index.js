const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill');

const app = express();
const settingsBill = SettingsBill();


/*const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});
*/

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('layouts', {settings: settingsBill.getSettings(),
      totals: settingsBill.totals()  
    });
});

app.listen(3011, function(){
    console.log('App started at port:', PORT)
});

app.post('/settings', function(req, res) {
console.log(req.body);

settingsBill.setSettings({
callCost: req.body.callCost,
smsCost: req.body.smsCost,
warningLevel: req.body.warningLevel,
criticalLevel: req.body.criticalLevel

});

console.log(settingsBill.getSettings());

res.redirect('/');
});

app.post('/action', function(req, res){
//capture the call type to add
settingsBill.recordAction(req.body.actionType)
res.redirect('/');
});

app.get('/actions', function(req, res){

});

app.get('/actions/:type', function(req, res){

});

const PORT = process.env.PORT || 3011;


//value="{{settings.callCost}}" insert this on all input of settings