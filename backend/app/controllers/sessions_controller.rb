class SessionsController < ApplicationController
    def new
        @current_user ||= User.find_by(token: params[:token])
        render json: @current_user
    end
    
    def create
        @user = User.find_by(email: params[:email].downcase)
        if @user && @user.authenticate(params[:password])
            render json: @user
        else
            if @user
                render json: { errors: 'パスワードが正しくありません' }
            else
                render json: { errors: 'メールアドレスが正しくありません' }
            end

        end
    end
    
    def destroy
    end
end
