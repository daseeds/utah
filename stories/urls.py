from django.conf.urls import patterns, url
from django.views.generic import DetailView, ListView
from stories.models import Story
from django.utils import timezone

urlpatterns = patterns('',
	url(r'^$',         
		ListView.as_view(
			queryset=Story.objects.filter(pub_date__lte=timezone.now).order_by('-pub_date')),
	name='index'),
    # ex: /stories/5/
    url(r'^(?P<pk>\d+)/$', 
        DetailView.as_view(
            queryset=Story.objects.filter(pub_date__lte=timezone.now),
            template_name='stories/detail.html'),
	name='detail'),
)