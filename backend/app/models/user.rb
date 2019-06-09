class User < ApplicationRecord
    has_secure_password
    has_secure_token

    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
    validates :password_digest, presence: true
    validates :token, uniqueness: true
end
