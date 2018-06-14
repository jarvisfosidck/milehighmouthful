
		"use strict";
	
	var fileDnD = function() {
		
		this.addPostFilesUploaded = [];

		this.dropImageUpload = function(event) {
			
		  var dt = event.dataTransfer;
		  var files = dt.files;
		  this.processFileUpload(files);
		 
		
		}
		this.processFileUpload = function(files) {
			//console.log(files);
			 var count = files.length;
			 
			 var el = this._config.dropArea;
			 
			for (var i = 0; i < files.length; i++) {
				this.addPostFilesUploaded.push(files[i]);
				
				var img = document.createElement("img");
				img.classList.add("obj");
				img.file = files[i];
				el.appendChild(img);
				
				
				var reader = new FileReader();
				reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
				reader.readAsDataURL(files[i]);
				
			
			}
			el.className = el.className.replace(/\s?dragEnter/g,'');
		}
		this.getFiles = function() {
			return this.addPostFilesUploaded;
		}
		this.setElementEvents = function(_config) {
		
			this._config = _config;	
			var that = this;
			_config.hiddenInput.addEventListener("change", function() {
				
				that.addPostFilesUploaded.push(this.files);
				that.processFileUpload(this.files);
				
			}, false);//hidden element for upload with click and not drag drop
			_config.dropArea.addEventListener("dragenter", function(event) {
				event.stopPropagation()
				event.preventDefault()
				event.target.className += ' dragEnter';
				
			}, false);
			
			_config.dropArea.addEventListener("dragleave", function(event) {
				event.stopPropagation()
				event.preventDefault();
				console.log(event.target);
				event.target.className = event.target.className.replace(/\s?dragEnter/g,'')
				
			}, false);
			
			_config.dropArea.addEventListener("dragover", function(event) {
				event.stopPropagation()
				event.preventDefault()		
			}, false);
			_config.dropArea.addEventListener("drop", function(event) {
				event.stopPropagation()
				event.preventDefault()
				that.dropImageUpload(event);
				
			}, false);
			
			
			_config.hiddenInput.addEventListener("dragenter", function(event) {
				event.stopPropagation()
				event.preventDefault()
				
			}, false);
			_config.hiddenInput.addEventListener("dragover", function(event) {
				event.stopPropagation()
				event.preventDefault()
				
			}, false);
			_config.displayButton.addEventListener("click", function(event) {
				_config.hiddenInput.click();
				event.preventDefault();
				event.stopPropagation();
				
			}, false);
		}
	}