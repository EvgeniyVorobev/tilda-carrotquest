<!-- CarrotQuest BEGIN -->
(function(){
    function Build(name, args){return function(){window.carrotquestasync.push(name, arguments);} }
    if (typeof carrotquest === 'undefined') {
        var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
        s.src = '//cdn.carrotquest.io/api.min.js';
        var x = document.getElementsByTagName('head')[0]; x.appendChild(s);
        window.carrotquest = {}; window.carrotquestasync = []; carrotquest.settings = {};
        var m = ['connect', 'track', 'identify', 'auth', 'open', 'onReady', 'addCallback', 'removeCallback', 'trackMessageInteraction'];
        for (var i = 0; i < m.length; i++) carrotquest[m[i]] = Build(m[i]);
    }
})();
carrotquest.connect('14055-2da1eea50c87cb2ecb655ddc78');
<!-- CarrotQuest END -->


$(document).ready(function(){
    var user_id;
    var authToken = 'app.14055.46270bd4201d66c944a361bf1bae381f65d2516b149a4808'; // Токен

setTimeout(function(){
    if (carrotquest.data.user.id != undefined || carrotquest.data.user.id != '') {
    user_id = carrotquest.data.user.id;  // Записываем уникальный идентификатор пользователя Carrot.
    $.ajax ({
        type: 'GET',
        url: 'https://api.carrotquest.io/v1/users/'+user_id,
        data: { 
            'auth_token': authToken
        },
        success: function(data) {
            $('body').append('<div id="carrotUsername" hidden>'+data.data.props.$name+'</div>')
        } 
    }) ;
}
},500)

window.mySuccessFunction = function($form){

    var formname,name,familyname,email,year,formName,price; // Определяем переменные в которые запишем данные для передачи.
    var formArray = $form.serializeArray(); // Массив из данных формы

    // Фильтруем массив из данных для передачи в CarrotQuest. 
    $.each(formArray, filterArray); 

    // Записываем существующие имя пользователя в поле
    function filterArray() {    
    if (this.name == 'formname') {
        formname = this.value   ; // скрытый Идентификатор(Имя) формы для передачи в керрот
    }
    if (this.name == 'name' || this.name == 'Name') { // Проверка на налоичие имени
        name = this.value   ; // имя из формы
    } 
    if (name == '' || name == undefined) {
        name = $('#carrotUsername').text()
    }
    if (this.name == 'familyname') {
        familyname = this.value ; // фамилия из формы
    }
    if (this.name == 'email' || this.name == 'Email') {
       email = this.value   ; // email из формы
     }
    if (this.name == 'year') {
       year = this.value    ; // год из формы
     }
    }

    // Определяем какие данные из какой формы передадуться в CarrotQuest.
  function sendToCarrot(){

    
    if ( name != undefined || name != '') { // Обновление имени пользователя если задано 
            carrotquest.identify({
                '$name': name
        });
    }

    /* ==== Отправка данных в лиды */  
    if (formname != undefined) { // Условие для формы == имя_формы*/
            carrotquest.track('Заполнил форму '+formname, {
                "Имя формы": formname,
                "Url-формы": decodeURI(location.href+'#'+formname),
                "$name": name,
                "Фамилия": familyname,
                "Email": email,
                "$url": decodeURI(location.href)
                 });

    /* ==== Отправка данных в carrot диалоги через hook */
    $.ajax({
        type: 'POST',
        url: 'https://hook.io/evgeniyvorobev/provedenie-carrotquest',
        data:{ 
                    "user_id": user_id,
                    "form_name": formname,
                    "form_url": decodeURI(location.href+'#'+formname),
                    "url": decodeURI(location.href),
                    "name": name,
                    "email": email
                }
        })
   }

 // ____----___---___---____-----___----___----- ____-----___-----___-----___-----___----//

    /* Условие для Всех остальных форм у которых не задано имя формы (по умолчанию)*/
    if (formname == undefined) {
        carrotquest.track('Заполнил форму',{
        "Имя формы": formname,
        "Url-формы": decodeURI(location.href+'#'+formname),
        "$url": decodeURI(location.href),
        "$name": name,
        "Email": email
    });

    /* Отправка данных в диалоги через hook */
        $.ajax({
        type: 'POST',
        url: 'https://hook.io/evgeniyvorobev/provedenie-carrotquest',
        data: { 
            "user_id": user_id,
            "form_url": decodeURI(location.href+'#'+formname),
            "url": decodeURI(location.href),
            "name": name,
            "email": email
        }
    })
 }
        $('#carrotUsername').text(name);
}
        sendToCarrot();
}

    // Если нажали на Submit выполняется mySuccessFunction()
    $('.js-form-proccess').each(function(){
        $(this).data('success-callback', 'window.mySuccessFunction');
    });

    // Cкролинг к форме пользователя клацая по ссылке при переходе с CarrotQuest.
    setTimeout(function(){
        var scrollTag = decodeURI(location.href).replace(location.origin+location.pathname+'#','');
        function searchForm(){
            if (this.value == scrollTag){
                console.log($(this.closest('form')).offset().top)
                $('html, body').animate({
                    scrollTop: $(this.closest('form')).offset().top-100
                }, 1000);
            }
        }
        $.each($('input'),searchForm);
    },2000)

  });
