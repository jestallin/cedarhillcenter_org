
function GetResponse(url, Response)
{

    if(navigator.appName == "Microsoft Internet Explorer")
    {
	    var xhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
	else
	{
        var xhttp = new XMLHttpRequest();
    }
	xhttp.open("GET", url, true);
	
	xhttp.onreadystatechange = 
	function() 
	{
		if (xhttp.readyState == 4 && xhttp.responseText) 
		{
			validateResponse(xhttp);
			Response(xhttp.responseXML);
		}
	}
	xhttp.send(null);
}

function validateResponse(xhttp)
{
	if(xhttp.status != 200)
	{
		throw "Some error occured while receiving data from server. Please try again";
	}
}
