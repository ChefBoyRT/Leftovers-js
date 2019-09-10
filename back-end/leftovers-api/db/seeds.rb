# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Waste.destroy_all
Disposalmethod.destroy_all
Disposalreason.destroy_all
Foodcategory.destroy_all
User.destroy_all

trash = Disposalmethod.create(name: 'Trash')
composte = Disposalmethod.create(name: 'Composte')
donated = Disposalmethod.create(name: 'Donated')
given_to_friend = Disposalmethod.create(name: 'Given To Friend')
blank = Disposalmethod.create(name: 'blank')

expired = Disposalreason.create(name: 'Expired')
spoiled = Disposalreason.create(name: 'Expired')
over_produced = Disposalreason.create(name: 'Over Produced')
blank = Disposalreason.create(name: 'blank')

vegetable = Foodcategory.create(name: 'Vegetable')
legume = Foodcategory.create(name: 'Legume')
dry_good = Foodcategory.create(name: 'Dry Good')
red_meat = Foodcategory.create(name: 'Red Meat')
fish = Foodcategory.create(name: 'Fish')
shellfish = Foodcategory.create(name: 'Shellfish')
pork = Foodcategory.create(name: 'Pork')
poultry = Foodcategory.create(name: 'Poultry')
blank = Foodcategory.create(name: 'blank')

user1 = User.create(
                    name: 'Taylor', 
                    password: 'password', 
                    email:'stein0209@gmail.com'
                    )
user2 = User.create(
                    name: 'Roux', 
                    password: 'password', 
                    email:'roux@gmail.com'
                    )


waste1 = Waste.create(
                      name: 'Romaine Lettuce', 
                      expirationdate: Date.new(2019, 9, 8), 
                      quantity: 2, 
                      quantity_unit: 'lbs',
                      value: 3.50, 
                      user_id: user1.id, 
                      disposalmethod_id: trash.id, 
                      disposalreason_id: expired.id, 
                      foodcategory_id: vegetable.id
                      )

waste2 = Waste.create(
                      name: 'Ground Burger', 
                      expirationdate: Date.new(2019, 9, 7), 
                      quantity: 1.5, 
                      quantity_unit: 'oz',
                      value: 5.25, 
                      user_id: user1.id, 
                      disposalmethod_id: donated.id, 
                      disposalreason_id: spoiled.id, 
                      foodcategory_id: red_meat.id
                      )