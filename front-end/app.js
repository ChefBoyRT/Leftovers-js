const BASE_URL = 'http://localhost:3000'
const USERS_URL = `${BASE_URL}/users/`

const $body = document.body
const cardContainer = document.createElement('div')
let user_id = 3

function getUserWastes() {
    fetch(`${USERS_URL}${user_id}`)
        .then(response => response.json())
        .then(showData)
}

function showData(wastes) {
    wastes.forEach(createWasteCard)
}

function createWasteCard(waste) {
    let wasteCard = document.createElement('div')
    let foodName = document.createElement('h3')
    let expirationDate = document.createElement('p')
    let quantity = document.createElement('p')
    let deleteButton = document.createElement('button')

    foodName.textContent = waste.food_name
    expirationDate.textContent = waste.expiration_date
    quantity.textContent = waste.quantity
    deleteButton.textContent = 'Delete'

    addDeleteEvent(deleteButton)

    wasteCard.append(foodName, expirationDate, quantity, deleteButton)
    cardContainer.appendChild(wasteCard)

    wasteCard.classList.add("waste-card")
    cardContainer.classList.add("card-container")

    $body.append(cardContainer)
}

function addDeleteEvent(button) {
    button.addEventListener('click', function() {alert('Nailed It!')})
}

function deleteWaste() {

}


getUserWastes()