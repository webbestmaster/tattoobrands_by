class CurrencyRateController < Spree::BaseController
  layout '/spree/layouts/admin'

  def create
    @currency = CurrencyRate.new(currency_rate_params)

    if @currency.save
      redirect_to main_app.show_currency_path(@currency), notice: 'Курс создан успешно.'
    else
      render :show
    end
  end

  def show
    @currency = CurrencyRate.first || CurrencyRate.new
  end

  def update
    @currency = CurrencyRate.find(params[:id])

    if @currency.update(currency_rate_params)
      redirect_to main_app.show_currency_path(@currency), notice: 'Курс обновлён успешно.'
    else
      render :show
    end
  end

  private

  def currency_rate_params
    params.require(:currency_rate).permit(:id, :rate)
  end

end
