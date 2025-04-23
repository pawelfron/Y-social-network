from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from ..models import User
from ..serializers import auth_serializers

class RegisterUser(CreateAPIView):
    queryset = User
    permission_classes = [AllowAny]
    serializer_class = auth_serializers.UserRegistrationSerializer

# This is only for testing if authentication works; delete later
class UselessView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "OK"})