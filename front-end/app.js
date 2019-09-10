const BASE_URL = 'http://localhost:3000'
const USERS_URL = `${BASE_URL}/users/`
const WASTES_URL = `${BASE_URL}/wastes/`

const $body = document.body
const $main = document.querySelector('main')
const cardsDiv = document.querySelector('#cardsDiv')
const addFoodForm = document.querySelector('.add-food-form')
const updateFoodForm = document.querySelector('.update-food-form')
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
    // debugger
    let wasteCard = document.createElement('div')
    let foodName = document.createElement('h5')
    let expirationDate = document.createElement('p')
    let daysToExpiration = document.createElement('p')
    let quantity = document.createElement('p')
    let value = document.createElement('p')
    let deleteButton = document.createElement('button')
    let updateButton = document.createElement('button')
    let buttons = document.createElement('div')
    let cardHeader = document.createElement('div')

    foodName.textContent = waste.food_name
    expirationDate.textContent = waste.expiration_date
    daysToExpiration.textContent = dateDifference(waste.expiration_date) + ' days'
    quantity.textContent = `${waste.quantity} ${waste.quantity_unit}`
    value.textContent = `$${waste.value}`
    deleteButton.textContent = 'Delete'
    updateButton.textContent = 'Update'
    
    deleteButton.id = waste.id
    updateButton.id = waste.id

    addDeleteEvent(deleteButton)
    addUpdateEvent(updateButton, waste)

    buttons.append(updateButton, deleteButton)
    cardHeader.append(foodName)
    wasteCard.append(cardHeader, daysToExpiration, quantity, value, buttons)
    cardContainer.appendChild(wasteCard)

    wasteCard.classList.add("waste-card")
    cardContainer.classList.add("card-container")
    deleteButton.classList.add('delete-button')
    updateButton.classList.add('update-button')
    buttons.classList.add('waste-card-buttons')
    cardHeader.classList.add('waste-card-header')

    cardsDiv.append(cardContainer)
}

function dateDifference(expirationDate) {
    let todaysDate = new Date(Date.now()).toLocaleString().split(', ')[0]
    let splitTodaysDate = todaysDate.split('/')
    let todaysDay = parseInt(splitTodaysDate[1], 10)
    let todaysMonth = parseInt(splitTodaysDate[0], 10)
    let todaysYear = parseInt(splitTodaysDate[2], 0)

    let splitExpirationDate = expirationDate.split('-')
    let expirationDay = parseInt(splitExpirationDate[2], 10)
    let expirationMonth = parseInt(splitExpirationDate[1], 10)
    let expirationYear = parseInt(splitExpirationDate[0])
    
    let daysToExpiration = (expirationDay - todaysDay) + ((expirationMonth - todaysMonth) * 30) + ((expirationYear - todaysYear))
    daysToExpiration * -1

    return daysToExpiration
}

function addDeleteEvent(button, waste) {
    button.addEventListener('click', event => {
        deleteWaste(button.id, button)
        deleteWasteElement(button)
    })
}

function addUpdateEvent(button, waste) {
    // debugger
    button.addEventListener('click', event => {
        updateFoodForm.id = waste.id
        updateFoodForm.classList.remove('hidden')
        addFoodForm.classList.add('hidden')
        updateFoodForm[0].value = waste.food_name
        updateFoodForm[1].value = waste.expiration_date
        updateFoodForm[2].value = waste.quantity
        updateFoodForm[3].value = waste.quantity_unit
        updateFoodForm[4].value = waste.value
        updateFoodForm[5].value = waste.food_category.name
    })
}

function updateWaste() {
    let formData = new FormData(updateFoodForm)
    let foodName = formData.get('food-name')
    let expirationDate = formData.get('expiration-date')
    let quantity = parseFloat(formData.get('quantity'), 10)
    let quantityUnit = formData.get('unit')
    let foodCategory = formData.get('foodcategory')
    let cost = parseFloat(formData.get('cost'), 10)
    let id = parseInt(event.target.id)
    
    fetch(`${WASTES_URL}${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            name: foodName,
            expirationdate: expirationDate,
            quantity: quantity,
            quantity_unit: quantityUnit,
            user_id: user_id,
            foodcategory_id: foodCategory,
            value: cost
        })
    }).then(response => response.json())
    .then(response => console.log(response))

    updateFoodForm.classList.add('hidden')
    addFoodForm.classList.remove('hidden')
}

addFoodForm.addEventListener('submit', addFoodWaste)
updateFoodForm.addEventListener('submit', updateWaste)

function addFoodWaste() {
    let formData = new FormData(addFoodForm)
    let foodName = formData.get('food-name')
    let expirationDate = formData.get('expiration-date')
    let quantity = parseFloat(formData.get('quantity'), 10)
    let quantity_unit = formData.get('unit')
    let foodCategory = formData.get('foodcategory')
    let cost = parseFloat(formData.get('cost'), 10)

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
            quantity_unit: quantity_unit,
            user_id: user_id,
            foodcategory_id: foodCategory,
            value: cost
        })
    })

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