from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.utils.timezone import now
from django.contrib.auth.hashers import (
    make_password,
    check_password
)

from .UserManager import MyUserManager

# Create your models here.

class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True,unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(("password"), max_length=128)
    firstname = models.CharField(max_length=100,editable=True)
    lastname = models.CharField(max_length=100,editable=True)
    category = models.CharField(max_length=100,editable=True)
    expensename = models.CharField(max_length=100,editable=True)
    cost = models.CharField(max_length=100,editable=True)
    date = models.DateField(default=now)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["password"]

    objects = MyUserManager()

    @classmethod
    def CreateUser(cls,**krgs):
        if krgs:
            hashedpass = make_password(krgs["password"])
            krgs["password"] = hashedpass
            newuser = cls.objects.create(**krgs)
            newuser.save()
            return True
        else:
            return False
    
    @classmethod
    def GetAUser(cls,**krgs):
        if krgs:
            checkuser = cls.objects.filter(email=krgs["email"]).values_list("id","email","password")
            userpassword = list(checkuser)[0][2]
            print(list(checkuser))
            if len(checkuser) > 0:
                checkpassword = check_password(krgs["password"],userpassword)
                if checkpassword:
                    return {
                        "user":list(checkuser)[0],
                        "status":True
                    }
                else:
                    {
                        "status":True
                    }
            else:
                {
                    "status":True
                }
        else:
            {
                "status":True
            }

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
