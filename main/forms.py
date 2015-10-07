#-*- coding: utf-8 -*-
from django import forms
from main.models import Post

class PostForm(forms.ModelForm):
    text = forms.CharField(label='', min_length=3, max_length=100)
    
    class Meta:
        model = Post
        fields = ('text',)

    def clean_text(self):
        text = self.cleaned_data['text']
        text_check = text.lower()
        text_check = ''.join(e for e in text_check if e.isalnum())
        forbidden = ["unef", "uni", "fage", "met", "pde", "2014", ".com", ".org", ".fr", "agi", "cmb", "allocation", "communiste", "liberaliste", "pue", "merde", "syndicat", "bite", "pute", "encule", "censure", "moderateur", "modere", "expression", "liberte"]
        for s in forbidden:
            if s in text_check:
                raise forms.ValidationError("Mots interdits présents");
    
        return text
