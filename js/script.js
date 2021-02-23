/** @format */
const gallery = document.querySelector('#gallery');

// Used an async await + fetch function + try catch to get the data asyncronously from the API
async function getData() {
  try {
    const apiUrl = 'https://randomuser.me/api/?results=12';
    const response = await fetch(apiUrl);
    data = await response.json();
    const employees = data.results;
    employees.forEach(createGalleryAndModal);

    function createGalleryAndModal(employee, index) {
      newGallery(employee, index);
      newModal(employee);
    }
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

// function to add employees into the gallery
function newGallery(data, index) {
  //card snippet
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
  $date_regex =
    '/(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)dd/';

  let birthday = data.dob.date;
  birthdayformat = birthday.replace($date_regex, '');
  const modal = `
    <div class="modal" > 
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${data.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${data.location.city}</p>
                <hr>
                <p class="modal-text">${data.phone}</p>
                <p class="modal-text">${data.location.street.number} ${data.location.street.name} ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
                <p class="modal-text">Birthday: ${birthdayformat}</p>
            </div>
            </div>
        </div>`;

  modalContainer.insertAdjacentHTML('beforeend', modal);
  const Modal = modalContainer.lastElementChild;

  Modal.style.display = 'none';

  const button = Modal.querySelector('.modal-close-btn');

  button.addEventListener('click', () => {
    Modal.style.display = 'none';
    modalContainer.style.display = 'none';
  });
}
