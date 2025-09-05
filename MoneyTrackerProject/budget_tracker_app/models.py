from django.db import models
from django.utils.timezone import now
from user.models import User

# Create your models here.
class Transaction(models.Model):
    transactionid = models.AutoField(primary_key=True,unique=True)
    category = models.CharField(max_length=100,editable=True)
    expensename = models.CharField(max_length=100,editable=True)
    cost = models.CharField(max_length=100,editable=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    date = models.DateField(default=now)

    @classmethod
    def Transact(cls,user,**krgs):
        if krgs and user:
            checkuser = User.objects.get(email=user)
            newtransaction = cls.objects.create(category=krgs["category"],expensename=krgs["expensename"],cost=krgs["cost"],user=checkuser)
            newtransaction.save()
            return True
        else:
            return False
    
    @classmethod
    def GetTransactions(cls,user):
        if user:
            checkuser = User.objects.get(email=user)
            alltransactions = cls.objects.filter(user=checkuser).values()
            print(alltransactions)
            return {
                "status":True,
                "data":alltransactions
            }
        else:
            return {
                "status":False,
            }

    @classmethod
    def GetAllDistintTransactions(cls,user):
        if user:
            checkuser = User.objects.get(email=user)
            disnitransactions = cls.objects.filter(user=checkuser).values("category").distinct()
            return {
                "status":True,
                "data":disnitransactions
            }
        else:
            return {
                "status":False,
            }

    @classmethod
    def GetATransactions(cls,id):
        if id:
            alltransactions = cls.objects.filter(transactionid=id).values()
            return {
                "status":True,
                "data":alltransactions
            }
        else:
            return {
                "status":False,
            }

    @classmethod
    def DelTransactions(cls,id):
        if id:
            alltransactions = cls.objects.filter(transactionid=id).delete()
            print(alltransactions,"delete")
            return {
                "status":True,
                "data":"Successfully Deleted..."
            }
        else:
            return {
                "status":False,
            }
    
    @classmethod
    def UpdateTransactions(cls,**krgs):
        try:
            checkitem = cls.objects.get(transactionid=krgs["transactionid"])
            checkitem.category = krgs["category"]
            checkitem.expensename = krgs["expensename"]
            checkitem.cost = krgs["cost"]

            checkitem.save()
            return True
        except Exception as e:
            return False



    @classmethod
    def GetTransactions_by_category(cls,user,cat):
        if user:
            checkuser = User.objects.get(email=user)
            alltransactions = cls.objects.filter(user=checkuser,category=cat).values()
            return {
                "status":True,
                "data":list(alltransactions)
            }
        else:
            return {
                "status":False,
            }
    @classmethod
    def GetTransactions_by_date(cls,user,date):
        if user:
            checkuser = User.objects.get(email=user)
            alltransactions = cls.objects.filter(user=checkuser,date=date).values_list("category","expensename","cost","date")
            return {
                "status":True,
                "data":list(alltransactions)
            }
        else:
            return {
                "status":False,
            }