class WasteSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :expirationdate, :quantity, :value, :created_at, :disposalmethod, :disposalreason, :foodcategory, :user
end
