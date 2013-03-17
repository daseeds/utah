from django.conf.urls import patterns, url
from django.views.generic import DetailView, ListView
from perks.models import Perk
from django.utils import timezone

urlpatterns = patterns('',
	url(r'^$',         
		ListView.as_view(
			queryset=Perk.objects.order_by('-pub_date')),
	name='index'),
)