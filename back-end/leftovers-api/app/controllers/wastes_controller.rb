class WastesController < ApplicationController
    def index
        wastes = Waste.all

        render json: wastes
    end

    def show
        waste = Waste.find_by(id: params[:id])

        render json: waste
    end

    def destroy
        waste = Waste.find(params[:id])
        waste.destroy
    end

    def create
        disposal_method_id = Disposalmethod.find_by(name: 'blank').id
        disposal_reason_id = Disposalreason.find_by(name: 'blank').id
        food_category_id = Foodcategory.find_by(name: params[:foodcategory_id].split('_').map(&:capitalize).join(' ')).id
        
        waste = Waste.create(name: params[:name], 
                             expirationdate: params[:expirationdate], 
                             quantity: params[:quantity], 
                             quantity_unit: params[:quantity_unit],
                             value: params[:value],
                             user_id: params[:user_id], 
                             disposalmethod_id: disposal_method_id, 
                             disposalreason_id: disposal_reason_id, 
                             foodcategory_id: food_category_id
                             )
        render json: waste
    end

    def update
        id = params[:id].to_i
        waste = Waste.find_by(id: id)

        disposal_method_id = Disposalmethod.find_by(name: 'blank').id
        disposal_reason_id = Disposalreason.find_by(name: 'blank').id
        food_category_id = Foodcategory.find_by(name: params[:foodcategory_id].split('_').map(&:capitalize).join(' ')).id
    
        waste.update(name: params[:name], 
                    expirationdate: params[:expirationdate], 
                    quantity: params[:quantity], 
                    quantity_unit: params[:quantity_unit],
                    value: params[:value],
                    user_id: params[:user_id], 
                    disposalmethod_id: disposal_method_id, 
                    disposalreason_id: disposal_reason_id, 
                    foodcategory_id: food_category_id)
        
        render json: waste
    end
    
end
