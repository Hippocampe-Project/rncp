import sys
import os
import logging
import smtplib
import traceback

from globals.config_variables import (
    SMTP_PORT,
    SMTP_SERVER,
    EMAIL_PASSWORD,
    EMAIL_RECEIVER,
    EMAIL_SENDER,
)


def send_error_email(content: str):
    """Sends an email with the error details."""

    logging.warning("Sending alert email...")
    subject = "🚨 RNCP Scraping Error Alert"
    body = f"An error occurred during scraping execution :\n\n{content}"

    email_message = f"Subject: {subject}\n\n{body}"

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, EMAIL_RECEIVER, email_message)
            logging.info("Alert email sent.")
    except Exception as e:
        logging.error(f"Failed to send email: {e}")


def custom_exit(error_msg: str):
    """Handles errors and sends an email before exiting."""
    logging.warning("Major failure occurred")
    stack = "".join(traceback.format_stack())
    alert_content = (
        f"🚨 RNCP Scraper Failure\n\n"
        f"📄 Error message:\n{error_msg}\n\n"
        f"🧵 Stack trace:\n{stack}"
    )
    send_error_email(alert_content)
    logging.warning("❌ EXITING NOW ❌")
    sys.exit(1)
