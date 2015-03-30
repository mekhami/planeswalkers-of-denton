from django.test import TestCase, RequestFactory
from planeswalkers.views import IndexView
from django.core.urlresolvers import resolve
from django.http import HttpRequest
from planeswalkers.models import Player, Match


# Create your tests here.
class HomePageTest(TestCase):
    def setUp(self):
        self.factory  = RequestFactory()

    def test_root_url_resolves_to_home_page_view(self):
        found = resolve('/')
        self.assertEqual(found.view_name, 'index')

    def test_home_page_returns_correct_html(self):
        request = self.factory.get('/')
        view =  IndexView.as_view()
        response = view(request).render()
        print response.content
        self.assertTrue(response.content.startswith('<html>'))
        self.assertIn('<title>Planeswalkers</title>', response.content)
        self.assertTrue(response.content.strip().endswith('</html>'))


class PlayerTest(TestCase):
    def test_player_has_name(self):
        player1 = Player()
        player1.firstName = 'Larry'
        player1.lastName = 'Vanderpool'

        self.assertEqual(player1.firstName, 'Larry')
        self.assertEqual(player1.lastName, 'Vanderpool')
        self.assertEqual(player1.__str__(), 'Larry Vanderpool')

class MatchTest(TestCase):
    def test_saving_match(self):
        player1 = Player(firstName='Larry', lastName='Vanderpool')
        player2 = Player(firstName='Joey', lastName='Liechty')
        match = Match(player1, player2)


