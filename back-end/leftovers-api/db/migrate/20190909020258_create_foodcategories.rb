class CreateFoodcategories < ActiveRecord::Migration[5.2]
  def change
    create_table :foodcategories do |t|
      t.string :name

    end
  end
end
