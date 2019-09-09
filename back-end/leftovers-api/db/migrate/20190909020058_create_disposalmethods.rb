class CreateDisposalmethods < ActiveRecord::Migration[5.2]
  def change
    create_table :disposalmethods do |t|
      t.string :name

    end
  end
end
