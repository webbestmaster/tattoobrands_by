class CurrencyRate < ActiveRecord::Base
  validates_numericality_of :rate
end
