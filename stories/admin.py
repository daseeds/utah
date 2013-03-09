from django.contrib import admin
from stories.models import Story, Picture, Video, Paragraph

class AlbumPictureInline(admin.TabularInline):
	model = Picture
	list_display = ('thumbnail')
	extra = 3

class AlbumVideoInline(admin.TabularInline):
    model = Video
    extra = 3

class ParagraphInline(admin.TabularInline):
    model = Paragraph
    extra = 3	
	
class StoryAdmin(admin.ModelAdmin):
	fieldsets = [
		(None,               {'fields': ['title']}),
		('Date information', {'fields': ['pub_date']}),
	]
	list_display = ('title', 'pub_date')
	inlines = [AlbumPictureInline, AlbumVideoInline, ParagraphInline]
	list_filter = ['pub_date']
	search_fields = ['title']
	date_hierarchy = 'pub_date'

class PictureAdmin(admin.ModelAdmin):
	list_display = ('image', 'thumbnail', 'is_main')
	def save_model(self, request, obj, form, change):
		obj.user = request.user
		obj.save()	

admin.site.register(Story, StoryAdmin)
admin.site.register(Picture, PictureAdmin)