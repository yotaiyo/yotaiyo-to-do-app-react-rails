class UsersController < ApplicationController
    def index
        @user = User.all
        render json: @user
    end

    def create
        user = params.require(:user).permit(:email, :name, :password_digest)
        @user = User.new(user)
        if @user.save
            render json: @user
        else
            render json: { errors: @user.errors.full_messages }
        end
    end
end
