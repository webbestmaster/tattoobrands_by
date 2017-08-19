# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "http://www.tatoobrands.by"
SitemapGenerator::Sitemap.create_index = :auto
SitemapGenerator::Sitemap.search_engines = {
    :google   => "http://www.google.com/webmasters/tools/ping?sitemap=%s",
    :bing     => "http://www.bing.com/webmaster/ping.aspx?siteMap=%s",
    :yandex   => "http://blogs.yandex.ru/pings/?status=success&url=%s"
}

SitemapGenerator::Sitemap.create do
  Page.all.each do |page|
    add page_path(page), lastmod: page.updated_at
  end

  Spree::Taxon.all.each do |taxon|
    add Spree::Core::Engine.routes.url_helpers.nested_taxons_path(taxon), lastmod: taxon.updated_at
  end

  add Spree::Core::Engine.routes.url_helpers.products_path, lastmod: Spree::Product.active.uniq.order('updated_at').last.updated_at

  Spree::Product.active.uniq.each do |product|
    add Spree::Core::Engine.routes.url_helpers.product_path(product), lastmod: product.updated_at
  end

  Spree::Taxon.roots.each do |taxon|
    if (taxon.permalink.present? && taxon.products.present?)
      add(Spree::Core::Engine.routes.url_helpers.nested_taxons_path(taxon.permalink), lastmod: taxon.products.order('updated_at').last.updated_at)
    end
    taxon.children.each do |child1|
      if (child1.permalink.present? && child1.products.present?)
        add(Spree::Core::Engine.routes.url_helpers.nested_taxons_path(child1.permalink), lastmod: child1.products.order('updated_at').last.updated_at)
      end
      child1.children.each do |child2|
        if (child2.permalink.present? && child2.products.present?)
          add(Spree::Core::Engine.routes.url_helpers.nested_taxons_path(child2.permalink), lastmod: child2.products.order('updated_at').last.updated_at)
        end
        child2.children.each do |child3|
          if (child3.permalink.present? && child3.products.present?)
            add(Spree::Core::Engine.routes.url_helpers.nested_taxons_path(child3.permalink), lastmod: child3.products.order('updated_at').last.updated_at)
          end
          child3.children.each do |child4|
            if (child4.permalink.present? && child4.products.present?)
              add(Spree::Core::Engine.routes.url_helpers.nested_taxons_path(child4.permalink), lastmod: child4.products.order('updated_at').last.updated_at)
            end
          end
        end
      end
    end
  end
end