Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  # This line mounts Spree's routes at the root of your application.
  # This means, any requests to URLs such as /products, will go to Spree::ProductsController.
  # If you would like to change where this engine is mounted, simply change the :at option to something different.
  #
  # We ask that you don't use the :as option here, as Spree relies on it being the default of "spree"
  mount Spree::Core::Engine, :at => '/'

  resources :pages

  resources :currency_rate, only: [:create, :update]
  get 'currency/show', to: 'currency_rate#show', as: :show_currency

  # error pages
  %w( 404 500 ).each do |code|
    get code, :to => 'errors#show', :code => code
  end
end
