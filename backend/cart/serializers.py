from rest_framework import serializers
from .models import Cart
from products.models import Product


class ProductMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            "image",
        ]


class CartSerializer(serializers.ModelSerializer):
    product_detail = ProductMiniSerializer(
        source="product",
        read_only=True
    )

    class Meta:
        model = Cart
        fields = [
            "id",
            "product",
            "product_detail",
            "quantity",
        ]
        read_only_fields = ["user"]