class AddLngToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :lng, :decimal, {:precision=>10, :scale=>6, :default => nil}
  end
end
