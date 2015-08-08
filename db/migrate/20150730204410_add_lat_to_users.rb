class AddLatToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :lat, :decimal, {:precision=>10, :scale=>6, :default => nil}
  end
end
