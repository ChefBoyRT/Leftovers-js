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
    
end
