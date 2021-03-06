class UsersController < ApplicationController
    def index
        users = User.all

        render json: users
    end

    def show
        user = User.find_by(id: params[:id])
        users_wastes = user.wastes
        all_user_waste = []

        users_wastes.each do |waste|
            # binding.pry
        waste_object = {
            id: waste.id,
            user_id: waste.user_id,
            food_name: waste.name,
            expiration_date: waste.expirationdate,
            quantity: waste.quantity,
            quantity_unit: waste.quantity_unit,
            value: waste.value,
            disposal_method: waste.disposalmethod,
            disposal_reason: waste.disposalreason,
            food_category: waste.foodcategory,
            created_at: waste.created_at
        }

        all_user_waste.push(waste_object)
    end

        render json: all_user_waste
    end

    def create
        # binding.pry
        attempted_login = User.find_by(email: params[:email])
        # binding.pry

        if attempted_login
            # binding.pry
            render json: attempted_login.id
        else
            new_user = User.create(name: params[:name], email: params[:email], password: params[:password])
            # binding.pry
            render json: new_user.id
        end
    end

end