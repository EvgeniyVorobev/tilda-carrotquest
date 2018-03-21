// A simple hello world microservice 
// Service will respond to HTTP requests with a string
// hook.req is a Node.js http.IncomingMessage
// var host = hook.req.host;
// hook.res is a Node.js httpServer.ServerResponse
// Respond to the request with a simple string
// var params= JSON.stringify({'sad':'asd'}); // работает;
// var params = JSON.stringify(hook.params); // входящие параметры 

module['exports'] = function helloWorld (hook) {
var request = require('request');  
var token = 'app.15602.219d2cc34de7523ce528be2b5894a635de1264f172a20f24'; // токен из личного кабинета
var params = hook.params; // входящие параметры 
var id = params.user_id; 
var response = JSON.stringify({"code":'0'}); // ответ на запрос.
  
if (params.form_name != undefined) {  
var options = {
  method: 'POST',
  url: 'https://api.carrotquest.io/v1/users/'+id+'/startconversation',
  headers: { 'Content-type':'application/x-www-form-urlencoded','Content-type':'application/json'},
  form: {
  auth_token: token,
  body: 'Была заполнена форма '+params.form_name+', пользователем '+params.name+'<br> Ссылка на страницу с формой: '+encodeURI(params.url)+' ;<br><br>Вся полученная информация: <br>'+params.allInfo 
  }
}  
  request(options, function(err, res, body){
    if (err) {
      return hook.res.end(err.messsage);
    }
     hook.res.end(hook.params); 
  })
}
  
if (params.form_name == undefined) { // если форма неопределённая.
var options = {
  method: 'POST',
  url: 'https://api.carrotquest.io/v1/users/'+id+'/startconversation',
  headers: { 'Content-type':'application/x-www-form-urlencoded','Content-type':'application/json'},
  form: {
  auth_token: token,
  body: 'Была заполнена форма пользователем '+params.name+'<br> Ссылка на страницу с формой: '+encodeURI(params.url)+' ;<br><br>Вся полученная информация: <br>'+params.allInfo 
  }
}
  request(options, function(err, res, body){
    if (err) {
      return hook.res.end(err.messsage);
    }
     hook.res.end(hook.params); 
  })
}



if (params.phone != 'undefined' && params.phone != '') { // Set phone number if it set.
  var setMobile = {
  method: 'POST',
  url: 'https://api.carrotquest.io/v1/users/'+id+'/props',
  headers: { 'Content-type':'application/x-www-form-urlencoded','Content-type':'application/json'},
  form: {
  auth_token: token,
  operations: JSON.stringify([{"key": "$phone", "value": params.phone, "op": "update_or_create"}])
        }
    }
    request(setMobile, function(err, res, body){
    if (err) {
      return hook.res.end(err.messsage);
    }
    hook.res.end(response); // Возврат результата.
  })
}  
    
}; // ..end [module]