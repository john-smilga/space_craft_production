from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['role'] = user.role
        token['company_id'] = user.company.id if user.company else None
        return token


def get_token_for_user(user):
    """Helper to create token with custom claims"""
    refresh = RefreshToken.for_user(user)
    refresh['role'] = user.role
    refresh['company_id'] = user.company.id if user.company else None
    return refresh

