# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planeswalkers', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='match',
            name='player1',
            field=models.ForeignKey(related_name='player1_matches', to='planeswalkers.Player', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='match',
            name='player2',
            field=models.ForeignKey(related_name='player2_matches', to='planeswalkers.Player', null=True),
            preserve_default=True,
        ),
    ]
