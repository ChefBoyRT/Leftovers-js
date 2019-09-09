Rails.application.routes.draw do
  resources :wastes
  resources :foodcategories
  resources :disposalreasons
  resources :disposalmethods
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
