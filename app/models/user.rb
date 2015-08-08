class User < ActiveRecord::Base

	# removed validates password because has_secure_password does this for you
	validates :email, presence: true
	
	# we will add in additional validations later on
	
	# added avatar information 
	has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>"}, :default_url => "/images/:style/missing.png" 
	# validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*Z/
	validates_attachment :avatar, :content_type => { :content_type => ["image/jpeg", "image/gif", "image/png"] }

	has_many :favorites, dependent: :destroy
	has_many :places, through: :favorites

	has_many :comments, dependent: :destroy
	has_many :places, through: :comments

	has_secure_password

	def generate_password_reset_token!
	   update(password_reset_token: SecureRandom.urlsafe_base64(48))
	end

end
