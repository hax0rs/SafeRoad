from django.shortcuts import render

from django.http import HttpResponse

from .models import Crash

POSSIBLE_FILTERS = ['crash_severity', 'hour', 'month', 'year', 'atmospheric_condition']

def index(request):

    filters = {}
    lon1 = request.GET.get('lon1','')
    lat1 = request.GET.get('lat1','')
    lon2 = request.GET.get('lon2','')
    lat2 = request.GET.get('lat2','')
    # we have our args!
    if not '' in [lon1, lat1, lon2, lat2]:
        for pos_filter in POSSIBLE_FILTERS:
            value = request.GET.get(pos_filter,'')
            if value != '':
                filters[pos_filter] = value
        crashes = box_crashes(lon1, lat1, lon2, lat2)
        for filter_name, filter_value in filters.items():
            crashes = filter_crashes(filter_name, filter_value, passthrough=crashes)
        return HttpResponse("found {} records. IDs: {}".format(len(crashes), " ".join([str(c.id) for c in crashes])))
    return HttpResponse("Error. Check args. Possible: lon1, lat1, lon2, lat2")

def box_crashes(lon1, lat1, lon2, lat2, passthrough=None):
    flon1, flat1 = float(lon1), float(lat1)
    flon2, flat2 = float(lon2), float(lat2)
    minlon, maxlon = min([flon1, flon2]), max([flon1, flon2])
    minlat, maxlat = min([flat1, flat2]), max([flat1, flat2])
    filters = {'longitude__gte': minlon, 'longitude__lte': maxlon, 'latitude__gte': minlat, 'latitude__lte':maxlat }
    if passthrough is not None:
        return passthrough.filter(**filters)
    else:
        return Crash.objects.filter(**filters)

def filter_crashes(filter_name, value, passthrough=None):
    filters = {(filter_name + "__exact") : value}
    print(filters)
    if passthrough is not None:
        return passthrough.filter(**filters)
    else:
        return Crash.objects.filter(**filters)
