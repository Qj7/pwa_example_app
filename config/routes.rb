Rails.application.routes.draw do
  root 'home#index'
  get "/service-worker.js" => "pwa#service_worker"
  get "/manifest.json" => "pwa#manifest"
end
