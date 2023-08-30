from rest_framework.views import APIView
from rest_framework.response import Response
from customers.models import Customer, CustomerFollowUpLog
from product.models import ProductFollowUpLog, Product
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated


def calculate_points(user):
    customer_points = 0
    customers_num = Customer.objects.filter(principal=user.username).count()
    follow_up_log_num = CustomerFollowUpLog.objects.filter(principal=user.username).count()
    customer_points += customers_num*2+follow_up_log_num
    sales_records = ProductFollowUpLog.objects.filter(sales_person=user.username)
    sales_amount = 0
    for record in sales_records:
        for product in Product.objects.filter(id = record.product_id):
            price = product.price
            sales_amount += price*record.sales_quantity
    if sales_amount is not None:
        customer_points += (sales_amount // 10000) * 5
    return customer_points

class RankView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        users = User.objects.all()
        users_points = {user.username: calculate_points(user) for user in users}
        sorted_customers = sorted(users_points.items(), key=lambda x: x[1], reverse=True)
        top_10_customers = sorted_customers[:10]
        response_data = [
            {
                "rank": rank + 1,
                "name": User.objects.get(username=username).username,
                "score": int(points)
            }
            for rank, (username, points) in enumerate(top_10_customers)
        ]
        return Response(response_data)

class MyselfRankView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        user_points = calculate_points(user)
        users = User.objects.all()
        users_points = {user.username: calculate_points(user) for user in users}
        sorted_users = sorted(users_points.items(), key=lambda x: x[1], reverse=True)
        user_rank = None
        for rank, (username, points) in enumerate(sorted_users):
            if username == user.username:
                user_rank = rank + 1
                break

        response_data = {
            "user_name": user.username,
            "rank": user_rank,
            "score": int(user_points)
        }
        return Response(response_data)