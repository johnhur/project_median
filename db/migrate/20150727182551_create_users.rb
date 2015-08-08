class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :email
      t.string :img_url
      t.string :address
      t.string :password
      t.string :password_digest

      t.timestamps null: false
    end
  end
end
