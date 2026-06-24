from django.urls import path
from .views import AddToCartView, CartListView, CartDeleteView
from .views import UpdateCartQuantityView

urlpatterns = [
    path('add/', AddToCartView.as_view()),
    path('list/', CartListView.as_view()),
    path('delete/<int:pk>/', CartDeleteView.as_view()),
    path("update-quantity/",UpdateCartQuantityView.as_view()
),
]