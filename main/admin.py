#-*- coding: utf-8 -*-
from django.contrib import admin
from main.models import Post
from main.models import Lien
def make_published(modeladmin, request, queryset):
    queryset.update(valid=True)
make_published.short_description = "Valider les posts sélectionnés"

class PostAdmin(admin.ModelAdmin):
    list_display   = ('text', 'ip', 'date', 'valid')
    list_filter    = ('date', 'valid')
    date_hierarchy = 'date'
    ordering       = ('-date', )
    search_fields  = ('text', 'date', 'ip')
    actions = [make_published]
    
    def has_add_permission(self, request):
        return False
    
    def get_readonly_fields(self, request, obj=None):
        if obj:
            return ['ip', 'date']
        else:
            return []
class LienAdmin(admin.ModelAdmin):
	list_display = ('id','hyperlien')
	def has_add_permission(self, request):
		return False
	
admin.site.register(Post, PostAdmin)

admin.site.register(Lien,LienAdmin)