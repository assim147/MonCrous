from django import template

register = template.Library()

@register.filter
def modulo(x, y):   
    return x % y