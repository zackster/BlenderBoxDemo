class CreateStates < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.string :bodybg
      t.integer :widgetcount

      t.timestamps
    end
  end
end
