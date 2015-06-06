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

	   alert("line:"+lineNumber+","+errorMessage);

	   return false;
}


function OnDeviceReadyComplete(){
	
	onDeviceReadyToDealWithAccele();
	OnCamera();
	OnCompass();
	OnNetConnect();
	OnDeviceP();
	OnGeolocation();
	OnNotification();
	OnContact();
	OnAppBrowser();
	OnDB();
	OnStorage();
}

function OnStorage(){



      $("#saveItem").on("click", saveItem);  
      $("#getItem").on("click", getItem);  
      $("#deleteItem").on("click", deleteItem);  

  
    function saveItem() {  
      alert('saveItem');  
      window.localStorage.setItem($('#key').val(), $('#val').val());  
    }  
    function getItem() {  
      alert('getItem');  
      var item_value = window.localStorage.getItem($('#key').val());  
      alert(item_value);  
    }  
    function deleteItem() {  
      alert('deleteItem');  
      window.localStorage.removeItem($('#key').val());  
    }  

}

function OnDB(){

	var db;  
  
    
      $("#saveToDatabase").on("click", saveToDatabase);  
      $("#getFromDatabase").on("click", getFromDatabase);  
  
      db = window.openDatabase("MyDatabase", "1.0", "Cordova Sample", 200000);  
      db.transaction(function(tx) {  
          tx.executeSql('DROP TABLE IF EXISTS MyTable');  
          tx.executeSql('CREATE TABLE IF NOT EXISTS MyTable (id unique, data)');  
        },   
        function(err) {  
          alert("Error processing SQL: " + err.code);  
        });  
     
  
    function saveToDatabase() {  
      alert('saveToDatabase');  
  
      db.transaction(function(tx) {  
        tx.executeSql("INSERT INTO MyTable (id, data) VALUES (?, ?)",  
                      [$('#id').val(), $('#data').val()],  
                      function(tx, rs) {  
                          alert("Your SQLite query was successful!");  
                      },  
                      function(tx, e) {  
                          alert("SQLite Error: " + e.message);  
                      });  
      });  
    }  
    function getFromDatabase() {  
      alert('getFromDatabase');  
  
      db.transaction(function(tx) {  
        tx.executeSql("SELECT id,data FROM MyTable ORDER BY id",  
                      [],  
                      function (tx, rs) {  
                          for (var i = 0; i < rs.rows.length; i++) {  
                              alert(rs.rows.item(i).id + "=" + rs.rows.item(i).data);  
                          }  
                      },  
                      function(tx, e) {  
                          alert("SQLite Error: " + e.message);  
                      });  
      });  
    } 

}

function OnAppBrowser(){

      $("#openURL").on("click", openURL);  
    
  
    function openURL() {  
      alert('openURL');  
  
      var ref = window.open($('#url').val(), '_blank', 'location=yes');  
      ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });  
      ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });  
      ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });  
      ref.addEventListener('exit', function(event) { alert(event.type); });  
    }  

}

function OnFile(){

      $("#writeToFile").on("click", writeToFile);  
      $("#readFile").on("click", readFile);  
      $("#deleteFile").on("click", deleteFile);  
    
  
    function writeToFile() {  
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSForWrite, fail);  
    }  
    function gotFSForWrite(fileSystem) {  
      fileSystem.root.getFile("CordovaSample.txt", {create: true, exclusive: false}, gotWriteFileEntry, fail);  
    }  
    function gotWriteFileEntry(fileEntry) {  
      fileEntry.createWriter(gotFileWriter, fail);  
    }  
    function gotFileWriter(writer) {  
     var userText = $('#userInput').val();  
     writer.seek(writer.length);  
     writer.write('\n\n' + userText);  
     writer.onwriteend = function(evt){  
       alert("You wrote ' " + userText + " ' at the end of the file.");  
     }   
     $('#userInput').val("");  
    }  
  
    function readFile() {  
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSForRead, fail);  
    }  
    function gotFSForRead(fileSystem) {  
      fileSystem.root.getFile("CordovaSample.txt", null, gotReadFileEntry, fail);  
    }  
    function gotReadFileEntry(fileEntry) {  
      fileEntry.file(gotFileRead, fail);  
    }  
    function gotFileRead(file){  
      readDataUrl(file);  
      readAsText(file);  
    }  
    function readDataUrl(file) {  
      var reader = new FileReader();  
      reader.onloadend = function(evt) {  
        var element = document.getElementById('data1');  
        element.innerHTML = '<strong>Read as data URL:</strong> <br><pre>' + evt.target.result + '</pre>';  
      };  
      reader.readAsDataURL(file);  
    }  
    function readAsText(file) {  
      var reader = new FileReader();  
      reader.onloadend = function(evt) {  
        var element = document.getElementById('data2');  
        element.innerHTML = '<strong>Read as data text:</strong> <br><pre>' + evt.target.result + '</pre>';  
      };  
      reader.readAsText(file);  
    }  
  
    function deleteFile() {  
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSForRemove, fail);  
    }  
    function gotFSForRemove(fileSystem) {  
      fileSystem.root.getFile("CordovaSample.txt", {create: false, exclusive: false}, gotRemoveFileEntry, fail);  
    }  
    function gotRemoveFileEntry(fileEntry){  
      fileEntry.remove(  
        function(entry) {  
          alert("Removal succeeded");  
        },   
        function(error) {  
          alert("Error removing file: " + error.code);  
      });  
    }  
  
    function fail(error) {  
      alert(error.code);  
    }  

}

function OnContact(){



      $("#saveContacts").on("click", saveContacts);  

  
    function saveContacts() {  
      alert('saveContacts');  
  
      if (!navigator.contacts) {  
          alert("Contacts API not supported", "Error");  
          return;  
      }  
      var contact = navigator.contacts.create();  
      var name = new ContactName();  
      name.givenName = $('#fname').val();  
      name.familyName = $('#lname').val();  
      contact.name = name;  
      contact.displayName = $('#fname').val() + " " + $('#lname').val();  
      contact.emails = [new ContactField('home', $('#email').val(), false)];  
      contact.phoneNumbers = [new ContactField('home', $('#tel').val(), false)];  
      contact.save(  
        function() {  
          alert("OK!");  
        },  
        function() {  
          alert("Error!");  
        }  
      );  
    } 

}


function OnNotification(){

	  var watchGeoID = null;  
  
      $("#showAlert").on("click", showAlert);  
      $("#showConfirm").on("click", showConfirm);  
      $("#showPrompt").on("click", showPrompt);  
      $("#playBeep").on("click", playBeep);  
      $("#vibrate").on("click", vibrate);  

  
    function showAlert() {  
      navigator.notification.alert(  
        'Alert dialog: You are on fire!',  
        alertDismissed, //callback  
        'Game Over',  
        'Done'  
      );  
    }  
    /*  
    // Override default HTML alert with native dialog  
    document.addEventListener('deviceready', function () {  
        if (navigator.notification) {   
            window.alert = function (message) {  
                navigator.notification.alert(  
                    message,  
                    null,  
                    "My App",  
                    'OK'  
                );  
            };  
        }  
    }, false);  
    */  
    function alertDismissed() {  
      alert('You dismissed the Alert.');  
    }  
    function onConfirm(buttonIndex) {  
      alert('You selected button ' + buttonIndex + '\n(button 1 = Restart, button 2 = Exit.)');  
    }  
    function showConfirm() {  
      navigator.notification.confirm(  
        'Confirm dialog: You are the winner!',  
        onConfirm,  
        'Game Over',  
        ['Restart','Exit']  
      );  
    }  
    function onPrompt(results) {  
      alert("You selected button number " + results.buttonIndex + " and entered " + results.input1 + '\n(button 2 = Exit, button 1 = OK.)');  
    }  
    function showPrompt() {  
      navigator.notification.prompt(  
        'Please enter your name',  
        onPrompt,  
        'Registration',  
        ['Ok','Exit'],  
        'Jane Doe?'  
      );  
    }  
    function playBeep() {  
      navigator.notification.beep(3);  
    }  
    function vibrate() {  
      navigator.notification.vibrate(2000);  
    }  

}

function OnGeolocation(){

	 var watchGeoID = null;  
   
      $("#startGeolocationg").on("click", startGeolocationg);  
      $("#stopGeolocationg").on("click", stopGeolocationg);  
      $("#getCurrentPosition").on("click", getCurrentPosition);  

  
    function startGeolocationg() {  
      alert('startGeolocationg');  
      var element = document.getElementById('geovals');  
      element.innerHTML = 'Finding geolocation every 30 seconds...'  
      var options = { enableHighAccuracy: true, timeout: 30000 };  
      watchGeoID = navigator.geolocation.watchPosition(onGeoSuccess, onGeoError, options);  
    }  
  
    function onGeoSuccess(position) {  
      var element = document.getElementById('geovals');  
      element.innerHTML =   
      '<strong>Latitude:</strong> ' + position.coords.latitude + '<br />' +  
      '<strong>Longitude: </strong> ' + position.coords.longitude + ' <br />' +  
      '<strong>Altitude</strong> (in meters): ' + position.coords.altitude + ' <br />' +  
      '<strong>Accuracy</strong> (in meters): ' + position.coords.accuracy + ' <br />' +  
      '<strong>Altitude Accuracy:</strong> ' + position.coords.altitudeAccuracy + ' <br />' +  
      '<strong>Heading</strong> (direction of travel): ' + position.coords.heading + ' <br />' +  
      '<strong>Speed</strong> (meters per second): ' + position.coords.speed + ' <br />' +  
      '<strong>Timestamp:</strong> ' + position.timestamp + ' <br />';  
    }  
    function onGeoError(error) {  
      var element = document.getElementById('geovals');  
      element.innerHTML =+ '<br>' + error.code + error.message;  
    }  
  
    function stopGeolocationg() {  
      alert('stopGeolocationg');  
  
      var element = document.getElementById('geovals');  
      element.innerHTML = '<span style="color:red">Geolocation turned off.</span>';  
      if (watchGeoID) {  
        navigator.geolocation.clearWatch(watchGeoID);  
        watchGeoID = null;  
      }  
    }  
  
    function getCurrentPosition() {  
      alert('getCurrentPosition');  
      navigator.geolocation.getCurrentPosition(onPositionSuccess, onPositionError);  
    }  
    function onPositionSuccess(position) {  
      var element = document.getElementById('geovals');  
      element.innerHTML =+ ('Latitude: ' + position.coords.latitude + '\n' +   
                            'Longitude: ' + position.coords.longitude + '\n');   
    };  
    function onPositionError(error) {  
      var element = document.getElementById('geovals');  
      element.innerHTML =+('Error getting GPS Data');  
    }  

}

function OnDeviceP(){


$("#getDeviceProperties").on("click", getDeviceProperties);

function getDeviceProperties() {  
       alert("getDeviceProperties");  
  
       var element = document.getElementById('deviceProperties');  
       element.innerHTML = 'Device Model (Android: product name): ' + device.model + '<br />' +  
       'Cordova version: ' + device.cordova + '<br />' +  
       'Operating system: ' + device.platform + '<br />' +  
       'Device UUID: ' + device.uuid + '<br />' +  
       'Operating system version: ' + device.version + '<br />';  
    }  

}

function OnNetConnect(){

  $("#checkConnection").on("click", checkConnection);  

 function checkConnection() {  
      alert("checkConnection");  
  
      var networkState = navigator.connection.type;  
      var states = {};  
      states[Connection.UNKNOWN] = 'Unknown connection';  
      states[Connection.ETHERNET] = 'Ethernet connection';  
      states[Connection.WIFI] = 'WiFi connection';  
      states[Connection.CELL_2G] = 'Cell 2G connection';  
      states[Connection.CELL_3G] = 'Cell 3G connection';  
      states[Connection.CELL_4G] = 'Cell 4G connection';  
      states[Connection.CELL] = 'Cell generic connection';  
      states[Connection.NONE] = 'No network connection';  
  
      var element = document.getElementById('connectiontype');  
      element.innerHTML = 'Connection type: ' + states[networkState];  
    }  

}

function OnCompass(){
	
	  $("#startWatchCompass").on("click", startWatchCompass);  
      $("#stopWatchCompass").on("click", stopWatchCompass);  

	 function startWatchCompass() {  
      alert("startWatchCompass");  
  
      var options = { frequency: 3000 };  
      watchIDCompass = navigator.compass.watchHeading(onCompassSuccess, onCompassError, options);  
    }  
    function stopWatchCompass() {  
      alert("stopWatchCompass");  
  
      if (watchIDCompass) {  
        navigator.compass.clearWatchCompass(watchIDCompass);  
        watchIDCompass = null;  
      }  
    }  
    function onCompassSuccess(heading) {  
     var element = document.getElementById('heading');  
      element.innerHTML = 'Current Heading: ' + (heading.magneticHeading).toFixed(2);  
    }  
    function onCompassError(compassError) {  
      alert('Compass error: ' + compassError.code);  
    } 

}

function OnCamera() {
	
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