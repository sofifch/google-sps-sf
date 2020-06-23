// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['I speak English, French and Spanish!', 'I was born in Venezuela', 'I dont like fruits'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

function getMessage() {
    getBlobstoreUrl();
    fetch('/data').then(response => response.json()).then((fullList) => {
        const commentsListElement = document.getElementById('message-container');
        const urlsListElement = document.getElementById('image-container');
        urlsListElement.innerHTML = '';
        commentsListElement.innerHTML = '';
        var messageList = fullList[0];
        var urlList = fullList[1];
        for (i = 0; i < messageList.length; i++) {
            commentsListElement.appendChild(createListElement(messageList[i]));
        }
        for (j = 0; j < urlList.length; j++) {
            if (urlList[j] == null) {
                continue;
            }
            var div = document.createElement('div');
            div.setAttribute('class', 'gallery');
            urlsListElement.appendChild(div);
            var myImage = document.createElement('img');
            myImage.src = urlList[j];
            myImage.width = 600;
            myImage.height = 400;
            div.appendChild(myImage);            
        }
    });
}

function getBlobstoreUrl() {
    fetch('/blobstore-url').then((response) => {
        return response.text();
    })
    .then((imageUploadUrl) => {
        const myForm = document.getElementById('sofifch-form');
        myForm.action = imageUploadUrl;
        myForm.classList.remove('hidden');
      });
}

function createListElement(text) {
  const element = document.createElement('li');
  element.innerText = text;
  return element;
}

function required(inputtx) {
    if (inputtx.value.length == 0) { 
        alert("No input!");  	
        return false; 
    }  	
    return true; 
} 
