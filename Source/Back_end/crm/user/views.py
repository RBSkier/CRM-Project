from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import authenticate, update_session_auth_hash
from django.contrib.auth.models import User,Group
from .expection import CustomTokenAuthentication

class RegistrationView(APIView):
    permission_classes = ()
    def post(self, request):
        data = request.data
        data['first_name'] = request.data.pop('firstname')
        data['last_name'] = request.data.pop('lastname')
        if request.data.get('role') == 'staff':
            data['is_staff'] = True
        elif request.data.get('role') == 'manager':
            data['is_staff'] = False

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'status': 'success','message': 'Register successfully'})
        else:
            return Response({'status': 'error','message': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=False):
            user = serializer.validated_data['user']
            role = ''
            if  user.is_staff:
                role = 'staff'
            else:
                role = 'manager'
            token, created = Token.objects.get_or_create(user=user)
            return Response({'status': 'success','message': 'Login successfully','token': token.key,'role': role})
        return Response({'status': 'error','message': 'Username or password is wrong'},status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = request.user

        token = Token.objects.get(user=user)

        token.delete()

        return Response({'status': 'success','message': 'Logged out successfully'})


class ChangePasswordView(APIView):
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        user = request.user

        if not authenticate(username=user.username, password=old_password):
            return Response({'status': 'error','message': 'Invaild old password'}, status=400)

        user.set_password(new_password)
        user.save()

        update_session_auth_hash(request, user)

        return Response({'status': 'success','message': 'Password changed successfully'})



from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

class SendEmailView(APIView):
    permission_classes = ()
    def post(self, request):
        email = request.data.get('email')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'User with this email does not exist'}, status=400)

        reset_token, created = Token.objects.get_or_create(user=user)

        reset_url = f'{settings.DOMAIN}/api/user/reset-password/{reset_token}'

        send_mail(
            'Password Reset',
            f'Please click the following link to reset your password: {reset_url}',
            settings.DEFAULT_FROM_EMAIL,
            [email],    
            fail_silently=False,
        )

        return Response({'message': 'Password reset email has been sent'})

from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from django.views.generic.base import TemplateView
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import user_passes_test

User = get_user_model()

class ResetPasswordView(TemplateView):
    template_name = 'reset_password.html'

    def get(self, request, *args, **kwargs):
        token = self.kwargs['token']
        user = self.get_user_by_token(token)
        # if user is None:
        #     return redirect(f'{settings.DOMAIN}/api/user/password-reset-error/')
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        token = self.kwargs['token']
        user = self.get_user_by_token(token)
        if user is None:
            messages.error(request, 'Invalid password reset token.')
            #return redirect('reset_password')

        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password == confirm_password:
            user.set_password(password)
            user.save()
            messages.success(request, 'Password reset successful.')
            return redirect('reset_password', token=token)
            # return redirect(f'{settings.DOMAIN}/api/user/password-reset-success/')
        else:
            messages.error(request, 'Passwords do not match.')
            return redirect('reset_password', token=token)

        #return render(request, 'reset_password.html', {'token': token})

    def get_user_by_token(self, token):
        try:
            return User.objects.get(auth_token=token)
        except User.DoesNotExist:
            return None

