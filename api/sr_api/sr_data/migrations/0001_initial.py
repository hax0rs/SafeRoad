# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Crash',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('crash_severity', models.CharField(max_length=128)),
                ('count_casualty_fatality', models.IntegerField(default=0)),
                ('count_casualty_hospitalised', models.IntegerField(default=0)),
                ('count_casualty_medically_treated', models.IntegerField(default=0)),
                ('count_casualty_minor_injury', models.IntegerField(default=0)),
                ('count_casualty_total', models.IntegerField(default=0)),
                ('crash_type', models.CharField(max_length=128)),
                ('atmospheric_condition', models.CharField(max_length=128)),
                ('controlling_authority', models.CharField(max_length=128)),
                ('DCA_code', models.IntegerField(default=0)),
                ('hour', models.IntegerField(default=0)),
                ('day_of_week', models.CharField(max_length=128)),
                ('month', models.CharField(max_length=128)),
                ('year', models.IntegerField(default=0)),
                ('DCA_description', models.CharField(max_length=512)),
                ('DCA_group_description', models.CharField(max_length=512)),
                ('lighting_condition', models.CharField(max_length=128)),
                ('nature', models.CharField(max_length=128)),
                ('reference_number', models.IntegerField(default=0)),
                ('road_horizon_alignment', models.CharField(max_length=128)),
                ('road_surface_condition', models.CharField(max_length=128)),
                ('road_vertical_alignment', models.CharField(max_length=128)),
                ('roadway_feature', models.CharField(max_length=128)),
                ('speed_limit', models.CharField(max_length=128)),
                ('traffic_control', models.CharField(max_length=128)),
                ('longitude', models.DecimalField(max_digits=12, decimal_places=6)),
                ('latitude', models.DecimalField(max_digits=12, decimal_places=6)),
            ],
        ),
    ]
