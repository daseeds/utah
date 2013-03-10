from django.conf.urls import patterns, url
from django.views.generic import DetailView, ListView
from stories.models import Story
from django.utils import timezone

urlpatterns = patterns('',
	url(r'^$',         
		ListView.as_view(
			queryset=Story.objects.order_by('-pub_date')),
	name='index'),
	url(r'^json/$',         
		ListView.as_view(
			queryset=Story.objects.order_by('-pub_date'),
			template_name='stories/story_list.json'),
	name='index'),
    # ex: /stories/5/
	url(r'^(?P<pk>\d+)/$', 
        DetailView.as_view(model=Story),
	name='detail'),
)