
from pathlib import Path
from datetime import timedelta



BASE_DIR = Path(__file__).resolve().parent.parent



SECRET_KEY = 'django-insecure-m5mt!sn+&@trq#+(iczbk!4%_c7#bg3h3bc6kaca%9%@$jyfn#'

DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'authentication',
     'corsheaders',
     'rest_framework',
     'rest_framework_simplejwt.token_blacklist' ,
     'hospitals' ,
     'citizens' ,
     'associations' ,
     'Alertes' ,
     'chatbot_app' ,
     'Event',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


AUTH_USER_MODEL = 'authentication.User'



LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

CORS_ORIGIN_WHITELIST = [
'http://localhost:3000'
]


STATIC_URL = 'static/'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

 #allows requests from any origin to access the Django application’s resources (api) :
CORS_ORIGIN_ALLOW_ALL = True 
CORS_ALLOW_ALL_ORIGINS = True


#to use JWT authentication as the default authentication class
#This ensures that all API endpoints are protected and require a valid JWT token
REST_FRAMEWORK = {
     'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
      ],
}

#sets various options related to the lifetime and behavior of access and refresh tokens
SIMPLE_JWT = {
     'ACCESS_TOKEN_LIFETIME': timedelta(minutes=10),
     'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
     'ROTATE_REFRESH_TOKENS': False,
     'BLACKLIST_AFTER_ROTATION': False
}


# Configuration Jazzmin

JAZZMIN_SETTINGS = {
    "site_title": "Blood Care",
    "site_header": "Blood Care Administration",
    "site_brand": "Blood Care",
    "avatar":"avatar",
    "welcome_sign": "Welcom to Blood Care Administration",
    "copyright": "Blood Care  © 2024",
    "show_sidebar": True,
    "navigation_expanded": True,
    "hide_apps": [],
    "hide_models": [],
    "order_with_respect_to": ["Authentication", "Alerts", "Associations", "Citizens","Hospitals"],

}

JAZZMIN_UI_TWEAKS = {
    "theme": "simplex",
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'bloodcare.website@gmail.com'
EMAIL_HOST_PASSWORD = 'peix swtg xezb klda'