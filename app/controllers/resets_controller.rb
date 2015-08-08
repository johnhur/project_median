class ResetsController < ApplicationController

  def new
  end

  def create
      user = User.find_by(email: params[:email])
      if user
        user.generate_password_reset_token!

        Reset.password_reset(user).deliver_now
        
        redirect_to login_path, notice: "Email sent"

      else
        flash.now[:alert] = "Email not found"
        render :new
      end
   end

   def edit
     @user = User.find_by(password_reset_token: params[:id])
     if @user
       # feels like we are missing something here
       # but, have no fear, we are just going to render edit.html.erb
     else
       redirect_to login_path, alert: "Invalid reset token"
     end
   end

   def update
     @user = User.find_by(password_reset_token: params[:id])
     if params[:user][:password].present?
       if @user && @user.update(user_params)
         @user.update(password_reset_token: nil)
         session[:user_id] = @user.id
         redirect_to root_path, flash: {success: "Password updated."}
       else
         flash.now[:notice] = "Password reset token not found."
         render :edit
       end
     else
       flash.now[:alert] = "Please enter a password"
       render :edit
     end
   end

   private
   def user_params
     params.require(:user).permit(:password, :password_reset_token)
   end

end
