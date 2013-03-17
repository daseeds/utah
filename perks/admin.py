from django.contrib import admin
from perks.models import Perk, Content

class ContentInline(admin.TabularInline):
	model = Content
	extra = 3

	
class PerkAdmin(admin.ModelAdmin):
	list_display = ('title', 'pub_date')
	inlines = [ContentInline]
	list_filter = ['pub_date']
	search_fields = ['title']
	date_hierarchy = 'pub_date'

admin.site.register(Perk, PerkAdmin)
