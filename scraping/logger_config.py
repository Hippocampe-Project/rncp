""" This is useless i just like *colors* """

import logging
import colorlog


def setup_logging():
    # Define a custom formatter with specific colors for each log part
    formatter = colorlog.ColoredFormatter(
        "%(log_color)s%(levelname)-8s%(reset)s | "
        "%(blue)s[%(asctime)s]%(reset)s | "
        "%(green)s%(name)s%(reset)s | "
        "%(purple)s%(funcName)s%(reset)s | "
        "%(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",  # Custom date format
        log_colors={
            "DEBUG": "cyan",
            "INFO": "green",
            "WARNING": "yellow",
            "ERROR": "red",
            "CRITICAL": "bold_red",
        },
    )

    # Set up the handler and logger
    handler = colorlog.StreamHandler()
    handler.setFormatter(formatter)

    logger = colorlog.getLogger()
    logger.addHandler(handler)
    logger.setLevel(logging.DEBUG)
    return logger


# Initialize the logger
logger = setup_logging()
