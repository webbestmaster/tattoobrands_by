class CreateCurrencyRate < ActiveRecord::Migration
  def self.up
    create_table :currency_rates do |t|
      t.decimal :rate, :precision => 10, :scale => 0
      t.timestamps
    end
  end

  def self.down
    drop_table :currency_rates
  end
end
