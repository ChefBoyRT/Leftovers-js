class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :email, :password
end
