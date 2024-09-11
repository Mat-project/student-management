from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('student/', views.StudentView.as_view()),
    path("student/<int:pk>/", views.StudentView.as_view())  # Corrected the view here
]
