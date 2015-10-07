"""
Django settings for crous project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'fau7**#kz%b5k&4mm6e-ug=8npa*g6l*81s^a*)6+fd)3hf+3c'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

ADMINS = (
  ('Edouard COMTET', 'edouard.comtet@gmail.com'),
)

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main',
    'filter',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'crous.urls'

WSGI_APPLICATION = 'crous.wsgi.application'


# DJANGO BAN
BANISH_ENABLED = True

BANISH_EMPTY_UA = True

BANISH_ABUSE_THRESHOLD = 15

BANISH_MESSAGE = """
Impossible d'afficher cette page.<br />
<br />
Pour tenter de diagnostiquer le probleme, procedez de la maniere suivante :
<br />
1) Reactualisez votre page.<br />
2) Desactivez/Reactivez votre connexion Wi-Fi.<br />
3) Redemarrez votre ordinateur.<br />
4) Debranchez/Rebranchez votre Modem.<br />
5) Si le probleme n'est toujours pas resolu, recommencez l'operation plusieurs fois.<br />
<br />
Code d'erreur : 007 ERR_INTERNE_SalvaMG<br />
<br />
En dernier recours, vous pouvez contacter <a href="mailto:webmaster@bnei.org">webmaster@bnei.org</a>
"""


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'fr-FR'

TIME_ZONE = 'Europe/Paris'

USE_I18N = True

USE_L10N = True

USE_TZ = True

APPEND_SLASH = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

TEMPLATE_DIRS = (
  "/var/www/crous/templates/",
)

STATICFILES_DIRS = (
    "/var/www/crous/assets/",
)

STATIC_ROOT = '/var/www/crous/statics'

STATIC_URL = '/static/'

MEDIA_ROOT = '/var/www/crous/uploads'

MEDIA_URL = '/upload/'
