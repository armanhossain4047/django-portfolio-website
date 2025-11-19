# arman_portfolio/urls.py (Main Project URLs)

from django.contrib import admin
from django.urls import path, include
# ✅ Import gulo shobcheye upore thakte hobe
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('portfolio.urls')),
]

# ✅ Ei block-ti ekhon settings-ke chinte parbe
if settings.DEBUG:
    # Aapnar STATICFILES_DIRS array-r prothom element-ti use kora holo
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])