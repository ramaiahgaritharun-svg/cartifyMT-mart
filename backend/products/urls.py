from django.urls import path
from .views import (
    ProductCreateView,
    ProductListView,
    ProductDetailView,
    ProductUpdateView,
    ProductDeleteView,
    CategoryListView,
    CategoryUpdateView,
    CategoryDeleteView,
    ProductSearchView
)

urlpatterns = [

    # PRODUCTS
    path('', ProductListView.as_view()),                 # GET /products/
    path('add/', ProductCreateView.as_view()),           # POST /products/add/
    path('<int:pk>/', ProductDetailView.as_view()),      # GET /products/1/
    path('update/<int:pk>/', ProductUpdateView.as_view()),
    path('delete/<int:pk>/', ProductDeleteView.as_view()),

    # CATEGORIES
    path('categories/', CategoryListView.as_view()),
    path('categories/update/<int:pk>/', CategoryUpdateView.as_view()),
    path('categories/delete/<int:pk>/', CategoryDeleteView.as_view()),

    # SEARCH
    path('search/', ProductSearchView.as_view()),
]