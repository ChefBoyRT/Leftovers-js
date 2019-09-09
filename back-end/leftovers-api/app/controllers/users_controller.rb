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
        waste_object = {
            id: waste.id,
            food_name: waste.name,
            expiration_date: waste.expirationdate,
            quantity: waste.quantity,
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
end
