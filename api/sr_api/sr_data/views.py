from django.shortcuts import render

from django.http import HttpResponse

from django.db.models import Sum

from django.http import JsonResponse

from django.db import connection

from .models import Crash

import math
import time

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
        if len(crashes) > 60000:
            cool_stuff = sub_box(crashes, 300, 200, lon1, lat1, lon2, lat2)
            return JsonResponse({ "description" : "[{str(long),str(lat),int(casualty_total)}]", "data" :[{"long":x[0],"lat":x[1],"casualty_total":x[2]} for x in cool_stuff]})
        else:
            return JsonResponse({ "description" : "[{str(long),str(lat),int(casualty_total)}]", "data" :[{"long":x.longitude,"lat":x.latitude,"casualty_total":x.count_casualty_total} for x in crashes]})
        return HttpResponse("found {} records. IDs: {}".format(len(crashes), " ".join([str(c.id) for c in crashes])))
    return HttpResponse("Error. Check args. Possible: lon1, lat1, lon2, lat2")

def yearly(request):
    fatal_data = Crash.objects.all().values('year').annotate(cas = Sum('count_casualty_fatality')).order_by('year')
    total_data = Crash.objects.all().values('year').annotate(cas = Sum('count_casualty_total')).order_by('year')
    datas = {}
    for item in fatal_data:
        datas[item["year"]] = datas.get(item["year"], [])
        datas[item["year"]].append(item["cas"])
    for item in total_data:
        datas[item["year"]] = datas.get(item["year"], [])
        datas[item["year"]].append(item["cas"])
    print(datas)
    return JsonResponse({ "description" : "[{str(year),int(fatality_count),int(total_casualty)}]", "data" :[{"year":x, "fatality_count":y[0], "total_casualty":y[1]} for x, y in datas.items()]})


def hourly(request):
    data_value = Crash.objects.all().values('hour').annotate(cas = Sum('count_casualty_total')).order_by('hour')
    datas = {}
    for items in data_value:
        datas[items["hour"]] = items["cas"]
    return JsonResponse({ "description" : "[{str(hour),int(casualties)}]", "data" :[{"hour":x,"fatality_count":y} for x, y in datas.items()]})

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
    if passthrough is not None:
        return passthrough.filter(**filters)
    else:
        return Crash.objects.filter(**filters)

def sub_box(passthrough, width, height, lon1, lat1, lon2, lat2):
    cool_stuff = []
    flon1, flat1 = float(lon1), float(lat1)
    flon2, flat2 = float(lon2), float(lat2)
    minlon, maxlon = min([flon1, flon2]), max([flon1, flon2])
    minlat, maxlat = min([flat1, flat2]), max([flat1, flat2])
    dislon, dislat = (maxlon-minlon), (maxlat-minlat)

    cool_stuff = {}

    for x in range(width):
        for y in range(height):
            cool_stuff[(x, y)] = 0

    cwidth = dislon/width
    cheight = dislat/height
    for i in passthrough:
        x = math.floor((float(i.longitude) - minlon)/cwidth)
        y = math.floor((float(i.latitude) - minlat)/cheight)
        cool_stuff[(x, y)] += i.count_casualty_total

    final_points = []

    for x in range(width):
        for y in range(height):
            if cool_stuff[(x,y)] != 0:
                final_points.append(((x+0.5)*cwidth + minlon, (y+0.5)*cheight + minlat, cool_stuff[(x,y)]))
    return final_points
