from rest_framework import serializers
from .models import Machine, Interface


class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = ('id', 'name', 'domain')


class InterfaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interface
        fields = ('id', 'address', 'name', 'subnet', 'gateway', 'DNS', 'machine')
