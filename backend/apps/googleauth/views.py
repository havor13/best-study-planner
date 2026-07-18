from django.shortcuts import redirect
from django.http import HttpResponse
from django.conf import settings
from google_auth_oauthlib.flow import Flow
from .models import GoogleCredentials
import logging

logger = logging.getLogger(__name__)

def google_login(request):
    try:
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

        # ✅ Explicitly set redirect_uri for production
        flow.redirect_uri = settings.GOOGLE_REDIRECT_URI

        auth_url, _ = flow.authorization_url(
            prompt="consent",
            access_type="offline",
            include_granted_scopes="true"
        )

        logger.info(f"Redirecting to Google OAuth URL: {auth_url}")
        return redirect(auth_url)

    except Exception as e:
        logger.error(f"Google login error: {e}")
        return HttpResponse("Error initiating Google OAuth flow", status=500)


def oauth2callback(request):
    code = request.GET.get("code")
    if not code:
        return HttpResponse("Missing authorization code", status=400)

    try:
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
            logger.info(f"Google Calendar connected for user {request.user.username}")
            return HttpResponse("Google Calendar connected successfully!")

        else:
            logger.warning("Unauthenticated user attempted OAuth callback")
            return HttpResponse("User not authenticated", status=401)

    except Exception as e:
        logger.error(f"OAuth2 callback error: {e}")
        return HttpResponse("Error completing Google OAuth flow", status=500)
