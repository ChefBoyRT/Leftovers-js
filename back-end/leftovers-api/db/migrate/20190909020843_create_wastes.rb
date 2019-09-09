class CreateWastes < ActiveRecord::Migration[5.2]
  def change
    create_table :wastes do |t|
      t.string :name
      t.date :expirationdate
      t.float :quantity
      t.float :value
      t.references :user, foreign_key: true
      t.references :disposalmethod, foreign_key: true
      t.references :disposalreason, foreign_key: true
      t.references :foodcategory, foreign_key: true

      t.timestamps
    end
  end
end
