<?php
//-- POST are variables from details.js
$names 		= $_POST['names'];
$address1 	= $_POST['address1'];
$address2 	= $_POST['address2'];
$crust 		= $_POST['crust'];

//-- clean up the javascript array
$toppings 	= str_replace('"','',substr(substr(stripslashes($_POST['toppings']),1),0,-1));
$toppings	= explode(",\n", $toppings);

//-- Where the order will be sent
$to = "youremail@yourserver.com";
$subject = "Pizza Order!";
$message = "A new order has been submitted.<br/>";
$message .= $names . "<br/>";
$message .= $address1 . "<br/>";
$message .= $address2 . "<br/><br/>";
$message .= $crust . " pizza with:<br/>";


$message .= "<ul>";
if (strlen($toppings[0]) == 1)
{
	$message .= "<li>Plain (cheese pizza)</li>";
}
else
{
	for ($i = 0; $i < count($toppings); $i++)
	{
		$message .= "<li>" . $toppings[$i] . "</li>";
	}
}
$message .= "</ul>";

//-- The headers will let us send HTML code as an email
$headers = "From: noreply@thepizzaplace.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

//-- if mail gets sent, return true, else return false. This gets handed off the our onload method in details.js
if (mail($to,$subject,$message,$headers))
{
	$response = array('mail' => true);
}
else
{
	$response = array('mail' => false);
}

echo json_encode($response);
?>