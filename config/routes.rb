Rails.application.routes.draw do

  root 'sessions#login'
  get '/login', to: "sessions#login", as: 'login'
  post '/login', to: "sessions#attempt_login"
  delete '/logout', to: "sessions#logout", as: "logout"

  # password reset routes
  resources :resets, only: [:new, :edit, :create, :update]

	# root 'users#index'

  resources :users
  resources :places

  get '/search', to: 'places#search'
  # the AJAX get request from the user.js file is looking for
  # the results action here
  get '/results', to: 'places#results'
  get '/friends', to: 'users#friends'
end

# Prefix Verb   URI Pattern                Controller#Action
#       root GET    /                          sessions#login
#      login GET    /login(.:format)           sessions#login
#            POST   /login(.:format)           sessions#attempt_login
#     logout DELETE /logout(.:format)          sessions#logout
#     resets POST   /resets(.:format)          resets#create
#  new_reset GET    /resets/new(.:format)      resets#new
# edit_reset GET    /resets/:id/edit(.:format) resets#edit
#      reset PATCH  /resets/:id(.:format)      resets#update
#            PUT    /resets/:id(.:format)      resets#update
#      users GET    /users(.:format)           users#index
#            POST   /users(.:format)           users#create
#   new_user GET    /users/new(.:format)       users#new
#  edit_user GET    /users/:id/edit(.:format)  users#edit
#       user GET    /users/:id(.:format)       users#show
#            PATCH  /users/:id(.:format)       users#update
#            PUT    /users/:id(.:format)       users#update
#            DELETE /users/:id(.:format)       users#destroy
#     places GET    /places(.:format)          places#index
#            POST   /places(.:format)          places#create
#  new_place GET    /places/new(.:format)      places#new
# edit_place GET    /places/:id/edit(.:format) places#edit
#      place GET    /places/:id(.:format)      places#show
#            PATCH  /places/:id(.:format)      places#update
#            PUT    /places/:id(.:format)      places#update
#            DELETE /places/:id(.:format)      places#destroy
#     search GET    /search(.:format)          places#search
#    results GET    /results(.:format)         places#results
#    friends GET    /friends(.:format)         users#friends
