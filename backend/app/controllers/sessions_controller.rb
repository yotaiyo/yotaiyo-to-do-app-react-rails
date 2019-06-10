class SessionsController < ApplicationController
    def new
        @user = User.all
        render json: @user
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
