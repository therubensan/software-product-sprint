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

  console.log(object[0]);
  console.log(object[1]);
  console.log(object[2]);

  list.innerHTML = '';
  list.appendChild(createListElement(object[0]));
  list.appendChild(createListElement(object[1]));
  list.appendChild(createListElement(object[2]));
}

function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}