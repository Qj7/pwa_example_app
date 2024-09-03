class NotificationsController < ApplicationController
  protect_from_forgery except: :save_subscription

  def save_subscription
    subscription = params[:subscription]

    # Сохраните подписку в базе данных, если хотите (например, модель Subscription)
    # Subscription.create!(endpoint: subscription[:endpoint], p256dh: subscription[:keys][:p256dh], auth: subscription[:keys][:auth])

    render json: { message: 'Subscription saved.' }, status: :ok
  end

  def send_notification
    Webpush.payload_send(
      message: params[:message] || "Это тестовое сообщение",
      endpoint: params[:endpoint],
      p256dh: params[:p256dh],
      auth: params[:auth],
      vapid: {
        subject: "mailto:ваш_email@example.com",
        public_key: ENV['VAPID_PUBLIC_KEY'],
        private_key: ENV['VAPID_PRIVATE_KEY']
      },
      ssl_timeout: 5,
      open_timeout: 5,
      read_timeout: 5
    )
    render json: { message: 'Notification sent.' }, status: :ok
  end
end
