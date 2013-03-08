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
	path = models.CharField(max_length=200)
#	path = models.ImageField()
	is_main = models.BooleanField()
	def __unicode__(self):
		return self.path
	def thumbnail(self):
		return """<a href="/media/%s"><img border="0" alt="" src="/media/%s" height="40" /></a>""" % ((self.path, self.path))
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
		