import sys
import os
import logging
import smtplib
import traceback
from dotenv import load_dotenv

load_dotenv()


# Email Configurations
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465
EMAIL_SENDER = os.getenv("EMAIL")
EMAIL_RECEIVER = os.getenv("EMAIL")
EMAIL_PASSWORD = os.getenv("APP_PASSWORD")


def send_error_email(error_message):
    """Sends an email with the error details."""
    subject = "🚨 RNCP Scraping Error Alert"
    body = f"An error occurred in the script:\n\n{error_message}"

    email_message = f"Subject: {subject}\n\n{body}"

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, EMAIL_RECEIVER, email_message)
    except Exception as e:
        logging.error(f"Failed to send email: {e}")


def custom_exit(status=1):
    """Handles errors and sends an email before exiting."""
    error_message = "".join(traceback.format_stack())
    send_error_email(error_message)
    sys.__exit(status)  # Call the original sys.exit


sys.exit = custom_exit  # Override sys.exit globally
