/** @format */

const gallery = document.querySelector('#gallery');
const modalContainer = document.querySelector('.modal-container');
let dataResults;
//Get data from API
async function getData(data) {
  const apiUrl = 'https://randomuser.me/api/?results=12&format=Json';
  try {
    const response = await fetch(apiUrl);
    data = await response.json();
    dataResults = data.results;
    console.log(dataResults);
    function displayGallery(data) {
      dataResults.forEach((data) => {
        gallery.innerHTML += `
                    <div class="card">
                    <div class="card-img-container">
                  
                        <img class="card-img" src="${data.picture.large}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                        <p class="card-text">${data.email}</p>
                        <p class="card-text cap city">${data.location.city}, ${data.location.state}</p>
                    </div>`;
      });
      const modalInfo = document.querySelector('.modal-info-container');
      // Reset the modal content after .modal-info-container
      modalInfo.innerHTML = '';
      // InsertCardInfo() function creates and inserts html and interpolated data
      function InsertCardInfo() {
        let updateHTML = `
        <img class="modal-img" src="${employeeObject[cardItem].picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${employeeObject[cardItem].name.title} ${employeeObject[cardItem].name.first} ${employeeObject[cardItem].name.last}</h3>
        <p class="modal-text">${employeeObject[cardItem].email}</p>
        <p class="modal-text cap">${employeeObject[cardItem].location.country}</p>
        <hr>
        <p class="modal-text">Phone: ${employeeObject[cardItem].phone}</p>
        <p class="modal-text"> ${employeeObject[cardItem].location.city}, 
        ${employeeObject[cardItem].location.state} ${employeeObject[cardItem].location.postcode}</p>
        <p class="modal-text">Birthday: ${employeeObject[cardItem].dob.date}</p>`;

        modalInfo.insertAdjacentHTML('afterBegin', updateHTML);
      }
      InsertCardInfo();
    }

    displayGallery();
  } catch (error) {
    console.log('something went wrong', error);
  }
}

// on Load
getData();
