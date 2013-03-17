import datetime
import os
from django.utils import timezone
from django.db import models
from django.core.files.images import ImageFile
from django.core.files import File
from PIL import Image as PImage
from os.path import join as pjoin
from utah.settings import MEDIA_ROOT
import tempfile

class Story(models.Model):
	pub_date = models.DateTimeField('date published')
	title = models.CharField(max_length=200)
	def __unicode__(self):
		return self.title
		
class Picture(models.Model):
	story = models.ForeignKey(Story)
	image = models.ImageField(upload_to="images/")
#	image = models.FileField(upload_to="images/")
	is_main = models.BooleanField()
	width = models.IntegerField(blank=True, null=True)
	height = models.IntegerField(blank=True, null=True)
	thumbnail = models.ImageField(upload_to="images/", blank=True, null=True)
	thumbnail2 = models.ImageField(upload_to="images/", blank=True, null=True)
	def size(self):
		"""Image size."""
		return "%s x %s" % (self.width, self.height)
	def __unicode__(self):
		return self.image.name
 	def thumbnail(self):      
		return """<a href="/media/%s"><img border="0" alt="" src="/media/%s" height="40" /></a>""" % ((self.image.name, self.image.name))
	thumbnail.allow_tags = True
	def save(self, *args, **kwargs):
		"""Save image dimensions."""
		super(Picture, self).save(*args, **kwargs)
		im = PImage.open(pjoin(MEDIA_ROOT, self.image.name))
		self.width, self.height = im.size

		# large thumbnail
		# fn, ext = os.path.splitext(self.image.name)
		# im.thumbnail((128,128), PImage.ANTIALIAS)
		# thumb_fn = fn + "-thumb2" + ext
		# tf2 = tempfile.TemporaryFile()
		# im.save(tf2.name, "JPEG")
		# self.thumbnail2.save(thumb_fn, File(open(tf2.name)), save=False)
		# tf2.close()
		
		# small thumbnail
		# im.thumbnail((40,40), PImage.ANTIALIAS)
		# thumb_fn = fn + "-thumb" + ext
		# tf = tempfile.TemporaryFile()
		# im.save(tf.name, "JPEG")
		# self.thumbnail.save(thumb_fn, File(open(tf.name)), save=False)
		# tf.close()
		super(Picture, self).save(*args, ** kwargs)

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
		