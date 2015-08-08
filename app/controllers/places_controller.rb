class PlacesController < ApplicationController

	def index
	end

  # search is on same page as results, so only need one method
  def results
    # lat, lng, and term from user.js AJAX get request
    @lat = params[:lat]
    @long = params[:lng]
    term = params[:term]
    yelp_params = { term: term, limit: 5, offset: 5, sort: 1}
    coordinates = { latitude: @lat, longitude: @long }
    new_search = Yelp.client.search_by_coordinates(coordinates, yelp_params)
    # TODO - refactor into a separate function
    new_search.businesses.each do |business|
    	  result_name = business.name
          result_distance = business.distance
    	  result_address = business.location.address
    	  result_lat = business.location.coordinate.latitude
    	  result_long = business.location.coordinate.longitude
    	  # result_review = business.review_count
    	  # result_rating = business.rating
        end 
    render json: new_search
    
  end

  # private
  #   def client
  #      @client ||= Yelp::Client.new({ consumer_key: ENV['YELP_CONSUMER_KEY'],
  #       consumer_secret: ENV['YELP_CONSUMER_SECRET'],
  #       token: ENV['YELP_TOKEN_SECRET'],
  #       token_secret: ENV['YELP_TOKEN']
  #     })
    # end
    private
      def client
         @client ||= Yelp::Client.new({ consumer_key: ENV['config.consumer_key'],
          consumer_secret: ENV['config.consumer_secret'],
          token: ENV['config.token'],
          token_secret: ENV['config.token_secret']
        })
      end

end


    #term2 = params.require(:user).permit(:business_name)