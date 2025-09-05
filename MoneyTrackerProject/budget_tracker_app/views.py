from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .serializer import TransactionSerializer,CategorySerializer,DateSerializer,DeleteSerializer,UpdateionSerializer
from .models import Transaction
# Create your views here.

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def dump(request):
    print(request.user)
    return Response({"msg":"Hellow"})

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def CreateTransaction(request):
    try:
        serializer = TransactionSerializer(data=request.data,context=request.user)
        if serializer.is_valid():
            flag = Transaction.Transact(request.user,**serializer.data)
            print(flag)
            if flag:
                return Response({
                    "status":True,
                    "msg":"Successfully created transaction"
                })
            else:
                return Response({
                    "status":False,
                    "msg":"Failed"
                })
        else:
            return Response({
                "status":False,
                "msg":serializer.errors 
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
def GetAllTransation(request):
    try:
        flag = Transaction.GetTransactions(request.user)
        if flag["status"]:
            return Response({
                "status":True,
                "msg":flag["data"]
            })
        else:
            return Response({
                "status":False,
                "msg":"Failed"
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
def GetTransation_by_Category(request):
    try:
        serializer = CategorySerializer(data = request.data)
        if serializer.is_valid():
            flag = Transaction.GetTransactions_by_category(request.user,serializer.data["category"])
            if flag["status"]:
                return Response({
                    "status":True,
                    "msg":flag["data"]
                })
            else:
                return Response({
                    "status":False,
                    "msg":"Failed"
                })
        else:
            return Response({
                    "status":False,
                    "msg":serializer.errors
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
def GetTransation_by_Date(request):
    try:
        serializer = DateSerializer(data=request.data)
        if serializer.is_valid():
            flag = Transaction.GetTransactions_by_date(request.user,serializer.data["date"])
            if flag["status"]:
                return Response({
                    "status":True,
                    "msg":flag["data"]
                })
            else:
                return Response({
                    "status":False,
                    "msg":"Failed"
                })
        else:
            return Response({
                    "status":False,
                    "msg":serializer.errors
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
def DeleteTransaction(request):
    try:
        serializer = DeleteSerializer(data = request.data)
        if serializer.is_valid():
            flag = Transaction.DelTransactions(serializer.data["transactionid"])
            if flag["status"]:
                return Response({
                    "status":True,
                    "msg":"Deleted"
                })
            else:
                return Response({
                    "status":False,
                    "msg":"Not Found"
                })
        else:
            return Response({
                    "status":False,
                    "msg":serializer.errors
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
def GetATransaction(request):
    try:
        serializer = DeleteSerializer(data = request.data)
        if serializer.is_valid():
            flag = Transaction.GetATransactions(serializer.data["transactionid"])
            if flag["status"]:
                return Response({
                    "status":True,
                    "msg":flag["data"]
                })
            else:
                return Response({
                    "status":False,
                    "msg":"Not Found"
                })
        else:
            return Response({
                    "status":False,
                    "msg":serializer.errors
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
def UpdateATransaction(request):
    try:
        serializer = UpdateionSerializer(data = request.data)
        if serializer.is_valid():
            flag = Transaction.UpdateTransactions(**serializer.data)
            if flag:
                return Response({
                    "status":True,
                    "msg":"Updated Succesfully..."
                })
            else:
                return Response({
                    "status":True,
                    "msg":"Failed to Update..."
                })
        else:
            return Response({
                    "status":False,
                    "msg":serializer.errors
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
def GetDistintCategory(request):
    try:
        flag = Transaction.GetAllDistintTransactions(request.user)
        if flag["status"]:
            return Response({
                "status":True,
                "msg":flag["data"]
            })
        else:
            return Response({
                "status":True,
                "msg":"Failed to Update..."
            })
    except Exception as e:
        print(e)
        return Response({
            "status":False,
            "msg":"Something went wrong..."
        })