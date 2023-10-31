module ApplicationHelper
  def page_title(page_title = '')
    base_title = "devblog webring"
    page_title.empty? ? base_title : page_title + ' | ' + base_title
  end

  def default_meta_tags
    {
      site: 'devblog webring',
      title: 'devblog webring',
      reverse: true,
      charset: 'utf-8',
      description: 'devblog webring',
      keywords: 'devblog webring',
      canonical: request.original_url,
      separator: '|',
      og: {
        site_name: :site,
        title: :title,
        description: :description,
        type: 'website',
        url: request.original_url,
        image: image_url('logo.png'),
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@meaganewaller',
        image: image_url('logo.png'),
      }
    }
  end
end
