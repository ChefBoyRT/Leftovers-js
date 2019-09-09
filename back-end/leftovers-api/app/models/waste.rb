class Waste < ApplicationRecord
  belongs_to :user
  belongs_to :disposalmethod
  belongs_to :disposalreason
  belongs_to :foodcategory
end
