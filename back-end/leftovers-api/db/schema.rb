# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_09_020843) do

  create_table "disposalmethods", force: :cascade do |t|
    t.string "name"
  end

  create_table "disposalreasons", force: :cascade do |t|
    t.string "name"
  end

  create_table "foodcategories", force: :cascade do |t|
    t.string "name"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "password"
    t.string "email"
  end

  create_table "wastes", force: :cascade do |t|
    t.string "name"
    t.date "expirationdate"
    t.float "quantity"
    t.float "value"
    t.integer "user_id"
    t.integer "disposalmethod_id"
    t.integer "disposalreason_id"
    t.integer "foodcategory_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["disposalmethod_id"], name: "index_wastes_on_disposalmethod_id"
    t.index ["disposalreason_id"], name: "index_wastes_on_disposalreason_id"
    t.index ["foodcategory_id"], name: "index_wastes_on_foodcategory_id"
    t.index ["user_id"], name: "index_wastes_on_user_id"
  end

end
