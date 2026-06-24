from rest_framework import serializers
from .models import Order
from products.models import Product


class ProductMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "price", "image"]


class OrderSerializer(serializers.ModelSerializer):
    product_detail = ProductMiniSerializer(source="product", read_only=True)

    class Meta:
        model = Order
        fields = "__all__"