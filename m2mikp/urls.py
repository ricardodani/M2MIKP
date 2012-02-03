# -*- coding: utf-8 -*-

from django.conf.urls.defaults import *

urlpatterns = patterns('m2mikp.views',
    url(r'^base/$', 'base', name='m2mikp_base'),
    url(r'^get_thumbs/$', 'get_thumbs', name='m2mikp_get_thumbs'),
)
