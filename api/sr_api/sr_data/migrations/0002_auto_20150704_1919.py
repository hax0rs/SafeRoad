# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sr_data', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='HappyIDs',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('happy_id', models.IntegerField()),
            ],
        ),
        migrations.AlterField(
            model_name='crash',
            name='latitude',
            field=models.DecimalField(max_digits=12, decimal_places=6, db_index=True),
        ),
        migrations.AlterField(
            model_name='crash',
            name='longitude',
            field=models.DecimalField(max_digits=12, decimal_places=6, db_index=True),
        ),
    ]
