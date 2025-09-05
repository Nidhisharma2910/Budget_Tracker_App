from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from .serializer import UserSerializer,LoginSerializer
from .models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(["POST"])
def Register(request):
    try:
        serialzer = UserSerializer(data=request.data,context=request.data)
        if serialzer.is_valid():
            flag = User.CreateUser(**serialzer.data)
            print(flag)
            return Response({
                "status":True,
                "msg":"Ok"
            })
        else:
            return Response({
                "status":False,
                "msg":serialzer.errors
            })
    except Exception as e:
        print(e)
        return Response({
            "status":False,
            "msg":"Something went wrong..."
        })

@api_view(["POST"])
def Login(request):
    try:
        serialzer = LoginSerializer(data=request.data)
        if serialzer.is_valid():
            flag = User.GetAUser(**serialzer.data)
            if flag["status"] :
                user = User.objects.get(email=flag["user"][1])
                token, created  = Token.objects.get_or_create(user=user)
                return Response({
                    "status":True,
                    "user":list(flag["user"]),
                    "token":token.key,
                    "msg":"Successfully logged in..."
                })
            else:
                return Response({
                    "status":False,
                    "msg":"Invalid email and password"
                })
        else:
            return Response({
                "status":False,
                "msg":serialzer.errors
            })
    except Exception as e:
        print(e)
        return Response({
            "status":False,
            "msg":"Something went wrong..."
        })

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def AuthUser(request):
    try:
        user = User.objects.filter(email=request.user).values_list("id","email","firstname","lastname")
        return Response({
            "status":True,
            "user":list(user)[0]
        })
    except Exception as e:
        print(e)
        return Response({
            "status":False,
            "msg":"Something went wrong..."
        })