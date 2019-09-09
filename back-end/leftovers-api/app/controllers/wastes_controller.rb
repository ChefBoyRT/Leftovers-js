class WastesController < ApplicationController
    def index
        wastes = Waste.all

        render json: WasteSerializer.new(wastes)
    end

    def show
        waste = Waste.find_by(id: params[:id])

        render json: WasteSerializer.new(waste)
    end
end
