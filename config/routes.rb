Rails.application.routes.draw do
  get 'static_pages/top'
  get 'static_pages/terms'
  get 'static_pages/privacy'
  root 'static_pages#top'
  get 'terms', to: 'static_pages#terms'
  get 'privacy', to: 'static_pages#privacy'

  resources :users, only: %i[show new create destroy]
  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'
end
