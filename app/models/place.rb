class Place < ActiveRecord::Base
# before_action :self.new_place
	
	validates :business_name, presence: true

	has_many :favorites, dependent: :destroy
	has_many :users, through: :favorites

	has_many :comments, dependent: :destroy
	has_many :users, through: :comments

	# def new_place_search (location, business, num)
	# 	@new_yelp_search.search(location, business, num)
	# end 


	# def self.new_place
	# 	# @new_yelp = Yelp::Client.new({ consumer_key: Rails.application.secrets[:YELP_CONSUMER_KEY],
 #  #                           consumer_secret: Rails.application.secrets[:YELP_CONSUMER_SECRET],
 #  #                           token: Rails.application.secrets[:YELP_TOKEN],
 #  #                           token_secret: Rails.application.secrets[:YELP_TOKEN_SECRET]
 #  #                        })
	# end 
end
