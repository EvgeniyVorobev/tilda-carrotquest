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

var authToken = 'app.14055.46270bd4201d66c944a361bf1bae381f65d2516b149a4808'; // Token from CQ.
var scriptSrc = 'https://hook.io/evgeniyvorobev/provedenie-carrotquest'; // Hook script src.
var user_id = setInterval(function updateUserId(){user_id = carrotquest.data.user.id ; // Uniq id of CQ user
    user_id.length > 4 ? clearInterval(user_id) : '';
},1000) ;
var hidden_name = setInterval(function() { // Username from CQ
    if (carrotquest.data.user.id != undefined || carrotquest.data.user.id != '') {
    user_id = carrotquest.data.user.id;  // Uniq id of CQ user.
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
    clearInterval(hidden_name)
}
},500)


/* Function for interview form */
window.evgCarrot.interviewForm = function(a,target){
if (a == undefined || a == '') { return } // if form has no answer - abort.
var test_result = a; // test result from send script.
var form_id = target.id; // form id.

setTimeout(function() {
    sendSimpleForm()
},1000)

/*Catch information from forms with attr simpleform fields. !*/
function sendSimpleForm(){
    if ($(target).is('[simpleform]') && $('#'+target.id).valid()) { // if form has simpleform attribute and Validate with Jquery Validation.  
        var text,text1,text2,text3,text4,text5,text6,checkbox,checkbox1,checkbox2,checkbox3,checkbox4,checkbox5,checkbox6,
    formname,name,familyname,email,phone,year,formName,price; // Identify variables for transfering too Hook e.t.c
    var simpleform = $('#'+target.id) // Id of the form
    var formArray = simpleform.serializeArray(); // Massive with data from $form.
    var allInfo = {};  // Object with all info for transfering. 
    var allInfo_str = {} // String with all info for transfering.
    var inputInformation = simpleform.find('input');
    var textareaInformation = simpleform.find('textarea');
    var selectInformation = simpleform.find('select');
    var optionInformation = simpleform.find('option');
    var checkboxInformation = simpleform.find("input[type='checkbox']");

    /* Collect information from fields*/
    inputInformation.each(function () {  // Write input data from simpleform, that meet requirements.
        if (this.name != "formname" && this.getAttribute('fieldname') != '' && this.getAttribute('fieldname') != undefined && this.value != '') {  // if has fieldname attribute and value
            allInfo_str[this.getAttribute('fieldname')] = ' '+this.value+' <br>';
            allInfo[this.getAttribute('fieldname')] = this.value;
        } else if (this.name != '' && this.value != '') { // if has name attribute and value
            allInfo_str[this.name] = ' '+this.value+' <br>';
            allInfo[this.name] = this.value;
        }
    })
    textareaInformation.each(function () { // Write textarea data from simpleform, that meet requirements.
        if ( this.value != '' && this.getAttribute('fieldname') != '' && this.name != "formname") {
            allInfo_str[this.getAttribute('fieldname')] = ' '+this.value+' <br>';
            allInfo[this.getAttribute('fieldname')] = this.value;
        } else if (this.name != '' && this.value != '')  {
            allInfo_str[this.name] = ' '+this.value+' <br>';
            allInfo[this.name] = this.value;
        }
    })
    selectInformation.each(function () { // Write select data from simpleform, that meet requirements.
        if ( this.value != '' && this.name != undefined && this.name != '') {
            allInfo_str[this.getAttribute('fieldname')] = ' '+this.value+' <br>';
            allInfo[this.getAttribute('fieldname')] = this.value;
        } else if (this.name != '' && this.value != '')  {
            allInfo_str[this.name] = ' '+this.value+' <br>';
            allInfo[this.name] = this.value;
        }
    })
    allInfo_str['Результат Теста'] = ' '+test_result+' <br>'; // Added test results
    allInfo['Результат Теста'] = test_result; // Added test results
    
    /* End Collect information */


    $.each(formArray, filterArray); // Filtering the massive formArray.
    var allInfo_str = JSON.stringify(allInfo_str).replace('{','').replace('}','').replace(/"/g,"").replace(/\<br>,/g,'<br>'); // stringify JSON object for CQ dialogs.

    // console.log(JSON.stringify(allInfo_str));
    // console.log('allInfo_str ',allInfo_str);
    // console.log('allInfo ',allInfo)

    // Filter form, and set value if there is.
    function filterArray() {    
    if (this.name == 'formname') {
        formname = this.value   ; // hidden form name from hidden input field.
    }
    if (this.name == 'name' || this.name == 'Name') { // search for name.
        name = this.value   ; 
    } 
    if (name == '' || name == undefined) { // if name is not set , take username from field #carrotUsername.
        name = $('#carrotUsername').text()
    }
    if (this.name == 'email' || this.name == 'Email') { // search for email.
        email = this.value   ; 
    }
    if (this.name == 'phone' || this.name == 'Phone') { // search for phone
        phone = this.value    ; 
    } 
}

// ____----___---___---____-----___----___----- ____-----___-----___-----___-----___----//

    /* Send Data to CQ */
    function sendToCarrot(){  
    if ( name != undefined || name != '') { // Update CQ user's name.
        carrotquest.identify({
            '$name': name
        });
}

    if (formname != undefined) { // if $form have formname input-field.
        carrotquest.track('Заполнил форму '+formname, allInfo); // send info to CQ Leads.
        $.ajax({ // send to CQ dialogs.
            type: 'POST',
            url: scriptSrc,
            data: { 
                "user_id": user_id,
                "form_name": formname,
                "form_url": decodeURI(location.href+'#'+formname),
                "url": decodeURI(location.href),
                "name": name,
                "email": email,
                "Результат теста": test_result,
                "allInfo": allInfo_str
            }
        })
    }

    if (formname == undefined) { // if $form didn't have formname input-field.
        /*Отправка данных в lead*/
    carrotquest.track('Заполнил форму без имени', allInfo);
    /* Send to Hook -> CQ dialogs */
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
}
}
/* End of Simpleform  */


/* Function whitch run after submit event - Tilda Form (not payments form's). */
$(document).ready(function(){
    window.mySuccessFunction = function($form){
        var text,text1,text2,text3,text4,text5,text6,
        checkbox,checkbox1,checkbox2,checkbox3,checkbox4,checkbox5,checkbox6,
    formname,name,familyname,email,phone,year,formName,price; // Identify variables for transfering too Hook e.t.c
    var formArray = $form.serializeArray(); // Massive with data from $form.
    var allInfo = {};  // Object with all info for transfering. 
    var allInfo_str = {} // String with all info for transfering.
    var inputInformation = $($form).find('input');
    var textareaInformation = $($form).find('textarea');
    var selectInformation = $($form).find('select');
    var optionInformation = $($form).find('option');
    var checkboxInformation = $($form).find("input[type='checkbox']");

    inputInformation.each(function () {  // Write input data from $form, that meet requirements.
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
    textareaInformation.each(function () { // Write textarea data from $form, that meet requirements.
        if ( this.value != '' && this.placeholder != '') {
            allInfo_str[this.placeholder] = ' '+this.value+' <br>';
            allInfo[this.placeholder] = this.value;
        } else {
            allInfo_str[this.name] = ' '+this.value+' <br>';
            allInfo[this.name] = this.value;
        }
    })
    selectInformation.each(function () { // Write select data from $form, that meet requirements.
        if ( this.value != '' && this.name != undefined && this.name != '') {
            allInfo_str[this.name] = ' '+this.value+' <br>';
            allInfo[this.name] = this.value;
        }
    })

    $.each(formArray, filterArray); // Filtering the massive formArray.
    var allInfo_str = JSON.stringify(allInfo_str).replace('{','').replace('}','').replace(/"/g,"").replace(/\<br>,/g,'<br>'); // stringify JSON object for CQ dialogs.

    // console.log(JSON.stringify(allInfo_str));
    // console.log('allInfo_str ',allInfo_str);
    // console.log('allInfo ',allInfo)

    // Filter $form, and set value if there is.
    function filterArray() {    
        if (this.name == 'formname') {
        formname = this.value   ; // hidden form name from hidden input field.
    }
    if (this.name == 'name' || this.name == 'Name') { // search for name.
        name = this.value   ; 
    } 
    if (name == '' || name == undefined) { // if name is not set , take username from field #carrotUsername.
        name = $('#carrotUsername').text()
    }
    if (this.name == 'email' || this.name == 'Email') { // search for email.
        email = this.value   ; 
    }
    if (this.name == 'phone' || this.name == 'Phone') { // search for phone
        phone = this.value    ; 
    } 
}

 // ____----___---___---____-----___----___----- ____-----___-----___-----___-----___----//

    /* Send Data to CQ */
    function sendToCarrot(){  
    if ( name != undefined || name != '') { // Update CQ user's name.
        carrotquest.identify({
            '$name': name
        });
}

    if (formname != undefined) { // if $form have formname input-field.
        carrotquest.track('Заполнил форму '+formname, allInfo); // send info to CQ Leads.
        $.ajax({ // send to CQ dialogs.
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

     if (formname == undefined) { // if $form didn't have formname input-field.
        /* Send to CQ Lead */
    carrotquest.track('Заполнил форму без имени', allInfo);

    /* Send to hook -> CQ dialogs.*/
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


    // if press Submit , then run mySuccessFunction;
    $('.js-form-proccess').each(function(){
        $(this).data('success-callback', 'window.mySuccessFunction');
    });

    // Scroll to form from CQ leads/dialogs.
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
  // evg() // Execude script
