
Yelp.client.configure do |config|
  config.consumer_key = ENV['YELP_CONSUMER_KEY']
  config.consumer_secret = ENV['YELP_CONSUMER_SECRET']
  config.token = ENV['YELP_TOKEN']
  config.token_secret = ENV['YELP_TOKEN_SECRET']
end

#comment this out when deploying  
#Rails.application.secrets

# test 1
# Yelp.client.configure do |config|
#   config.consumer_key = ENV[:YELP_CONSUMER_KEY]
#   config.consumer_secret = ENV[:YELP_CONSUMER_SECRET]
#   config.token = ENV[:YELP_TOKEN]
#   config.token_secret = ENV[:YELP_TOKEN_SECRET]

#   #Rails.application.secrets
# end

# test 2
# Yelp.client.configure do |config|
#   config.consumer_key = YELP_CONSUMER_KEY
#   config.consumer_secret = YELP_CONSUMER_SECRET
#   config.token = YELP_TOKEN
#   config.token_secret = YELP_TOKEN_SECRET
# end

# test 3
# Yelp.client.configure do |config|
#   config.consumer_key = ENV['YELP_CONSUMER_KEY']
#   config.consumer_secret = ENV['YELP_CONSUMER_SECRET']
#   config.token = ENV['YELP_TOKEN']
#   config.token_secret = ENV['YELP_TOKEN_SECRET']
# end