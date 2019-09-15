const BASE_URL = 'http://localhost:3000'
const USERS_URL = `${BASE_URL}/users/`
const WASTES_URL = `${BASE_URL}/wastes/`

const $body = document.body
const $main = document.querySelector('main')
const cardsDiv = document.querySelector('#cardsDiv')
const addFoodForm = document.querySelector('.add-food-form')
const updateFoodForm = document.querySelector('.update-food-form')
const logInForm = document.querySelector('.login-form')
const cardContainer = document.createElement('div')
const dummyCard = document.createElement('div')

function userShowPage() {
    logInForm.classList.add('hidden')
}

function fetchUser() {
    let formData = new FormData(logInForm)
    let email = formData.get('email')
    let password = formData.get('password')
    let name = "blank"

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    }).then(response => response.json())
    .then(getUserWastes)
}

function getUserWastes(num) {
    userShowPage()
    fetch(`${USERS_URL}${num}`)
        .then(response => response.json())
        .then(showData)
}

function showData(wastes) {
    wastes.forEach(createWasteCard)
}

function createWasteCard(waste) {
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
    let cardInfo = document.createElement('div')

    foodName.textContent = waste.food_name
    expirationDate.textContent = waste.expiration_date
    daysToExpiration.textContent = dateDifference(waste.expiration_date) + ' days'
    quantity.textContent = `${waste.quantity} ${waste.quantity_unit}`
    value.textContent = `$${waste.value}`
    deleteButton.textContent = 'Delete'
    updateButton.textContent = 'Update'

    dummyCard.textContent = "+"
    
    deleteButton.id = waste.id
    updateButton.id = waste.id
    cardInfo.id = waste.user_id + waste.id
    addFoodForm.id = waste.user_id

    addDeleteEvent(deleteButton)
    addUpdateEvent(updateButton, waste)

    wasteCard.classList.add("waste-card")
    dummyCard.classList.add("waste-card")
    dummyCard.classList.add("dummy-card")
    cardContainer.classList.add("card-container")
    deleteButton.classList.add('delete-button')
    updateButton.classList.add('update-button')
    buttons.classList.add('waste-card-buttons')
    cardHeader.classList.add('waste-card-header')
    dynamicCardColors(cardHeader, daysToExpiration)
    cardInfo.classList.add('waste-card-info')
    foodName.classList.add('food-name')
    daysToExpiration.classList.add('days-to-expiration')
    quantity.classList.add('quantity')
    value.classList.add('value')

    buttons.append(updateButton, deleteButton)
    cardHeader.append(foodName)
    cardInfo.append(daysToExpiration, quantity, value, buttons)
    wasteCard.append(cardHeader, cardInfo)
    cardContainer.append(wasteCard)
    cardContainer.prepend(dummyCard)

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
        updateFoodForm[6].value = waste.user_id
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
    let user_id = formData.get('user_id')
    debugger
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
    .then(waste => renderUpdatedWasteCard(waste))
}

function renderUpdatedWasteCard(waste) {
    elementId = parseInt(waste.user_id) + parseInt(waste.id)
    let card = document.getElementById(elementId) 
    card.parentElement.querySelector('h5').innerText = waste.name
    card.querySelector('.days-to-expiration').innerText = dateDifference(waste.expirationdate) + ' days'
    card.querySelector('.quantity').innerText = `${waste.quantity} ${waste.quantity_unit}`
    card.querySelector('.value').innerText = `$${waste.value}`
    
    updateFoodForm.classList.add('hidden')
}

function addFoodWaste() {
    let formData = new FormData(addFoodForm)
    let foodName = formData.get('food-name')
    let expirationDate = formData.get('expiration-date')
    let quantity = parseFloat(formData.get('quantity'), 10)
    let quantity_unit = formData.get('unit')
    let foodCategory = formData.get('foodcategory')
    let cost = parseFloat(formData.get('cost'), 10)
    let user_id = parseInt(addFoodForm.id, 10)

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
    }).then(response => response.json())
    .then(waste => renderWasteCard(waste))
    addFoodForm.classList.add('hidden')
}

function renderWasteCard(waste) {
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
        let cardInfo = document.createElement('div')
        
        foodName.textContent = waste.name
        expirationDate.textContent = waste.expirationdate
        daysToExpiration.textContent = dateDifference(waste.expirationdate) + ' days'
        quantity.textContent = `${waste.quantity} ${waste.quantity_unit}`
        value.textContent = `$${waste.value}`
        deleteButton.textContent = 'Delete'
        updateButton.textContent = 'Update'
        
        deleteButton.id = waste.id
        updateButton.id = waste.id
        cardInfo.id = waste.user_id
        addFoodForm.id = waste.user_id
    
        addDeleteEvent(deleteButton)
        addUpdateEvent(updateButton, waste)
    
        buttons.append(updateButton, deleteButton)
        cardHeader.append(foodName)
        cardInfo.append(daysToExpiration, quantity, value, buttons)
        wasteCard.append(cardHeader, cardInfo)
        cardContainer.append(wasteCard)
    
    
        wasteCard.classList.add("waste-card")
        cardContainer.classList.add("card-container")
        deleteButton.classList.add('delete-button')
        updateButton.classList.add('update-button')
        buttons.classList.add('waste-card-buttons')
        dynamicCardColors(cardHeader, daysToExpiration)
        cardInfo.classList.add('waste-card-info')
        foodName.classList.add('food-name')
        daysToExpiration.classList.add('days-to-expiration')
        quantity.classList.add('quantity')
        value.classList.add('value')
    
        cardsDiv.append(cardContainer)
}

function deleteWasteElement(element) {
    element.parentElement.parentElement.parentElement.remove()
}

function deleteWaste(id) {
    let config = {
        method: 'DELETE',
        body: JSON.stringify({
            waste_id: id
        })
    }
    fetch(WASTES_URL + `${id}`, config)
}

function dynamicCardColors(element, daysToExpiration) {
    splitDay = daysToExpiration.textContent.split(' ')[0]
    daysInt = parseInt(splitDay)
    
    if (daysInt <= 3) {
        element.classList.add('waste-card-header-red')
        element.classList.add('food-name')
    } else if (daysInt >= 4 && daysInt < 7) {
        element.classList.add('waste-card-header-yellow')
        element.classList.add('food-name')
    } else {
        element.classList.add('waste-card-header-green')
        element.classList.add('food-name')
    }
}

addFoodForm.addEventListener('submit', event => {
    event.preventDefault()
    addFoodWaste()
})
updateFoodForm.addEventListener('submit', event => {
    event.preventDefault()
    updateWaste()
})
logInForm.addEventListener('submit', event => {
    event.preventDefault()
    fetchUser()
})

dummyCard.addEventListener('click', event => {
    event.preventDefault()
    addFoodForm.reset()
    addFoodForm.classList.remove('hidden')
})