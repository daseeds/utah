from django.db import models

class Perk(models.Model):
	pub_date = models.DateTimeField('date published')
	title = models.CharField(max_length=200)
	PERK_TYPE_CHOICES = (
        ('no', 'Normal element'),
        ('in', 'Information'),
        ('al', 'Alert'),
	)
	type = models.CharField(max_length=2,
							choices=PERK_TYPE_CHOICES,
							default='no');
	def __unicode__(self):
		return self.title

class Content(models.Model):
	perk = models.ForeignKey(Perk)
	text = models.CharField(max_length=10000)
	def __unicode__(self):
		return self.text