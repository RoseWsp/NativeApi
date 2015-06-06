/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {

       console.log("错误信息：" , errorMessage);
       console.log("出错文件：" , scriptURI);
       console.log("出错行号：" , lineNumber);
       console.log("出错列号：" , columnNumber);
       console.log("错误详情：" , errorObj);

	   alert(errorMessage);

	   return false;
}


function OnDeviceReadyComplete(){
	
	onDeviceReadyToDealWithAccele();
	Camera();


}

function Camera(){
	
	var pictureSource= null;
	var destinationType = null;

	pictureSource = navigator.camera.PictureSourceType; 
	destinationType = navigator.camera.DestinationType;  
	

	$("#capturePhoto").on("click", capturePhoto);  
    $("#browsePhoto").on("click", browsePhoto);  

	function capturePhoto() {  
      alert("capturePhoto");  
  
      if (!navigator.camera) {  
          alert("Camera API not supported", "Error");  
          return;  
      }  
      navigator.camera.getPicture(onPhotoDataSuccess, onFail,   
          { quality: 50,   
            allowEdit: true,   
            destinationType: destinationType.DATA_URL });  
    }  
  
    function browsePhoto() {  
      alert("browsePhoto");  
  
      navigator.camera.getPicture(onPhotoURISuccess, onFail,   
          { quality: 50,  
            destinationType: destinationType.FILE_URI,  
            sourceType: pictureSource.PHOTOLIBRARY });  
    }  
    //sourceType 0:Photo Library, 1=Camera, 2=Saved Album  
    //encodingType 0=JPG 1=PNG  
  
    function onFail(message) {  
      alert('Response: ' + message);  
    }  
  
    function onPhotoDataSuccess(imageData) {  
      var smallImage = document.getElementById('smallImage');  
      smallImage.style.display = 'block';  
      smallImage.src = "data:image/jpeg;base64," + imageData;  
    }  
  
    function onPhotoURISuccess(imageURI) {  
      var largeImage = document.getElementById('largeImage');  
      largeImage.style.display = 'block';  
      largeImage.src = imageURI;  
    }

}

function onDeviceReadyToDealWithAccele() {  

		  $("#startWatch").on("click", startWatch);  
		  $("#stopWatch").on("click", stopWatch);  
		  $("#startWatchOrientation").on("click", startWatchOrientation);  
		  $("#stopWatchOrientation").on("click", stopWatchOrientation);  
			
		  var watchID = null;
		  function startWatch() {  
		  alert("startWatch");  
	  
		  var options = { frequency: 3000 };  
		  watchID = navigator.accelerometer.watchAcceleration(onAccelSuccess, onAccelError, options);  
		}  
	  
		function stopWatch() {  
		  alert("stopWatch");  
	  
		  if (watchID) {  
			navigator.accelerometer.clearWatch(watchID);  
			watchID = null;  
		  }  
		}
		function onAccelSuccess(acceleration) {  
		  var element = document.getElementById('accvals');  
		  element.innerHTML = '<strong>Accel X:</strong> ' + acceleration.x.toFixed(1) * -1 + '<br />' +  
							  '<strong>Accel Y:</strong> ' + acceleration.y.toFixed(1) + '<br />' +  
							  '<strong>Accel Z:</strong> ' + acceleration.z.toFixed(1) + '<br />' +  
							  '<strong>Timestamp:</strong> ' + acceleration.timestamp + '<br />';  
		}  
	  
		function onAccelError() {  
		  alert('Could not Retrieve Accelerometer Data!');  
		}  
	  
		function deviceOrientationEvent(eventData) {  
		  var alpha = Math.round(eventData.alpha);  
		  var beta = Math.round(eventData.beta);  
		  var gamma = Math.round(eventData.gamma);  
		  var element = document.getElementById('orivals');  
		  element.innerHTML = ("alpha = " + alpha + " beta = " + beta + " gamma = " + gamma);  
		}  
		function startWatchOrientation() {  
		  alert("startWatchOrientation");  
		  window.addEventListener('deviceorientation', deviceOrientationEvent);  
		}  
		function stopWatchOrientation() {  
		  alert("stopWatchOrientation");  
		  window.removeEventListener('deviceorientation', deviceOrientationEvent);  
		}  
    } 
	
    

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', OnDeviceReadyComplete, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();