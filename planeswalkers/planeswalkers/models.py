from django.db import models

# Create your models here.
class Tournament(models.Model):
    pass

class Round(models.Model):
    pass

class Player(models.Model):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)

    def __str__(self):
        return self.firstName + ' ' + self.lastName

class Match(models.Model):
    player1 = models.ForeignKey(Player, null=True, related_name="player1_matches")
    player2 = models.ForeignKey(Player, null=True, related_name="player2_matches")
