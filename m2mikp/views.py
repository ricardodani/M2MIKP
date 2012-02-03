# -*- encoding: utf-8 -*-

from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import user_passes_test
from django.db.models.loading import get_model

@user_passes_test(lambda u: u.has_perm('filmes.can_change'))
def base(request):
    return render(request, 'm2mikp_base.html', {})

@user_passes_test(lambda u: u.has_perm('filmes.can_change'))
def get_thumbs(request):

    model_str = request.GET.get('model', None)
    ids_str = request.GET.get('ids', None)
    thumb_spec_str = request.GET.get('thumb_spec', None)
    original_image_str = request.GET.get('original_image', None)

    if model_str and ids_str and thumb_spec_str and original_image_str:
        # getting the model
        app_label, model_name = model_str.split('.')
        model = get_model(app_label, model_name)

        # getting the objects from database
        list_ids = [x for x in ids_str.split(',') if x]
        objects = model.objects.filter(id__in=list_ids).distinct()

        return render(request, 'm2mikp_thumbs.html', {
            'image_list': [
                {
                    'original': getattr(x, original_image_str, None),
                    'thumb': getattr(x, thumb_spec_str, None),
                    'title': getattr(x, '__unicode__', None),
                    'id': getattr(x, 'id', None)
                } for x in objects
            ]
        })

    return HttpResponse('')
