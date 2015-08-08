require 'rails_helper'

describe 'User' do
  subject(:user) { User.create(
                            first_name: "Fifi",
                            email: "example.com",
                            img_url: "me.png",
                            password: "secret"
                            )}

    [:first_name, :img_url, :email, :password].each do |prop|
        it {is_expected.to respond_to prop}
    end

    #This tests for uniqueness in the User model

    [:email].each do |prop|
    	it { is_expected.to validate_presence_of :email}
    end 

end


      # t.string :first_name
      # t.string :email
      # t.string :img_url
      # t.string :address
      # t.string :password
      # t.string :password_digest