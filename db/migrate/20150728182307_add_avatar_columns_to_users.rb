class AddAvatarColumnsToUsers < ActiveRecord::Migration
  def up
  	add_attachment :users, :avatar
  end

end
