# -*- coding: utf-8 -*-

import json
from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import redirect
from main.forms import PostForm
from main.models import Post
from datetime import datetime, timedelta
from django.db.models import Q
from django.core import serializers
from main.models import Lien
from django.shortcuts import render_to_response

import random
import copy

def homepage(request):
    return redirect('main.home')

def home(request):
	
	return homeTitle(request, 0)

def homeUnknown(request, id):
    return homeTitle(request, 0);

def ReturnLinks(request):
    
    jlist =list(Lien.objects.all().values_list('hyperlien',flat=True))
    js_data = json.dumps(jlist)
    return HttpResponse(js_data,content_type="application/json");


def homeTitle(request,id):    
    # -----------------------------------------
    # -- Formulaire d'ajout -------------------
    # -----------------------------------------    
    
    jlist =list(Lien.objects.all().values_list('hyperlien',flat=True))
    js_data = json.dumps(jlist)
    ReturnLinks(request);
    
    if request.method == 'POST':
        form = PostForm(request.POST)

        if form.is_valid():
            post = form.save(commit=False);
            
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')
            
            post.ip = ip;
            post.save();
            form = PostForm()
    else:
        form = PostForm()   
    
    # -----------------------------------------
    # -- Récupération des Posts ---------------
    # -----------------------------------------
    colors = ['#830012', '#F54A00', '#527CFF', '#818386']
    colorsC = 4;
    fonts = ['noto-sans',]
    fontsC = 1;
    datas = [];
    posts = [];
    numberLine = 10;
    statDouble = 85; 
    statAdd = 60;
    timeToLive = 30
    maxOrderer = 2          
    maxRandom = 150                                                                                                                                  
    count = 0; # Permet de ne pas dépasser un toutes les deux lignes

    now2 = datetime.today() - timedelta(seconds = timeToLive)
    postsOrdered = Post.objects.filter(Q(date__gt = now2)).order_by("-date")[:maxOrderer]
    postsRandom = Post.objects.filter(Q(valid = True)).order_by("?")[:maxRandom]    
    for post in postsOrdered:
        posts.append(post)
    for post in postsRandom:
        posts.append(post)
    total = len(posts) 

    # Enregistrement et creation
    for i in range(total - 1):
        count = count + 1;
        j = 0

        data = {};
        data['show'] = True
        data['double'] = False
        data['add'] = False
        data['color'] = colors[random.randint(0, colorsC - 1)]
        data['color'] = data['color'].replace('#', '')
        data['font'] = fonts[random.randint(0, fontsC - 1)]
        if i < maxOrderer:
            j = i
        else:
            if i < total - 1:
                j = random.randint(i, total - 1)
            else:
                j = i

        data['text'] = posts[j].text
        data['id'] = posts[j].id
        posts[j].text = posts[i].text
        posts[j].id = posts[i].id

        if i == 3:
            data['double'] = True
        else:
            data['add'] = random.randint(0, 100) > statAdd
            if data['add']:
                data['double'] = False
            else:
                if count > numberLine * 2 and i % numberLine != 9:
                    data['double'] = random.randint(0, 100) > statDouble
                    if data['double']:
                        count = 0
        
        datas.append(data)

    
	# Gestion des doubles
    for i in range(total - 1):
	    
		
        if datas[i]['double']:
            datasAdd=[]
        
            if (i == 3):
                datasAdd.append(datas[i])
    
            if i % numberLine == 0:
                datas[i+1]['show'] = False
                datasAdd.append(datas[i+1])
            else:
                datas[i-1]['show'] = False
                datasAdd.append(datas[i-1])
    
            datas[i+numberLine]['show'] = False
            datasAdd.append(datas[i+numberLine])
            if i % numberLine == numberLine - 2:
                datas[i+numberLine-1]['show'] = False
                datasAdd.append(datas[i+numberLine-1])
            else:
                datas[i+numberLine+1]['show'] = False
                datasAdd.append(datas[i+numberLine+1])
                    
            for data in datasAdd:
                data = copy.copy(data)
                data['show'] = True
            data['add'] = False
            data['double'] = False
            datas.append(data)
                    
        elif datas[i]['add']:
            data = copy.copy(datas[i])
            data['add'] = False
	    
		
        data['show'] = True
        data['double'] = False
        datas.append(data)

                
    title = "";
    if id > 0:
        count = Post.objects.filter(id = id).count()
        if count == 1:
            post = Post.objects.get(id = id);
            if post:
                title = post.text

    return render(request, 'main/home.html.twig', locals())
