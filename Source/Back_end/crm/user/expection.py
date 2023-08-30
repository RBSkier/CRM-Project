from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CustomTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        auth = super().authenticate(request)

        if not auth:
            raise AuthenticationFailed('token is not provided')

        return auth

    def authenticate_credentials(self, key):
        model = self.get_model()

        try:
            token = model.objects.select_related('user').get(key=key)
        except model.DoesNotExist:
            raise AuthenticationFailed({'status':'error','message':'token does not exist'})

        return (token.user, token)

# -------
