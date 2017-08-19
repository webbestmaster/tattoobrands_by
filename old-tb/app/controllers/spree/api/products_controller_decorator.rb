module Spree
  module Api
    ProductsController.class_eval do
      def index
        if params[:ids]
          @products = product_scope.where(id: params[:ids].split(",").flatten)
        else
          @products = product_scope.ransack([]).result
        end

        @products = @products.distinct.page(params[:page]).per(params[:per_page])
        expires_in 15.minutes, :public => true
        headers['Surrogate-Control'] = "max-age=#{15.minutes}"
        respond_with(@products)
      end
    end
  end
end
