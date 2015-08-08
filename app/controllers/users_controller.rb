class UsersController < ApplicationController
  before_action :current_user, except: [:new, :create]

  def index
  	@users = User.all
  end

  def friends
    @friends = User.where("lat IS NOT NULL") #when user signs in, they are given a lat and lng. this selects for users that are logged in.. 
    render json: @friends
  end

  def new
  	@user = User.new
  end

  def create
  	@user = User.create(user_params)
    puts params
  		if @user.save
        session[:user_id] = @user.id
  			redirect_to users_path, flash: {success: "#{@user.first_name} created"}
  		else
  			render :new
  		end
  end

  def show
  end

  def edit
  end	

  def update
    @current_user.update user_params
    if @current_user.save
      redirect_to users_path, flash: {success: "#{@current_user.first_name} updated"}
    else
      render :edit
    end
  end

  def destroy
    @current_user.destroy
    session[:user_id] = nil
    flash[:notice] = "#{@current_user.first_name} has been deleted!"
    redirect_to login_path
    

  end



# added avatar info into the def user_params
  private

  def user_params
  	params.require(:user).permit(
  		:first_name,
      :avatar,
  		:email,
  		:img_url,
  		:address,
  		:password,
      :password_reset_token,
      :lat,
      :lng
  		)
  end	
  # We don't want other users to edit another user's info or favorites. 
  # This method below will allow us to ensure that the correct user has access to edit his or her info. 
  def ensure_correct_user 
    # compare some params vs something in the session/current_user
    unless params[:id].to_i == session[:user_id]
      redirect_to all_teams_path, alert: "Not Authorized"
    end
  end

end
