// Made by EVG https://t.me/EvgeniyVorobev \\

/* Preference */
var authToken = 'app.23410.ec50351cb76b188da9aad7e66156672d336a6ada4fc5efd2'; // Token from CQ.
var scriptSrc = 'https://hook.io/evgeniyvorobevv/popupgrade-carrotquest'; // Hook script src.
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
carrotquest.connect('23410-993634aa62aa420eeb856a9bf2');
<!-- CarrotQuest END -->
/* ..end [Script from CQ Preference] */

/* IF SITE USE TILDA */
if (typeof(window.Tilda) == 'object') { // If site use Tilda.cc
    var user_id;
    window.evgCarrot = {}; // Global Object for scripts
    var searchUserId = setInterval(function updateUserId(){ // GET uniq user id from CQ object.
        user_id = carrotquest.data.user.id ;
        console.log(user_id);
        user_id.length > 4 ? clearInterval(searchUserId) : '';
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

// Added CQ Leads ('Приступил к заполнению формы [ имя формы из formname ]')
    $(function(){
        $('a[href*="#popup"]').click(function function_name(argument) {
            var href_name = '#'+this.href.split('/')[this.href.split('/').length-1].replace(/.*#/gi,""); // popup href name;
            console.log(href_name);
            if ($("div[data-tooltip-hook="+"'"+href_name+"'"+"]").find('input[name="formname"]')[0]) {
                var popup_formname = $("div[data-tooltip-hook="+"'"+href_name+"'"+"]").find('input[name="formname"]')[0].value // find popup formname VALUE
                carrotquest.track('Перешел к заполнению формы '+'[ '+popup_formname+' ]'); // send info to CQ leads.
            } else {
                var popup_formname = $("div[data-tooltip-hook="+"'"+href_name+"'"+"]")[0].getAttribute('data-tooltip-hook') ;
                carrotquest.track('Открыл всплывающий попап '+'[ '+popup_formname+' ]')
            }
        })
    })

    /* Function run after submit event execute - Tilda Form's (not payments form's). */
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

            /* Collect information from form fields */
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
                } else if (this.type == 'radio' && this.checked && this.placeholder != '') {
                    allInfo_str[this.placeholder] = ' '+this.value+' <br>';
                    allInfo[this.placeholder] = this.value;
                } else if (this.type == 'radio' && this.checked && this.placeholder == '') {
                    allInfo_str[this.name] = ' '+this.value+' <br>';
                    allInfo[this.name] = this.value;
                } else if (this.type == 'checkbox' || this.type == 'Checkbox' && this.checked) {
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
                if ( (phone != undefined || phone != '') && $($form).closest("[data-payment-system]")[0] == undefined ) { // Update CQ user's phone if NOT PAYMENT FORM.
                    carrotquest.identify({
                        '$phone': phone
                    });
                }
                if (formname != undefined) { // if $form got name="formname"
                    carrotquest.track('Заполнил форму '+formname, allInfo); // send info to CQ Leads.
                    $.ajax({ // send to hook.io -> CQ dialogs
                        type: 'POST',
                        url: scriptSrc,
                        data: {
                            "user_id": user_id,
                            "form_name": formname,
                            "form_url": decodeURI(location.href+'#'+formname),
                            "url": decodeURI(location.href),
                            "name": name,
                            "email": email,
                            "phone": phone,
                            "allInfo": allInfo_str
                        }
                    })
                }

                if (formname == undefined) { // if $form didn't got name="formname".
                    carrotquest.track('Заполнил форму без имени', allInfo); // send info to CQ leads.
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
            console.log('$form',$form);
            setTimeout(function(){
                if ($($form).data().successUrl != '' && $($form).data().successUrl) {
                    window.location.href = $($form).data().successUrl;
                }
            },1500)
        }


        // if press Submit , then run mySuccessFunction;
        $('.js-form-proccess').each(function(){
            $(this).data('success-callback', 'window.mySuccessFunction');
            // Added input field with CQ user Id to $form with cloudpayments identifier.
            if  (this.closest("div [data-payment-system='cloudpayments']")) {
                $(this).append(`<div class="t-input-group t-input-group_ph" hidden data-input-lid="1518612561100"> 
                    <div class="t-input-title t-descr t-descr_md" data-redactor-toolbar="no" field="li_title__1496239478607" style="">Your Phone</div> 
                    <div class="t-input-block"> 
                    <input id="userId" type="text" name="Phone" class="t-input js-tilda-rule " value="" data-tilda-req="0" data-tilda-rule="phone" style="color:#000000; border:1px solid #000000; "> 
                    </div> </div>`);
                $('#userId').val(user_id);
                console.log($(this).children("input[data-tilda-rule='phone']"));
                $(this).find("input[data-tilda-rule='phone']").not('#userId').keyup(function(e){
                    var phoneFieldVal = this.value;
                    var phonePlusId = phoneFieldVal+'-----'+user_id;
                    $('#userId').val(phonePlusId);
                    console.log($('#userId').val());
                    console.log( /\w+$/.exec($('#userId').val())[0]); // регулярка для вытаскивания userId.
                    console.log($('#userId').val().replace('-----'+/\w+$/.exec($('#userId').val())[0],'')); // регулярка чтоб номер вытащить.
                });
            }

            // Added input field with CQ user Id to $form with Yandex identifier.
            if  (this.closest("div [data-payment-system='yakassa']")) {
                $(this).append(`<div class="t-input-group t-input-group_ph" hidden data-input-lid="1518612561100"> 
                    <div class="t-input-title t-descr t-descr_md" data-redactor-toolbar="no" field="li_title__1496239478607" style="">Your Phone</div> 
                    <div class="t-input-block"> 
                    <input id="userId" type="text" name="Phone" class="t-input js-tilda-rule " value="" data-tilda-req="0" data-tilda-rule="phone" style="color:#000000; border:1px solid #000000; "> 
                    </div> </div>`);
                $('#userId').val(user_id);
                console.log($(this).children("input[data-tilda-rule='phone']"));
                $(this).find("input[data-tilda-rule='phone']").not('#userId').keyup(function(e){
                    var phoneFieldVal = this.value;
                    var phonePlusId = phoneFieldVal+'-----'+user_id;
                    $('#userId').val(phonePlusId);
                    console.log('это id', user_id);
                    console.log('это phonenumber+id', /\w+$/.exec(user_id)[0]); // регулярка для вытаскивания userId.
                    console.log($('#userId').val().replace('-----'+/\w+$/.exec(user_id)[0],'')); // регулярка чтоб номер вытащить.
                });
            }

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
}
