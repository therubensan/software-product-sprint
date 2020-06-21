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

async function loadComments() {
  const response = await fetch('/data');
  const object = await response.json();
  const list = document.getElementById('comments');
  list.innerHTML = " ";
  var i = 0; 
  for (i = 0; i < object.length; i++) {
    list.append(createListElement(object[i]));
  }
}

function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}

async function getLoginStatus() {
  const response = await fetch('/login');
  const status = await response.text();
  document.getElementById('login').innerText = status;
} 