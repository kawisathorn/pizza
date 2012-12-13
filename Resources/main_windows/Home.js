var win 			= Ti.UI.currentWindow;


//-- If the window has the crust property, that means we are coming from the toppings window so choose the last know selected crust
//-- Crust title
var introText = Ti.UI.createLabel({
	text:'Home',
	font:{
		fontFamily:'Verdana',
		fontWeight:'bold',
		fontSize:24
	},
	color:'#A90329',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1},
	textAlign:'left',
	width:Ti.Platform.displayCaps.platformWidth,
	height:58,
	left:10
});

win.add(introText) ;
