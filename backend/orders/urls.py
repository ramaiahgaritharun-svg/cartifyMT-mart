from django.urls import path
from .views import CancelOrderView, OrderListView, PlaceOrderView
from .views import UpdateOrderStatusView
from .views import AdminOrderListView
urlpatterns = [
    path('place/', PlaceOrderView.as_view()),
    path('update/<int:pk>/', UpdateOrderStatusView.as_view()),
    path('cancel/<int:pk>/', CancelOrderView.as_view()),
    path('list/', OrderListView.as_view()),
    path("admin/all/", AdminOrderListView.as_view()),
]