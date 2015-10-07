#-*- coding: utf-8 -*-
from django.db import models

class Post(models.Model):
    text = models.CharField(max_length=100)
    ip = models.IPAddressField()
    date = models.DateTimeField(auto_now_add=True, auto_now=False)
    valid = models.BooleanField(default=False)
    

    def __unicode__(self):
        return u"%s" % self.text
		
class Lien(models.Model):
	id = models.IntegerField(primary_key=True)
	hyperlien = models.CharField(max_length=200)
	def __unicode__(self):
		return u"%s" % self.hyperlien