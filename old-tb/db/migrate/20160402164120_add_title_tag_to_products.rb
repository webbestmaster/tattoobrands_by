class AddTitleTagToProducts < ActiveRecord::Migration
  def change
    add_column :spree_products, :title_tag, :string, default: nil
  end
end
