var win 		= Ti.UI.currentWindow;
var orderReq 	= Titanium.Network.createHTTPClient();

//-- Name Text Field
var names = Titanium.UI.createTextField({
	color:'#336699',
	top:100,
	left:10,
	width:300,
	height:40,
	hintText:'Name',
	backgroundImage:'../images/textfield.png',
	paddingLeft:8,
	paddingRight:8,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_NEXT,
	suppressReturn:false
});

//-- Address1 Text Field
var address1 = Titanium.UI.createTextField({
	color:'#336699',
	top:140,
	left:10,
	width:300,
	height:40,
	hintText:'Address 1',
	backgroundImage:'../images/textfield.png',
	paddingLeft:8,
	paddingRight:8,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_NEXT,
	suppressReturn:false
});

//-- Address2 Text Field
var address2 = Titanium.UI.createTextField({
	color:'#336699',
	top:180,
	left:10,
	width:300,
	height:40,
	hintText:'City, State, Zip Code',
	backgroundImage:'../images/textfield.png',
	paddingLeft:8,
	paddingRight:8,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});

//-- Listen for the next click on the key board
names.addEventListener('return',function(){address1.focus();});
address1.addEventListener('return',function(){address2.focus();});

win.add(names);
win.add(address1);
win.add(address2);

//-- This method makes a nice formatted summary of the users order
function getFormattedPizza()
{
	var text = win.crust + ' pizza with:\n';
	if (win.toppings.length == 0)
	{
		text += '• Plain (cheese pizza)\n';
	}
	else
	{
		for (var i = 0; i < win.toppings.length; i++)
		{
			text += '• ' + win.toppings[i] + '\n';
		}
	}
	return text;
}

//-- Are formatted text field
var pizzaInfoText = Ti.UI.createLabel({
	text:getFormattedPizza(),
	font:{
		fontFamily:'Verdana',
		fontSize:14
	},
	color:'#fff',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1},
	textAlign:'left',
	width:Ti.Platform.displayCaps.platformWidth,
	height:160,
	top:210,
	left:10
});
win.add(pizzaInfoText);

//-- Order Button
var order = Ti.UI.createButton({
	width:137,
	height:75,
	backgroundImage:'../images/order.png',
	top:385,
	left:165,
	opacity:0
});

//-- Cancel Button
var cancel = Ti.UI.createButton({
	width:137,
	height:75,
	backgroundImage:'../images/cancel.png',
	top:385,
	left:10,
	opacity:0
});

//-- If android OS, use the image property instead of backgroundImage (Ti SDK bug)
if (Ti.Platform.osname == 'android')
{
	order.image = '../images/order.png';
	cancel.image = '../images/cancel.png';
}
win.add(order);
win.add(cancel);

//-- Fade the order button in
order.animate({
	opacity:1,
	duration:500
});

//-- Fade the cancel button in
cancel.animate({
	opacity:1,
	duration:500
});

//-- Cancel button event. Goes back to the toppings window and remembers the users selections
cancel.addEventListener('click',function(){
	Ti.App.fireEvent('cancelDetails',{crust:win.crust,path:win.path,toppings:win.toppings});
});

//-- Submit order. Check if the text fields are blank
order.addEventListener('click',function(){
	if (names.value == '' || address1.value == '' || address2.value == '')
	{
		alert('All fields are required');
	}
	else
	{
		//-- Disable fields and buttons before making are http request
		names.enabled 		= false;
		address1.enabled 	= false;
		address2.enabled 	= false;
		order.enabled 		= false;
		cancel.enabled 		= false;
		//-- URL to submit_order.php
		orderReq.open('POST','http://localhost/submit_order.php');
		var params = {
			names: names.value,
			address1: address1.value,
			address2: address2.value,
			crust: win.crust,
			toppings: win.toppings
		};
		orderReq.send(params);
	}
});

//-- onLoad method for our http request
orderReq.onload = function()
{
	var json = this.responseText;
	var response = JSON.parse(json);
	
	//-- Mail was sent
	if (response.mail == true)
	{
		var alertDialog = Titanium.UI.createAlertDialog({
			title: 'Success',
			message: 'Your order has been submitted (check the email you used in your submit_order.php file)',
			buttonNames: ['OK']
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e)
		{
			Ti.App.fireEvent('resetApp');
		});	
	}
	else
	{
		//-- Mail failed
		alert("PHP failed to send the order to the email provided in submit_order.php. Are you sure you have a mail client on your server?");
		names.enabled 		= true;
		address1.enabled 	= true;
		address2.enabled 	= true;
		order.enabled 		= true;
		cancel.enabled 		= true;		
	}
};

//-- Network error
orderReq.onerror = function(event)
{
	alert('Network error: ' + JSON.stringify(event));
	names.enabled 		= true;
	address1.enabled 	= true;
	address2.enabled 	= true;
	order.enabled 		= true;
	cancel.enabled 		= true;
};