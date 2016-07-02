from django.db import models

#   Machine object\record
class Machine(models.Model):
    name = models.CharField(max_length=200)
    domain = models.CharField(max_length=200)

    def __str__(self):
        return self.name + " - " + self.domain

#   Interface object\record
class Interface(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)
    address = models.CharField(max_length=15)
    name = models.CharField(max_length=200)
    subnet = models.CharField(max_length=15)
    gateway = models.CharField(max_length=15)
    DNS = models.CharField(max_length=15)

    def __str__(self):
        return self.address + " - " + self.name
