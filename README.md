# Leftovers
> A personal food waste tracker.

## Table of contents
* [General info](#general-info)
* [Intro Video](#intro-video)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)
* [License](#license)

## General info
Leftovers is a simple web application that helps users monitor and track food waste. Enter the ingredient name,
expiration date, quantity, and price. Leftovers will display the information on an easy to read card that calculates the 
amount of time in days until the expiration date. The card dynamically updates from green, yellow, to red as the ingredient 
approaches its expiration date to provide visual cues for users.

## Intro Video
[Leftovers on YouTube](https://www.youtube.com/watch?v=qxT1I0RSelE)

## Technologies
* HTML5
* CSS
* Javascript
* Ruby - version 2.6.1
* ActiveRecord - version 5.2
* SQLite3 - version 1.4

## Setup
To run this project, install it locally by cloning the GitHub repository and typing:
```ruby
rails db:create
rails db:migrate
rails s
```
```javascript
open index.html
run lite-server
```

## Code Examples
```javascript
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
```

```javascript
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
```

## Features
* View food waste cards
* Create food waste cards
* Update food waste cards

To-do list:
* Refactor “code smell”
* Add API functionality to return a recipe for food items approaching their expiration dates
* Add a waste table for users to historical waste statistics
* Display users waste statistics on a dashboard

## Status
Project is: finished with option to expand functionality and DRY out code.

## Inspiration
The inspiration for Leftovers comes from a personal goal to reduce my food waste footprint. I believe the first step to
reducing waste is to understand one's contribution to the problem. Providing users with data and a simple to use tracker
will help create awareness and empower users with a personal call to action.

## Contact
[Taylor Stein](www.linkedin.com/in/taylor-stein)

Feel free to contact me with any questions or suggestions for improvement!

## License
[Click to view]()
