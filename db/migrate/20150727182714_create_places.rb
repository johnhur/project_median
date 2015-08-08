class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :business_name
      t.string :business_img_url

      t.timestamps null: false
    end
  end
end
