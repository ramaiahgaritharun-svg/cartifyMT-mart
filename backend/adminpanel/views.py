from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from users.models import User
from products.models import Product
from orders.models import Order


class AnalyticsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):

        revenue = (
            Order.objects.aggregate(
                total=Sum("total_price")
            )["total"] or 0
        )

        delivered_orders = Order.objects.filter(
            status="delivered"
        ).count()

        cancelled_orders = Order.objects.filter(
            status="cancelled"
        ).count()

        return Response({
            "users": User.objects.count(),
            "products": Product.objects.count(),
            "orders": Order.objects.count(),
            "revenue": revenue,
            "delivered": delivered_orders,
            "cancelled": cancelled_orders,
        })