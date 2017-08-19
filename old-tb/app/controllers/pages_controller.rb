class PagesController < Spree::BaseController
  before_action :set_page, only: [:show, :edit, :update, :destroy]

  layout '/spree/layouts/admin', only: [:new, :edit, :index]

  load_and_authorize_resource

  # GET /pages
  # GET /pages.json
  def index
    if admin?
      @pages = Page.all
    else
      redirect_to :root
    end
  end

  # GET /pages/1
  # GET /pages/1.json
  def show
    render :show, layout: '/spree/layouts/spree_application'
  end

  # GET /pages/new
  def new
    @page = Page.new
  end

  # GET /pages/1/edit
  def edit
  end

  # POST /pages
  # POST /pages.json
  def create
    @page = Page.new(page_params)

    if @page.save
      redirect_to main_app.page_path(@page), notice: 'Cтраница успешно создана.'
    else
      render :new
    end
  end

  # PATCH/PUT /pages/1
  # PATCH/PUT /pages/1.json
  def update
    if @page.update(page_params)
      redirect_to main_app.page_path(@page), notice: 'Страница обновлена успешно.'
    else
      render :edit
    end
  end

  # DELETE /pages/1
  # DELETE /pages/1.json
  def destroy
    @page.destroy
    redirect_to main_app.pages_url, notice: 'Страница успешно удалена.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_page
      @page = Page.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def page_params
      params.require(:page).permit(:id, :title, :content)
    end

    def current_ability
      @current_ability ||= ::Ability.new(try_spree_current_user)
    end

    def admin?
      try_spree_current_user && try_spree_current_user.admin?
    end
end

