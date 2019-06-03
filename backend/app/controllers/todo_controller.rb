class TodoController < ApplicationController
    def index
        @todo = Todo.all
        render json: @todo
    end

    def create
        logger.debug(params[:todo])
        todo = params.require(:todo).permit(:title, :completed)
        @todo = Todo.create(todo)
        render json: @todo
    end

    def update
        logger.debug(params[:id])
        @todo = Todo.find(params[:id])
        @todo.update_attributes(completed: params[:completed])
        render json: @todo
    end
end
