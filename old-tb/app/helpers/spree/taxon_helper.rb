module Spree
  module TaxonHelper
    def simple_taxons_tree(root_taxon, current_taxon, max_level = 3)
      return '' if max_level < 1 || root_taxon.leaf?
      root_taxon.children.map do |taxon|
        css_class = (current_taxon && current_taxon.self_and_ancestors.include?(taxon)) ? 'side-category-item ellipsis side-category-item-active' : 'side-category-item ellipsis'
        link_to(taxon.name, seo_url(taxon), class: css_class) + taxons_tree(taxon, current_taxon, max_level - 1)
      end.join("\n").html_safe
    end
  end
end