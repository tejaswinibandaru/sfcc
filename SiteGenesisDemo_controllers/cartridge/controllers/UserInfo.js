/**
* Description of the Controller and the logic it provides
*
* @module  controllers/UserInfo
*/

'use strict';

// HINT: do not put all require statements at the top of the file
// unless you really need them for all functions

/**
* Description of the function
*
* @return {String} The string 'myFunction'
*/
// var myFunction = function(){
//     return 'myFunction';
// }

/* Exports of the controller */
///**
// * @see {@link module:controllers/UserInfo~myFunction} */
//exports.MyFunction = myFunction;
var Transaction = require('dw/system/Transaction');
var CustomObjectMgr=require('dw/object/CustomObjectMgr');
var app = require('~/cartridge/scripts/app');
var guard = require('~/cartridge/scripts/guard');
var Resource = require('dw/web/Resource');
var URLUtils = require('dw/web/URLUtils');

function registerUser(){
	app.getForm('userinfo').clearFormElement();
	
	app.getView({
        ContinueURL: URLUtils.https('UserInfo-FormRegister')
    }).render('userinfo');
}

function formRegister(){
	app.getForm('userinfo').handleAction({
		confirm:function(formgroup){
			var email=formgroup.email.value;
			var name=formgroup.name.value;
			var country=formgroup.country.value;
			
			Transaction.wrap(function(){
				var info=CustomObjectMgr.createCustomObject("emailOptFor", email);
				info.custom.name=name;
				info.custom.country=country;
			});
			
			app.getView({
                ContinueURL: URLUtils.https('UserInfo-FormRegister')
            }).render('userinfo');
		}
	});
}

exports.RegisterUser = guard.ensure(['get'], registerUser);

exports.FormRegister = guard.ensure(['post'], formRegister);

