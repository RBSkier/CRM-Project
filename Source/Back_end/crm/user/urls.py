from django.urls import path
from user.views import RegistrationView, LoginView,LogoutView
from user.views import ChangePasswordView
from .views import SendEmailView
from .views import ResetPasswordView

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('send-email/', SendEmailView.as_view(), name='send_email'),
    path('reset-password/<str:token>/', ResetPasswordView.as_view(), name='reset_password'),
    # path('password-reset-success/', ResetPasswordSuccessView.as_view(), name='password_reset_success'),
    # path('password-reset-error/', ResetPasswordErrorView.as_view(), name='password_reset_error'),
]

