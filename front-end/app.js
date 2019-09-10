const BASE_URL = 'http://localhost:3000'
const USERS_URL = `${BASE_URL}/users/`
const WASTES_URL = `${BASE_URL}/wastes/`

const $body = document.body
const addFoodForm = document.querySelector('.add-food-form')
const cardContainer = document.createElement('div')
const user_id = 3

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
    deleteButton.id = waste.id

    addDeleteEvent(deleteButton)

    wasteCard.append(foodName, expirationDate, quantity, deleteButton)
    cardContainer.appendChild(wasteCard)

    wasteCard.classList.add("waste-card")
    cardContainer.classList.add("card-container")

    $body.append(cardContainer)
}

function addDeleteEvent(button) {
    button.addEventListener('click', event => {
        deleteWaste(button.id, button)
        deleteWasteElement(button)
    })
}

addFoodForm.addEventListener('submit', addFoodWaste)

function addFoodWaste() {
    let formData = new FormData(addFoodForm)
    let foodName = formData.get('food-name')
    let expirationDate = formData.get('expiration-date')
    let quantity = parseInt(formData.get('quantity'), 10)
    let foodCategory = formData.get('foodcategory')

    // debugger

    fetch(WASTES_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: foodName,
            expirationdate: expirationDate,
            quantity: quantity,
            user_id: user_id,
            foodcategory_id: foodCategory
        })
    })
    // let foodName = 

}

function deleteWasteElement(element) {
    element.parentElement.remove()
}

function deleteWaste(id, button) {
    let config = {
        method: 'DELETE',
        body: JSON.stringify({
            waste_id: id
        })
    }
    fetch(WASTES_URL + `${id}`, config)
}


getUserWastes()