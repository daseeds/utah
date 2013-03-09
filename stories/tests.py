"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase
import datetime
from django.utils import timezone
from django.test import TestCase
from django.core.urlresolvers import reverse
from stories.models import Story

def create_story(title, image, days):
    return Story.objects.create(title=title, image=image,
        pub_date=timezone.now() + datetime.timedelta(days=days))

class StoriesTest(TestCase):
	def test_index_view_with_no_story(self):
		"""
		If no stories exist, an appropriate message should be displayed.
		"""
		response = self.client.get(reverse('stories:index'))
		self.assertEqual(response.status_code, 200)
		self.assertContains(response, "No stories are available.")
		self.assertQuerysetEqual(response.context['story_list'], [])
	def test_index_view_with_a_story(self):
		"""
		Polls with a pub_date in the past should be displayed on the index page.
		"""
		create_story(title="Test1", image="D:\Dev\SandBoxes\juganville.com\images\grandes\derriere1000.jpg", days=-30)
		response = self.client.get(reverse('stories:index'))
		self.assertQuerysetEqual(
			response.context['latest_poll_list'],
			['<Poll: Test1>']
		)