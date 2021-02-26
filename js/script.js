/** @format */

const gallery = document.querySelector('#gallery');
// Used an async await + fetch function + try catch to get the data asyncronously from the API
async function getData() {
  try {
    const apiUrl = 'https://randomuser.me/api/?results=12&nat=us'; // Added requirement for API results to only come from the US for phone number formating from
    const response = await fetch(apiUrl);
    data = await response.json();
    const employees = data.results;
    employees.forEach(createGalleryAndModal);

    // looping through all 12 results from the API preparing to display them on screen dynamically
    function createGalleryAndModal(employee, index) {
      newGallery(employee, index);
      newModal(employee);
    }
    // error statement in case there is a problem with the API results
  } catch (error) {
    console.log('something went wrong', error);
  }
}
getData();

// dynamicaly creating modal html
const modal = document.createElement('div');
modal.className = 'modal-container';
modal.style.display = 'none';
document.body.append(modal);
const modalContainer = document.querySelector('.modal-container');

// adding employees into the gallery from the data I looped through earlier
function newGallery(data, index) {
  const card = `
  <div class="card">
  <div class="card-img-container">

      <img class="card-img" src="${data.picture.large}" alt="profile picture">
  </div>
  <div class="card-info-container">
      <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
      <p class="card-text">${data.email}</p>
      <p class="card-text cap city">${data.location.city}, ${data.location.state}</p>
  </div>`;

  gallery.insertAdjacentHTML('beforeend', card);

  const cards = document.querySelectorAll('.card');
  cards[index].addEventListener('click', (e) => {
    let modalArray = document.querySelectorAll('.modal');
    modalArray[index].style.display = '';
    modalContainer.style.display = '';
  });
}

// function to create new modal
function newModal(data) {
  // reformating phon results using REGEX
  let phone = data.phone;
  phone = phone
    .replace(/\D+/g, '')
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

  // reformating Birthday results by splitting the date results into three parts
  let days = data.dob.date.substring(8, 10);
  let months = data.dob.date.substring(5, 7);
  let years = data.dob.date.substring(0, 4);

  const modal = `
    <div class="modal" > 
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${data.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${data.location.city}</p>
                <hr>
                <p class="modal-text">${phone}</p>
                <p class="modal-text">${data.location.street.number} ${data.location.street.name} ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
                <p class="modal-text">Birthday: ${months}/${days}/${years}</p>
            </div>
            </div>
        </div>`;

  modalContainer.insertAdjacentHTML('beforeend', modal);
  const Modal = modalContainer.lastElementChild;
  Modal.style.display = 'none';

  // button to close modal
  const button = Modal.querySelector('.modal-close-btn');
  button.addEventListener('click', () => {
    Modal.style.display = 'none';
    modalContainer.style.display = 'none';
  });
}
