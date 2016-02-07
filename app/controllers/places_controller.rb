class PlacesController < ApplicationController

	def index
	end

  # search is on same page as results, so only need one method
  def results
    # lat, lng, and term from user.js AJAX get request
    p params
    @lat = params[:lat]
    @long = params[:lng]
    term = params[:term]
    yelp_params = { term: term, limit: 5, sort: 1}
    coordinates = { latitude: @lat, longitude: @long }
    new_search = Yelp.client.search_by_coordinates(coordinates, yelp_params)
    # TODO - refactor into a separate function
    p new_search
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
end