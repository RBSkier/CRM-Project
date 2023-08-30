# urls.py

from django.urls import path
from rank.views import RankView,MyselfRankView

urlpatterns = [
    path('', RankView.as_view(), name='rank'),
    path('myself/', MyselfRankView.as_view(), name='myrank'),
]