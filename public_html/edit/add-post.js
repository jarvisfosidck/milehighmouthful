	"use strict"

	/*
	*
	* helper functions for encoding, from MDN.org
	* 
	*/
	
	function utf8_to_b64(str) {
    return window.btoa(encodeURIComponent(str));
	}
	
	function b64_to_utf8(str) {
		return decodeURIComponent(window.atob(str));
	}
	


	/*
	*
	* helper functions for emjio icon text click
	* If you click an emoji it takes the input text plus the Icon and adds to Post
	*/
	(function() {
		'use strict'
		var icons = document.getElementById('emojitextwrapper').querySelectorAll("i.fa");
		for (var i=0,len=icons.length;i<len;i++) {
			
			icons[i].addEventListener("click", function (e) {  
			
			var txel = document.getElementById('emojitext');
			var putSpace = document.getElementById('emojiMouthfulBlurgs');
			
			var htmlStr = '<p class="bottomMouthfulIcons"><i class="'+this.className+'"></i> '+txel.value+'</p>';
			
			putSpace.innerHTML = htmlStr;
	
			}, false);
		}
	})();
	
	

	/*
	*
	* Define all elements that click
	* matches to ID and add the click listern
	* 
	*/

function assignClicksLocal() {

	var addPostClickItems = [
	
	
	"paragraphToggle"
	
	,"HTMLToggle"
	
	,"addParagraphControl"
	,"imageDropBucketArea"//drag drop area
	,"addAnotherImage"
	,"heartsSelected"//hidden input integar value of heart scale
	,"heartsdown" //decrament heart scale
	,"heartsup" //increase heart scale
	] //div wrapper click on element inserts that emoji
	
	for (var i=0,len=addPostClickItems.length;i<len;i++) {
		if(angular.isDefined(addPostClickItems[i])) {
			addPostClickItems[i] = document.getElementById(addPostClickItems[i]);
			
			addPostClickItems[i].addEventListener("click", function (e) { 
				handleClicksEvents.call(this,e);
			});
		}
	
	}
	defineFileDragandDrop();
} assignClicksLocal();
	/*
	*
	* Define the object that saves our data
	* used by the angular.js
	* 
	*/
	
	
var jsonPostModel = {
	
	"postTitle" : "" //text
	,"postDisplayDate" : "" //text or timestamp
	,"postSubTitle" : "" //text
	,"paragraphSingleArea" : "" //html
	,"imageUploadFiles" : fileDnD1.addPostFilesUploaded //image collection
	,"heartsSelected" : "" //integar 
	,"emojiMouthfulBlurgs" : "" //html
	,"resturantWebsite" : ""
	,"resturantNeighborHood" : ""
	
}


	/*
	*
	* Define a function to Delegate all the clicks
	* 
	* 
	*/
	
	
	function handleClicksEvents(evt) {
		
		var el = this;
		var target = evt.target;
//		console.log(this,evt,target.id,this.id);
		
		var id = this.id = "" ? target.id : this.id;
		/*not a great way to do this, has to do with way the click bubbles up DOM, works for now*/
		
		//console.log(el);
		switch (id) {
		
		

			case "deleteThisPost" :
			console.log(id); 
			 evt.preventDefault();
			 evt.stopPropagation();
			 deleteThisPost(el,evt);
			 break;

			case "saveThisPost" : 
			 saveThisPost(el,evt); 
			 break;

			case "paragraphToggle" : 
			 paragraphToggle(el,evt); 
			 break;

			case "HTMLToggle" : 
			 HTMLToggle(el,evt); 
			 break;

			case "addParagraphControl" : 
			
			 addParagraphControl(el,evt); 
			 break;

			/*case "addAnotherImage" : 
			 addAnotherImage(el,evt);
			 evt.preventDefault();
			 evt.stopPropagation();
			 break;
			 */

			case "heartsdown" : 
			 heartsdown(el,evt); 
			 break;
 
			case "heartsup" : 
			 heartsup(el,evt); 
			 break;
			
		}
		
		
	}


	/*
	*
	* Helper Function for the click 
	* Delegation Controllers
	* 
	*/
function processParagraphs() {

	var str = "";
	var p = document.getElementById("paragraphSingleArea");
	var elms = p.querySelectorAll("textarea");
	if (!elms) {
		return document.getElementById("paragraphSingleArea").innerHTML;
	} else {
		
		for (var i=0,len=elms.length;i<len;i++) {
			
			str += "<p>"+elms[i].value+"</p>";	
			
		}
		return str;
	}
	
}
		

	/*
	*
	* Define a function for the various click functions
	* Generally function name = element ID
	* 
	*/
	
function deleteThisPost (el,evt) {

var optionValue = document.getElementById("editPostSelectOption").value;
	

	var formData = new FormData();
	formData.append("id", "deletePostFromAddPostPage");
	formData.append("indexToDelete",optionValue);
	
	document.getElementsByTagName('body')[0].style.opacity = 0.3;

	
basicREST('deletePostFromAddPostPage',formData,function() {
	
	document.getElementsByTagName('body')[0].style.opacity = 1;
	window.location = "add-post.html";
	
	
	
});



}

function saveThisPost (el,evt) {

var jsonPostModel = {
	
	"postTitle" : document.getElementById("postTitle").value //text
	,"postDisplayDate" : document.getElementById("postDisplayDate").value //text or timestamp
	,"postSubTitle" : document.getElementById("postSubTitle").value //text
	,"paragraphSingleArea" : processParagraphs() //html
	//,"imageUploadFiles" : addPostFilesUploaded //image collection
	,"heartsSelected" : document.querySelector("#bottomStarIcons label").innerHTML //html 
	,"emojiMouthfulBlurgs" : document.getElementById("emojiMouthfulBlurgs").innerHTML //html
	,"resturantWebsite" : document.getElementById("resturantWebsite").value
	,"resturantNeighborHood" : document.getElementById("resturantNeighborHood").value
	
}

	var data = JSON.stringify(jsonPostModel);

	var formData = new FormData();
	formData.append("dataObject", utf8_to_b64(data));
	//console.log(jsonPostModel,window.btoa(data));
	for (var i=0,len=fileDnD1.addPostFilesUploaded.length;i<len;i++) {
		var fname = "image"+String(i);
		formData.append(fname, fileDnD1.addPostFilesUploaded[i]);	
	}
	
	formData.append("id","updatePostFromAddPostPage");
	
	document.getElementsByTagName('body')[0].style.opacity = 0.3;
	
basicREST.call(this,'saveNewPost',formData,function() {
	
	document.getElementsByTagName('body')[0].style.opacity = 1;
	window.location = "add-post.html";
	
	
	
});



}







/*
*
*
* The follow functions will be directives on the loaded
* HTML for post Edits
*
*
*/



function paragraphToggle (el,evt) {

//console.log(evt, 'wow, works', el);

	var p = document.getElementById("paragraphSingleArea");
	var c = p.querySelectorAll("p");
	for (var i=0,len=c.length;i<len;i++) {
			var ne = document.createElement("textarea");
			ne.value = c[i].innerHTML;
			p.replaceChild(ne,c[i]);
		
	}


}

function HTMLToggle (el,evt) {
	var p = document.getElementById("paragraphSingleArea");
	var c = p.querySelectorAll("textarea");
	
	for (var i=0,len=c.length;i<len;i++) {
		
			var ne = document.createElement("P");
			console.log(c[i]);
			ne.innerHTML = c[i].value;
			p.contentEditable=true;
			p.replaceChild(ne,c[i]);
		
	}


}

function addParagraphControl (el,evt) {

	var p = document.getElementById("paragraphSingleArea");
	var ta = document.createElement("textarea");
	p.appendChild(ta);

}

function heartsdown (el,evt) {

	var v = document.getElementById("heartsSelected");
	var val = parseInt(v.value,10);
	var hs = document.querySelectorAll("#bottomStarIcons label i");
	var p = document.querySelector("#bottomStarIcons label");
	for (var i=0,len=hs.length;i<len;i++) {
		p.removeChild(hs[i]);
	}
	var cnt=0, dcnt=(val-1);
	if (dcnt < 0) {
		dcnt = 0;
	}else if (dcnt > 6) {
		dcnt = 6;
	}
	while (cnt < 6) {
		var ne = document.createElement("i");
		if (dcnt <= cnt) {
			ne.className = "fa fa-heart-o";
		} else {
			ne.className = "fa fa-heart";
		}
		p.appendChild(ne);
		cnt++;	
	}
	v.value = dcnt;

}
 
function heartsup (el,evt) {

var v = document.getElementById("heartsSelected");
	var val = parseInt(v.value,10);
	var hs = document.querySelectorAll("#bottomStarIcons label i");
	var p = document.querySelector("#bottomStarIcons label");
	for (var i=0,len=hs.length;i<len;i++) {
		p.removeChild(hs[i]);
	}
	var cnt=0, dcnt=(val+1);
	if (dcnt < 0) {
		dcnt = 0;
	}else if (dcnt > 6) {
		dcnt = 6;
	}
	while (cnt < 6) {
		var ne = document.createElement("i");
		console.log(dcnt);
		if (dcnt <= cnt) {
			ne.className = "fa fa-heart-o";
		} else {
			ne.className = "fa fa-heart";
		}
		p.appendChild(ne);
		cnt++;	
	}
	v.value = dcnt;
	
}



	