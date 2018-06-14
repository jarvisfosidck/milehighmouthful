// JavaScript Document


function basicREST(id, data,callback) {

	var request = new XMLHttpRequest();
	request.open("POST", "requestHandler.php");
	//request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onload = function(oEvent) {
		if (request.status == 200) {
		  if (callback) {
			  //console.log(request.responseText);
			  callback(request);
		  }
		} else {
		  console.log("error",request);
		}
	}
	request.send(data);

}
function basicGET(path,callback) {	
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", callback);
	oReq.open("GET", path);
	oReq.send();
}
