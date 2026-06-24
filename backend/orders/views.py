from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .models import Order
from .serializers import OrderSerializer
from cart.models import Cart


# ---------------- ADMIN ----------------
class UpdateOrderStatusView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]


# ---------------- PLACE ORDER ----------------
class PlaceOrderView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        cart_items = Cart.objects.filter(user=user)

        if not cart_items.exists():
            return Response({"error": "Cart is empty"}, status=400)

        full_name = request.data.get("full_name")
        phone = request.data.get("phone")
        address = request.data.get("address")
        city = request.data.get("city")
        state = request.data.get("state")
        pincode = request.data.get("pincode")
        payment_method = request.data.get("payment_method", "cod")

        orders = []

        for item in cart_items:
            order = Order.objects.create(
                user=user,
                product=item.product,
                quantity=item.quantity,
                total_price=item.total_price(),

                full_name=full_name,
                phone=phone,
                address=address,
                city=city,
                state=state,
                pincode=pincode,

                payment_method=payment_method
            )
            orders.append(order)

        cart_items.delete()

        return Response(OrderSerializer(orders, many=True).data)


# ---------------- CANCEL ORDER ----------------
class CancelOrderView(generics.UpdateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        order = self.get_object()

        if order.status in ["delivered", "cancelled"]:
            return Response(
                {"error": "Order cannot be cancelled"},
                status=400
            )

        order.status = "cancelled"
        order.save()

        return Response({
            "message": "Order cancelled successfully",
            "order_id": order.id,
            "status": order.status
        })


# ---------------- USER ORDERS ----------------
class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    
class AdminOrderListView(generics.ListAPIView):
    queryset = Order.objects.all().order_by("-created_at")
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]    