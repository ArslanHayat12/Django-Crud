from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import employees
from .serializers import employeesSerializer
import json
class employeeList(APIView):
    def get(self,request):
        objectQuerySet = employees.objects.all()
        serializer= employeesSerializer(objectQuerySet,many=True)
        return Response(serializer.data)

    def post(self,request):
        # data={
        #     'firstname': "Test 123",
        #     'lastname':"456",
        #     'emp_id':2
        # }
        serializer= employeesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("Saved")

    def put(self, request,id):
        # data={
        #     'firstname': "Test 123457 1232 12",
        #     'lastname':"456",
        #     'emp_id':2
        # }
        objectQuerySet = employees.objects.filter(id=id)
        serializer= employeesSerializer(objectQuerySet[0],data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(data)

    def delete(self, request,id):
        employee = get_object_or_404(employees.objects.all(), id=id)
        employee.delete()
        return Response({"message": "Employee with id `{}` has been deleted.".format(id)},status=200)