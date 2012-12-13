var win 			= Ti.UI.currentWindow;

//-- Create the sub windows
var crusts 			= Ti.UI.createWindow();
var toppings 		= Ti.UI.createWindow();
var details			= Ti.UI.createWindow();

//-- We set the background here since this wont change
win.backgroundImage = '../images/bg_main.png';

//-- Include our clock
Ti.include('../includes/clock.js');

//-- This method will close the crusts/details window and open the toppings window
function openToppings(e)
{
	if (e.toppings)
	{
		details.close();
	}
	else
	{
		crusts.close();
	}

	toppings.url 			= 'toppings.js';
	toppings.crust 			= e.crust;
	toppings.path			= e.path;
	toppings.returnToppings = e.toppings;
	
	toppings.open();
}

//-- The method will close the toppings window and open the crusts window
function openCrust(e)
{
	toppings.close();
	//-- If the event has a crust property, that means the user hit cancel once in the toppings window
	if (e.crust)
	{
		crusts.crust = e.crust;
	}
	crusts.url = 'crusts.js';
	crusts.open();
}

//-- This method will close the toppings window and open the details window
function openDetails(e)
{
	toppings.close();
	
	details.crust 		= e.crust;
	details.path		= e.path;
	details.toppings 	= e.toppings;
	details.url 		= 'details.js';
	
	details.open();
}

//-- This gets called after an order is submitted. It basically starts the app over.
function resetApp()
{
	details.close();
	openCrust({});
}

//-- Have our app listen for our custom events
Ti.App.addEventListener('toppings',openToppings);
Ti.App.addEventListener('cancelToppings',openCrust);
Ti.App.addEventListener('details',openDetails);
Ti.App.addEventListener('cancelDetails',openToppings);
Ti.App.addEventListener('resetApp',resetApp);


//-- First launch, open the crust window with an empty object
openCrust({});