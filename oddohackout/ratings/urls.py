from django.urls import path
from . import views

app_name = 'ratings'

urlpatterns = [
    # Rating CRUD operations
    path('', views.RatingCreateView.as_view(), name='rating-create'),
    path('<int:pk>/', views.RatingUpdateDeleteView.as_view(), name='rating-update-delete'),
]
