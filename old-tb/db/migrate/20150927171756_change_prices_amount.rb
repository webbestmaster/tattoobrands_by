class ChangePricesAmount < ActiveRecord::Migration
  def up
    change_column :spree_prices, :amount, :decimal, :precision => 12, :scale => 2
  end

  def down
    change_column :spree_prices, :amount, :decimal, :precision => 10, :scale => 2
  end
end
