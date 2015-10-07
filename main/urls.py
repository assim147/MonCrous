#-*- coding: utf-8 -*-

from django.conf.urls import patterns, url

urlpatterns = patterns('main.views',
    url(r'^home/$', 'home', name="main.home"),
    url(r'^home/(?P<id>\d+)/$', 'homeTitle', name='main.home.title'),
    url(r'^home/(?P<id>.*)/$', 'homeUnknown', name='main.home.title'),
	url(r'^home/$', 'ReturnLinks', name='main.home.title'),
)
