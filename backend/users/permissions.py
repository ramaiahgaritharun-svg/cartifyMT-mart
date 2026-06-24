from rest_framework.permissions import BasePermission, IsAdminUser


# 👤 Customer Only Permission
class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role == "customer"
        )


# 👑 Admin (optional wrapper - Django built-in already works)
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.is_staff
        )