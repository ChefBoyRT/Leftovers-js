const BASE_URL = 'http://localhost:3000'
const USERS_URL = `${BASE_URL}/users/`
const WASTES_URL = `${BASE_URL}/wastes/`

const $body = document.body
const addFoodForm = document.querySelector('.add-food-form')
const cardContainer = document.createElement('div')
const user_id = 1

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
    let foodName = document.createElement('h3')
    let expirationDate = document.createElement('p')
    let daysToExpiration = document.createElement('p')
    let quantity = document.createElement('p')
    let value = document.createElement('p')
    let deleteButton = document.createElement('button')
    let updateButton = document.createElement('button')

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

    wasteCard.append(foodName, daysToExpiration, quantity, value, deleteButton, updateButton)
    cardContainer.appendChild(wasteCard)

    wasteCard.classList.add("waste-card")
    cardContainer.classList.add("card-container")

    $body.append(cardContainer)
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