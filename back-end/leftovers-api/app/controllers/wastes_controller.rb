class WastesController < ApplicationController
    def index
        wastes = Waste.all

        render json: wastes
    end

    def show
        waste = Waste.find_by(id: params[:id])

        render json: waste
    end
end
