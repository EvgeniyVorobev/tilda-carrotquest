// Made by EVG https://t.me/EvgeniyVorobev \\

/* Preference */
var authToken = 'app.14283.2acf6f71e5667fc5c45cbc7edf127f69de3e23fb8f6524cf'; // Token from CQ.
var scriptSrc = 'https://hook.io/evgeniyvorobev/ism2018-carrotquest'; // Hook script src.
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
carrotquest.connect('14283-c7e7d643459a3dccf860153ca8');
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
       	    
	  /* Add CQ username by HOOK.io (without auth_token !!!) ) */
	  /*  $.ajax ({
            type: 'POST',
            url: 'https://hook.io/evgeniyvorobev/getname?hook_private_key=ab992945-0706-4fed-a5bb-1e70b5b5b9bb',
            data: { 
                'user_id': 241480408 
            },
            success: function(data) {
			var username = JSON.parse(data).data.props.$name ;
            $('body').append('<div id="carrotUsername" hidden>'+username+'</div>')
            } 
         }) */ 
	    clearInterval(hidden_name)
    }
},500)

/* Function for special UNIQ form with interview (test)*/
window.evgCarrot.interviewForm = function(a,target){
if (a == undefined || a == '') { return } // checking if function didn't get ("a" variable) -> Abort
var test_result = a; // set test_result from get ("a" variable)
var form_id = target.id; // set form_id from get ("target" variable)

setTimeout(function() { // Wait 1 sek and execude sendSimpleForm()
    sendSimpleForm()
},1000)

function sendSimpleForm(){ // Catch information from form.
    if ($(target).is('[simpleform]') && $('#'+target.id).valid()) { // if form has simpleform attribute and Validate with Jquery Validation.  
    var text,text1,text2,text3,text4,text5,text6,checkbox,checkbox1,checkbox2,checkbox3,checkbox4,checkbox5,checkbox6,
    formname,name,familyname,email,phone,year,formName,price; // identify variables for transfering too Hook e.t.c
    var simpleform = $('#'+target.id) // id of the form
    var formArray = simpleform.serializeArray(); // massive with data from $form.
    var allInfo = {};  // object with all info for transfering. 
    var allInfo_str = {} // string with all info for transfering.
    var inputInformation = simpleform.find('input');
    var textareaInformation = simpleform.find('textarea');
    var selectInformation = simpleform.find('select');
    var optionInformation = simpleform.find('option');
    var checkboxInformation = simpleform.find("input[type='checkbox']");

    /* Collect information from form fields */
    inputInformation.each(function () {  // write input data from simpleform, that meet requirements.
        if (this.name != "formname" && this.getAttribute('fieldname') != '' && this.getAttribute('fieldname') != undefined && this.value != '') {  // if has fieldname attribute and value
            allInfo_str[this.getAttribute('fieldname')] = ' '+this.value+' <br>';
            allInfo[this.getAttribute('fieldname')] = this.value;
        } else if (this.name != '' && this.value != '') { // if has name attribute and value
            allInfo_str[this.name] = ' '+this.value+' <br>';
            allInfo[this.name] = this.value;
        }
    })
    textareaInformation.each(function () { // write textarea data from simpleform, that meet requirements.
        if ( this.value != '' && this.getAttribute('fieldname') != '' && this.name != "formname") {
            allInfo_str[this.getAttribute('fieldname')] = ' '+this.value+' <br>';
            allInfo[this.getAttribute('fieldname')] = this.value;
        } else if (this.name != '' && this.value != '')  {
            allInfo_str[this.name] = ' '+this.value+' <br>';
            allInfo[this.name] = this.value;
        }
    })
    selectInformation.each(function () { // write select data from simpleform, that meet requirements.
        if ( this.value != '' && this.name != undefined && this.name != '') {
            allInfo_str[this.getAttribute('fieldname')] = ' '+this.value+' <br>';
            allInfo[this.getAttribute('fieldname')] = this.value;
        } else if (this.name != '' && this.value != '')  {
            allInfo_str[this.name] = ' '+this.value+' <br>';
            allInfo[this.name] = this.value;
        }
    })
    allInfo_str['Результат Теста'] = ' '+test_result+' <br>'; // added test results
    allInfo['Результат Теста'] = test_result; // added test results
    /* ..end [Collect information from form fields ] */

    $.each(formArray, filterArray); // Filtering the massive formArray.
    var allInfo_str = JSON.stringify(allInfo_str).replace('{','').replace('}','').replace(/"/g,"").replace(/\<br>,/g,'<br>'); // stringify JSON object for CQ dialogs.
    // console.log(JSON.stringify(allInfo_str)); console.log('allInfo_str ',allInfo_str); console.log('allInfo ',allInfo)

    /* Filter form, and set value if it set. */
    function filterArray() {    
    if (this.name == 'formname') {
        formname = this.value + ' ' + test_result   ; // hidden form name from hidden input field.
    }
    if (this.name == 'name' || this.name == 'Name') { // search for name.
        name = this.value   ; 
    } 
    if (name == '' || name == undefined) { // if name isn't set -> take username from field #carrotUsername.
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

    if (formname != undefined) { // if form got name="formname" .
        carrotquest.track('Заполнил форму '+formname, allInfo); // send info to CQ leads.
        $.ajax({ // send to hook.io -> CQ dialogs.
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
                "Результат теста": test_result,
                "allInfo": allInfo_str
            }
        })
    }

    if (formname == undefined) { // if form didn't got name="formname".
    carrotquest.track('Заполнил форму без имени', allInfo); // send info to CQ leads.    
    $.ajax({ // Send to Hook -> CQ dialogs 
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

}}}
/* ..end [Function for special UNIQ form with interview (test)]  */


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
    } else if (this.type == 'radio' && this.checked) {
        allInfo_str[this.placeholder] = ' '+this.value+' <br>';
        allInfo[this.placeholder] = this.value;
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

    // console.log(JSON.stringify(allInfo_str)); console.log('allInfo_str ',allInfo_str); console.log('allInfo ',allInfo)

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
