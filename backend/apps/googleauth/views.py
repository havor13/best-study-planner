from django.shortcuts import redirect
from django.http import HttpResponse
from django.conf import settings
from google_auth_oauthlib.flow import Flow
from .models import GoogleCredentials   # ✅ model to store tokens

def google_login(request):
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "redirect_uris": [settings.GOOGLE_REDIRECT_URI],
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token"
            }
        },
        scopes=["https://www.googleapis.com/auth/calendar.events"]
    )

    # ✅ Explicitly set redirect_uri
    flow.redirect_uri = settings.GOOGLE_REDIRECT_URI

    auth_url, _ = flow.authorization_url(
        prompt="consent",
        access_type="offline",
        include_granted_scopes="true"
    )
    return redirect(auth_url)


def oauth2callback(request):
    code = request.GET.get("code")
    if not code:
        return HttpResponse("Missing authorization code", status=400)

    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "redirect_uris": [settings.GOOGLE_REDIRECT_URI],
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token"
            }
        },
        scopes=["https://www.googleapis.com/auth/calendar.events"]
    )

    # ✅ Explicitly set redirect_uri again
    flow.redirect_uri = settings.GOOGLE_REDIRECT_URI

    flow.fetch_token(code=code)
    credentials = flow.credentials

    # ✅ Save credentials for logged-in user
    if request.user.is_authenticated:
        GoogleCredentials.objects.update_or_create(
            user=request.user,
            defaults={
                "access_token": credentials.token,
                "refresh_token": credentials.refresh_token,
                "token_expiry": credentials.expiry
            }
        )

    return HttpResponse("Google Calendar connected successfully!")
