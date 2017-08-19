Spree::Admin::ProductsController.class_eval do
  def update
    if params[:product][:taxon_ids].present?
      params[:product][:taxon_ids] = params[:product][:taxon_ids].split(',')
    end
    if params[:product][:option_type_ids].present?
      params[:product][:option_type_ids] = params[:product][:option_type_ids].split(',')
    end
    price_in_byr = '0.0'
    if params[:product].has_key?(:price_in_byr)
      price_in_byr = params[:product].delete(:price_in_byr)
    end
    invoke_callbacks(:update, :before)
    if @object.update_attributes(permitted_resource_params)
      invoke_callbacks(:update, :after)

      update_byr_price(@object, price_in_byr)

      set_title_tag(@object, params[:product])

      flash[:success] = flash_message_for(@object, :successfully_updated)
      respond_with(@object) do |format|
        format.html { redirect_to location_after_save }
        format.js   { render layout: false }
      end
    else
      # Stops people submitting blank slugs, causing errors when they try to
      # update the product again
      @product.slug = @product.slug_was if @product.slug.blank?
      invoke_callbacks(:update, :fails)
      respond_with(@object)
    end
  end

  private

  def update_byr_price(product, price_br)
    price_br.gsub!(/\s+/, "")

    price = product.price_in('BYR')

    price.amount = BigDecimal.new(price_br)
    price.save
  end

  def set_title_tag(product, params)
    product.update_columns(title_tag: params[:title_tag]) if params.has_key?(:title_tag)
  end
end
