class CreateDisposalreasons < ActiveRecord::Migration[5.2]
  def change
    create_table :disposalreasons do |t|
      t.string :name

    end
  end
end
