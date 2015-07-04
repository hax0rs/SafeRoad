# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sr_data', '0002_auto_20150704_1919'),
    ]

    operations = [
        migrations.DeleteModel(
            name='HappyIDs',
        ),
    ]
