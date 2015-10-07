# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Lien',
            fields=[
                ('id', models.IntegerField(serialize=False, primary_key=True)),
                ('link', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('text', models.CharField(max_length=100)),
                ('ip', models.IPAddressField()),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('valid', models.BooleanField(default=False)),
            ],
        ),
    ]
