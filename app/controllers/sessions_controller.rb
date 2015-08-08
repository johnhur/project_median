class SessionsController < ApplicationController

  def login

  end

  def attempt_login
  	if params[:email].present? && params[:password].present?
  	  found_user = User.where(email: params[:email]).first

  	  if found_user && found_user.authenticate(params[:password])
        found_user.update(lat: params[:user_lat])
        found_user.update(lng: params[:user_lng])
        session[:user_id] = nil
  	    session[:user_id] = found_user.id
  	    redirect_to users_path
  	  else
  	    flash[:alert] = "email / password combination is invalid!"
  	    redirect_to login_path(@user)
  	  end
  	else
  	  flash[:alert] = "please enter username and password"
  	  redirect_to login_path
  	end
  end

  def logout
    current_user.update(lat: nil)
    current_user.update(lng: nil)
  	session[:user_id] = nil
  	flash[:notice] = "Logged out"
  	redirect_to login_path
  end

end
