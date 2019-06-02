class TodoController < ApplicationController
    def index
        @todo = Todo.all
        render json: @todo
    end

    def create
        logger.debug(params[:todo])
        todo = params.require(:todo).permit(:title)
        @todo = Todo.create(todo)
        render json: @todo
    end
end
