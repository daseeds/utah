import datetime
from django.utils import timezone
from django.db import models
from django.core.files.images import ImageFile

class Story(models.Model):
	pub_date = models.DateTimeField('date published')
	title = models.CharField(max_length=200)
	def __unicode__(self):
		return self.title
		
class Picture(models.Model):
	story = models.ForeignKey(Story)
#	path = models.ImageField()
	image = models.FileField(upload_to="images/")
	is_main = models.BooleanField()
	width = models.IntegerField(blank=True, null=True)
	height = models.IntegerField(blank=True, null=True)
	def __unicode__(self):
		return self.image.name
 	def thumbnail(self):      
		return """<a href="/media/%s"><img border="0" alt="" src="/media/%s" height="40" /></a>""" % ((self.image.name, self.image.name))
	thumbnail.allow_tags = True


class Video(models.Model):
	story = models.ForeignKey(Story)
	path = models.CharField(max_length=200)
	def __unicode__(self):
		return self.path

class Paragraph(models.Model):
	story = models.ForeignKey(Story)
	text = models.CharField(max_length=4000)
	def __unicode__(self):
		return self.story
		