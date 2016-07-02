from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Machine, Interface
from .serializers import MachineSerializer, InterfaceSerializer


def index(request):
    machines = Machine.objects.all()
    # return render(request, 'machines.html', {'machines':machines})
    return render(request, 'index.html')


def interfaces(request, machine_id):
    machine = get_object_or_404(Machine, id=machine_id)
    return HttpResponse("<h2>Address is " + machine.name + "</h2><br>")


class MachineList(APIView):
    def get(self, request):
        machines = Machine.objects.all()
        machineJSON = MachineSerializer(machines, many=True)
        return Response(machineJSON.data)


class InterfaceList(APIView):
    def get(self, request):
        interfaces = Interface.objects.all()
        interfaceJSON = InterfaceSerializer(interfaces, many=True)
        return Response(interfaceJSON.data)
