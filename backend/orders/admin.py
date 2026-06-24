from django.contrib import admin
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "product",
        "quantity",
        "total_price",
        "status",
        "created_at",
    )

    list_filter = ("status",)

    search_fields = (
        "user__username",
        "product__name",
    )

    actions = ["mark_as_cancelled", "mark_as_shipped"]

    def mark_as_cancelled(self, request, queryset):
        queryset.update(status="cancelled")

    def mark_as_shipped(self, request, queryset):
        queryset.update(status="shipped")