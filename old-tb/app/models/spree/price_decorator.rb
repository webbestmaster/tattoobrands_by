Spree::Price.class_eval do
  def maximum_amount
    BigDecimal '99999999.99'
  end
end
