class User < ApplicationRecord
    has_secure_password
    has_secure_token

    validates :email, presence: true, uniqueness: true, length: { maximum: 255 }
    validates :name, presence: true, length: { maximum: 50 }
    validates :password_digest, presence: true
    validates :token, uniqueness: true
end
