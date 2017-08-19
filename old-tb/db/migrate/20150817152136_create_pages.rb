class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages, id: false do |t|
      t.string :id, null: false
      t.string :title
      t.text :content

      t.timestamps null: false
    end

    add_index :pages, :id, unique: true
  end
end
