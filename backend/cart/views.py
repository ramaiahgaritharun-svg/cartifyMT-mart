from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Cart
from .serializers import CartSerializer


# Add To Cart
class AddToCartView(generics.CreateAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        product_id = request.data.get("product")
        quantity = int(request.data.get("quantity", 1))

        cart_item = Cart.objects.filter(
            user=request.user,
            product_id=product_id
        ).first()

        if cart_item:
            cart_item.quantity += quantity
            cart_item.save()

            return Response({
                "message": "Cart updated",
                "quantity": cart_item.quantity
            })

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        return Response({
            "message": "Added to cart",
            "cart": serializer.data
        })


# View Cart
class CartListView(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(
            user=self.request.user
        )


# Delete Cart Item
class CartDeleteView(generics.DestroyAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(
            user=self.request.user
        )


# Increase / Decrease Quantity
class UpdateCartQuantityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart_id = request.data.get("cart_id")
        action = request.data.get("action")

        try:
            cart_item = Cart.objects.get(
                id=cart_id,
                user=request.user
            )

            if action == "increase":
                cart_item.quantity += 1

            elif action == "decrease":
                if cart_item.quantity > 1:
                    cart_item.quantity -= 1

            cart_item.save()

            return Response({
                "message": "Quantity updated",
                "quantity": cart_item.quantity
            })

        except Cart.DoesNotExist:
            return Response(
                {"error": "Cart item not found"},
                status=404
            )

