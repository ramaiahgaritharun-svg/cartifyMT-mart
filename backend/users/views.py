from rest_framework import generics

from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User

from .serializers import RegisterSerializer, MyTokenObtainPairSerializer



# REGISTER

class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = RegisterSerializer





# LOGIN (CUSTOM JWT WITH ROLE)

class MyTokenObtainPairView(TokenObtainPairView):

    serializer_class = MyTokenObtainPairSerializer