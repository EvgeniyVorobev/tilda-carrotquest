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
    var authToken = 'app.14283.2acf6f71e5667fc5c45cbc7edf127f69de3e23fb8f6524cf'; // Токен
    var scriptSrc = 'https://hook.io/evgeniyvorobev/ism2018-carrotquest'

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

console.log(Date());

    window.mySuccessFunction = function($form){

    var text,text1,text2,text3,text4,text5,text6,
    checkbox,checkbox1,checkbox2,checkbox3,checkbox4,checkbox5,checkbox6,
    formname,name,familyname,email,phone,year,formName,price; // Определяем переменные в которые запишем данные для передачи.
    var formArray = $form.serializeArray(); // Массив из данных формы
    var allInfo = {};  // Object with all info  
    var allInfo_str = {} // String with all info 
    var inputInformation = $($form).find('input');
    var textareaInformation = $($form).find('textarea');
    var selectInformation = $($form).find('select');
    var optionInformation = $($form).find('option');
    var checkboxInformation = $($form).find("input[type='checkbox']");

    inputInformation.each(function () {
        if (this.name != 'tildaspec-projectid' && this.name != 'tildaspec-pageid' && this.name != 'formservices[]' 
            && this.name != 'tildaspec-version-lib' && this.name != 'tildaspec-formskey' && this.name != 'tildaspec-formid' 
            && this.name != 'tildaspec-referer' && this.name != 'tildaspec-cookie' && this.name != 'form-spec-comments'  && this.name != 'tildaspec-tildacaptcha' 
            && this.value != '' && this.name != '' && this.type != 'radio' && this.type != 'Checkbox' && this.type != 'checkbox' 
            && this.name != "formname" && this.placeholder != '') {
            allInfo_str[this.placeholder] = ' '+this.value+' <br>';
            allInfo[this.placeholder] = this.value;
         } else if ( this.name != 'tildaspec-projectid' && this.name != 'tildaspec-pageid' && this.name != 'formservices[]' 
            && this.name != 'tildaspec-version-lib' && this.name != 'tildaspec-formskey' && this.name != 'tildaspec-formid' 
            && this.name != 'tildaspec-referer' && this.name != 'tildaspec-cookie' && this.name != 'form-spec-comments'  && this.name != 'tildaspec-tildacaptcha' 
            && this.value != '' && this.name != '' && this.type != 'radio' && this.type != 'Checkbox' && this.type != 'checkbox' 
            && this.name != "formname" && this.placeholder.length < 1) {
            allInfo_str[this.name] = ' '+this.value+' <br>';
            allInfo[this.name] = this.value;
         } else if (this.type == 'radio' && this.checked) {
            allInfo_str[this.placeholder] = ' '+this.value+' <br>';
            allInfo[this.placeholder] = this.value;
         } else if (this.type == 'checkbox' || this.type == 'Checkbox' && this.checked) {
            allInfo_str[this.name] = ' '+this.value+' <br>';
            allInfo[this.name] = this.value;
         }
     })
    textareaInformation.each(function () {
        if ( this.value != '' && this.placeholder != '') {
            allInfo_str[this.placeholder] = ' '+this.value+' <br>';
            allInfo[this.placeholder] = this.value;
        } else {
            allInfo_str[this.name] = ' '+this.value+' <br>';
            allInfo[this.name] = this.value;
        }
    })
    selectInformation.each(function () {
        if ( this.value != '' && this.name != undefined && this.name != '') {
            allInfo_str[this.name] = ' '+this.value+' <br>';
            allInfo[this.name] = this.value;
        }
    })
    // optionInformation.each(function () {
    //     if ( this.value != '' && this.name != undefined ) {
    //         allInfo_str[this.name] = ' '+this.value+' <br>';
    //         allInfo[this.name] = this.value;
    //         console.log('не проходит');
    //     }
    // })

    // Фильтруем массив из данных для передачи в CarrotQuest. 
    $.each(formArray, filterArray); 

    console.log(JSON.stringify(allInfo_str));
    var allInfo_str = JSON.stringify(allInfo_str).replace('{','').replace('}','').replace(/"/g,"").replace(/\<br>,/g,'<br>'); // Json with all info
    console.log('allInfo_str ',allInfo_str);
    console.log('allInfo ',allInfo)
   

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
    if (this.name == 'phone' || this.name == 'Phone') {
        phone = this.value    ; // год из формы
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
        carrotquest.track('Заполнил форму '+formname, allInfo);

    /* ==== Отправка данных в carrot диалоги через hook */
        $.ajax({
            type: 'POST',
            url: scriptSrc,
            data: { 
                "user_id": user_id,
                "form_name": formname,
                "form_url": decodeURI(location.href+'#'+formname),
                "url": decodeURI(location.href),
                "name": name,
                "email": email,
                "allInfo": allInfo_str
            }
        })
    }

 // ____----___---___---____-----___----___----- ____-----___-----___-----___-----___----//

 /* Условие для Всех остальных форм у которых не задано имя формы (по умолчанию)*/
 if (formname == undefined) {
    /*Отправка данных в lead*/
    carrotquest.track('Заполнил форму без имени', allInfo);

    /* Отправка данных в диалоги через hook */
    $.ajax({
        type: 'POST',
        url: scriptSrc,
        data: { 
            "user_id": user_id,
            "form_url": decodeURI(location.href+'#'+formname),
            "url": decodeURI(location.href),
            "name": name,
            "email": email,
            "allInfo": allInfo_str
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