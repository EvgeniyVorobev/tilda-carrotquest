// Made by EVG https://t.me/EvgeniyVorobev \\

/* Preference */
var authToken = 'app.15347.66b19d6ca55bc9e3734d1768c5bec9ab7fe2361fa2ebe67a'; // Token from CQ.
var scriptSrc = 'https://hook.io/evgeniyvorobev/lucky-beatcom-carrotquest'; // Hook script src.
/* ..end [Preference] */


/* Script from CQ Preference */
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
  carrotquest.connect('15347-3b2cef203b54473ad4e98d50c9');
<!-- CarrotQuest END -->
/* ..end [Script from CQ Preference] */

window.evgCarrot = {}; // Global Object for scripts
var user_id = setInterval(function updateUserId(){ // GET uniq user id from CQ object.
    user_id = carrotquest.data.user.id ; 
    user_id.length > 4 ? clearInterval(user_id) : '';
},1000) ;

var hidden_name = setInterval(function() { // Add CQ username to #carrotUsername (for update CQ username if not set in Form form[name="name"]. )
    if (carrotquest.data.user.id != undefined || carrotquest.data.user.id != '') {
        user_id = carrotquest.data.user.id;  
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

/* Function run after submit event execute - Tilda Form's (not payments form's). !!! */
$(document).ready(function(){
    window.mySuccessFunction = function($form){
    var text,text1,text2,text3,text4,text5,text6,
    checkbox,checkbox1,checkbox2,checkbox3,checkbox4,checkbox5,checkbox6,
    formname,name,familyname,email,phone,year,formName,price,age1,age2,age3,age4,adult; // Identify variables for transfering too Hook e.t.c
    var formArray = $form.serializeArray(); // Massive with data from $form.
    var allInfo = {};  // Object with all info for transfering. 
    var allInfo_str = {} // String with all info for transfering.
    var inputInformation = $($form).find('input');
    var textareaInformation = $($form).find('textarea');
    var selectInformation = $($form).find('select');
    var optionInformation = $($form).find('option');
    var checkboxInformation = $($form).find("input[type='checkbox']");

    /* Collect information from form fields */
    inputInformation.each(function () {  // Write input data from $form, that meet requirements.
        if (this.name != 'tildaspec-projectid' && this.name != 'tildaspec-pageid' && this.name != 'formservices[]' 
        && this.name != 'tildaspec-version-lib' && this.name != 'tildaspec-formskey' && this.name != 'tildaspec-formid' && this.name != "tildaspec-formname"
        && this.name != 'tildaspec-referer' && this.name != 'tildaspec-cookie' && this.name != 'form-spec-comments'  && this.name != 'tildaspec-tildacaptcha' 
        && this.value != '' && this.name != '' && this.type != 'radio' && this.type != 'Checkbox' && this.type != 'checkbox' 
        && this.name != "formname" && this.placeholder != '') {
        allInfo_str[this.placeholder] = ' '+this.value+' <br>';
        allInfo[this.placeholder] = this.value;
    } else if ( this.name != 'tildaspec-projectid' && this.name != 'tildaspec-pageid' && this.name != 'formservices[]' 
        && this.name != 'tildaspec-version-lib' && this.name != 'tildaspec-formskey' && this.name != 'tildaspec-formid' 
        && this.name != 'tildaspec-referer' && this.name != 'tildaspec-cookie' && this.name != 'form-spec-comments'  && this.name != 'tildaspec-tildacaptcha' 
        && this.value != '' && this.name != '' && this.type != 'radio' && this.type != 'Checkbox' && this.type != 'checkbox' 
        && this.name != "formname" && this.name != "tildaspec-formname" && this.placeholder.length < 1) {
        allInfo_str[this.name] = ' '+this.value+' <br>';
        allInfo[this.name] = this.value;
    } else if (this.type == 'radio' && this.checked && this.name != '' && this.placeholder != '') { 
        allInfo_str[this.placeholder] = ' '+this.value+' <br>';
        allInfo[this.placeholder] = this.value;
    } else if (this.type == 'radio' && this.checked && this.placeholder == ''){
        allInfo_str[this.name] = ' '+this.value+' <br>';
        allInfo[this.name] = this.value;
    } else if (this.type == 'checkbox' && this.name != '' || this.type == 'Checkbox' && this.checked && this.name != '') {
        allInfo_str[this.name] = ' '+this.value+' <br>';
        allInfo[this.name] = this.value;
    }
    })
    textareaInformation.each(function () { // write textarea data from $form, that meet requirements.
        if ( this.value != '' && this.placeholder != '') {
            allInfo_str[this.placeholder] = ' '+this.value+' <br>';
            allInfo[this.placeholder] = this.value;
        } else {
            allInfo_str[this.name] = ' '+this.value+' <br>';
            allInfo[this.name] = this.value;
        }
    })
    selectInformation.each(function () { // write select data from $form, that meet requirements.
        if ( this.value != '' && this.name != undefined && this.name != '') {
            allInfo_str[this.name] = ' '+this.value+' <br>';
            allInfo[this.name] = this.value;
        }
    })
    /* ..end [Collect information from form fields ] */

    $.each(formArray, filterArray); // Filtering the massive formArray.
    var allInfo_str = JSON.stringify(allInfo_str).replace('{','').replace('}','').replace(/"/g,"").replace(/\<br>,/g,'<br>'); // stringify JSON object for CQ dialogs.

    console.log(JSON.stringify(allInfo_str)); console.log('allInfo_str ',allInfo_str); console.log('allInfo ',allInfo)

    /* Filter form, and set value if it set. */
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
    if (this.name == 'Age Of Child_1') { // search for age form
        age1 = this.value    ; 
    } 
    if (this.name == 'Age Of Child_2') { // search for age form
        age2 = this.value    ; 
    } 
    if (this.name == 'Age Of Child_3') { // search for age form
        age3 = this.value    ; 
    } 
    if (this.name == 'Age Of Child_4') { // search for age form
        age4 = this.value    ; 
        console.log('ЭТО age4 и он равен = ', age4);
    } 
    if (this.name == 'adult') { // search for age form
        adult = this.value    ; 
        console.log('ЭТО age4 и он равен = ', age4);
    } 
  }
    /* ..end [Filter form, and set value if it set.] */
    
// ____----___---___---____-----___----___----- ____-----___-----___-----___-----___----//

    /* Send Data to CQ */
    function sendToCarrot(){  
    if ( name != undefined || name != '') { // Update CQ user's name.
        carrotquest.identify({
            '$name': name
        });
    }

    if (formname != undefined ) { // if $form got name="formname" && formname == 'Footer';
        carrotquest.track('Completed form with name: '+formname, allInfo); // send info to CQ Leads.
        $.ajax({ // send to hook.io -> CQ dialogs
            type: 'POST',
            url: scriptSrc,
            data: { 
                "user_id": user_id,
                "form_name": formname,
                "form_url": decodeURI(location.href+'#'+formname),
                "url": decodeURI(location.href),
                "name": name,
                "age1": age1,
                "age2": age2,
                "age3": age3,
                "age4": age4,
                "adult": adult,
                "email": email,
                "phone": phone,
                "allInfo": allInfo_str
            }
        })
    }

    if (formname == undefined) { // if $form didn't got name="formname".      
        carrotquest.track('Completed form without name ', allInfo); // send info to CQ leads.
        $.ajax({ // send to hook.io -> CQ dialogs.
            type: 'POST',
            url: scriptSrc,
            data: { 
            "user_id": user_id,
            "form_url": decodeURI(location.href+'#'+formname),
            "url": decodeURI(location.href),
            "name": name,
            "email": email,
            "phone": phone,
            "allInfo": allInfo_str
            }
        })
        }
    $('#carrotUsername').text(name);
    }
     /* ..end [Send Data to CQ] */
    sendToCarrot();
    // If tilda-form has data-sucess-url (REDIRECT URI)
    setTimeout(function(){
        if ($($form).data().successUrl != '' && $($form).data().successUrl) {
            window.location.href = $($form).data().successUrl;
        }
    },1500)
    }
/* ..end [Function for special UNIQ form with interview (test)]  */


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
