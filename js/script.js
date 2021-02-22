/** @format */

const gallery = document.querySelector('#gallery');

//Get data from API
async function getData() {
  const apiUrl = 'https://randomuser.me/api/?results=12&format=Json';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    let dataResults = data.results;

    for (let i = 0; i < dataResults.length; i++) {
      gallery.insertAdjacentHTML(
        'beforeend',
        `
        <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${dataResults[i].picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${dataResults[i].name.first} ${dataResults[i].name.last}</h3>
            <p class="card-text">${dataResults[i].email}</p>
            <p class="card-text cap city">${dataResults[i].location.city}, ${dataResults[i].location.state}</p>
        </div>`
      );
    }
  } catch (error) {
    console.log('something went wrong', error);
  }
}
// on Load
getData();
