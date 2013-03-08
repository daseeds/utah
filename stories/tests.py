"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase

from django.utils import timezone
from django.test import TestCase
from django.core.urlresolvers import reverse
from stories.models import Story

class StoriesTest(TestCase):
	def test_index_view_with_no_polls(self):
		"""
		If no stories exist, an appropriate message should be displayed.
		"""
		response = self.client.get(reverse('stories:index'))
		self.assertEqual(response.status_code, 200)
		self.assertContains(response, "No stories are available.")
		self.assertQuerysetEqual(response.context['story_list'], [])
