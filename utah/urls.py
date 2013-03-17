import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.views.generic.base import TemplateView 
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
	url(r"^$", TemplateView.as_view(template_name='homepage.html'), name="home"),
    url(r'^polls/', include('polls.urls', namespace="polls")),
	url(r'^stories/', include('stories.urls', namespace="stories")),
    url(r'^perks/', include('perks.urls', namespace="perks")),
	url(r'^admin/', include(admin.site.urls)),
    # Examples:
    # url(r'^$', 'utah.views.home', name='home'),
    # url(r'^utah/', include('utah.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:

)


if settings.DEBUG:
	urlpatterns += patterns('',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
        }),
        url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.STATIC_ROOT,
        }),
)