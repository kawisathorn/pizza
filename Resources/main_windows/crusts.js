var win 			= Ti.UI.currentWindow;

//-- Our crust views
var handMade 		= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/crust/hand.png'});
var natural 		= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/crust/natural.png'});
var panCrust 		= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/crust/pan.png'});
var stuffedCrust 	= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/crust/stuffedCrust.png'});
var thinNCrispy 	= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/crust/thinNcrispy.png'});
var returnCrust;

//-- Crust reference
var crusts			= [
			{title:'Hand Made',path:'../images/crust/hand.png'},
			{title:'Natural',path:'../images/crust/natural.png'},
			{title:'Pan Crust',path:'../images/crust/pan.png'},
			{title:'Stuffed Crust',path:'../images/crust/stuffedCrust.png'},
			{title:'Thin N Crispy Crust',path:'../images/crust/thinNcrispy.png'}
];

//-- Our scroll view that contains our crust views
var scrollView = Ti.UI.createScrollableView({
	views:[handMade,natural,panCrust,stuffedCrust,thinNCrispy],
	showPagingControl:true,
	clipViews:false,
	top:180,
	left:30,
	right:30,
	height:180,
	opacity:0
});

//-- If the window has the crust property, that means we are coming from the toppings window so choose the last know selected crust
if (win.crust)
{
	for (i = 0; i < crusts.length; i++)
	{
		if (win.crust == crusts[i].title)
		{
			returnCrust = i;
			break;
		}
	}
	scrollView.scrollToView(returnCrust);
}

//-- Crust title
var crustTitle = Ti.UI.createLabel({
	text:'1. Choose a crust',
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

//-- Crust title background
var crustTitleView = Ti.UI.createView({
	width:328,
	height:58,
	backgroundImage:'../images/crustHeaderBg.png',
	top:100,
	left:-6,
	opacity:0
});
crustTitleView.add(crustTitle);

//-- Crust type label
var crustType = Ti.UI.createLabel({
	text:'Hand Made',
	font:{
		fontFamily:'Verdana',
		fontWeight:'bold',
		fontSize:16
	},
	color:'#fff',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1},
	textAlign:'center',
	width:Ti.Platform.displayCaps.platformWidth,
	height:20,
	top:170,
	opacity:0
});

//-- if returnCrust isn't null, set the crust type label
if (returnCrust != null)
{
	crustType.text = crusts[returnCrust].title;
}

//-- Next Button
var next = Ti.UI.createButton({
	width:137,
	height:75,
	backgroundImage:'../images/toppings_next.png',
	top:385,
	opacity:0
});

//-- If android OS, use the image property instead of backgroundImage (Ti SDK bug)
if (Ti.Platform.osname == 'android')
{
	next.image = '../images/toppings_next.png';
}

next.addEventListener('click',function(e){
	Ti.App.fireEvent('toppings',{
			crust:crusts[scrollView.currentPage].title,
			path:crusts[scrollView.currentPage].path
	});
});

win.add(scrollView);
win.add(crustTitleView);
win.add(crustType);
win.add(next);


//-- Fade the scrollview in
scrollView.animate({
	opacity:1,
	duration:500
});

//-- Fade the crust title in
crustTitleView.animate({
	opacity:1,
	duration:500
});

crustType.animate({
	opacity:1,
	duration:500
});

//-- Fade the next button in
next.animate({
	opacity:1,
	duration:500
});

//-- Changes the crust type label text when the user scrolls
scrollView.addEventListener('scroll',function(){
	crustType.text = crusts[scrollView.currentPage].title;
});


