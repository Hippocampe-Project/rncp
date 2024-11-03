""" File including debugging and logging utilities to centralize log management and provide detailed log files for model and camera"""

import logging
from typing import Optional


def setup_logger(
    name: str, log_file: Optional[str] = None, level: int = logging.INFO
) -> logging.Logger:
    """
    Provide dynamic configuration of logger with file or console output

    :name: Name of the logger.
    :param log_file: Optional file path for the log output. If not specify, log will be consider as terminal output during run time.
    :param level: Logging level (default : INFO)
    :return: Logger object configured according to specified parameters.

    """

    # Create logger
    logger = logging.getLogger(name)
    logger.setLevel(level)

    # Remove any existing handlers
    logger.handlers.clear()

    # File handler
    if log_file:
        file_handler = logging.FileHandler(log_file, mode="a")
        file_handler.setFormatter(
            logging.Formatter(f"%(asctime)s %(levelname)s %(message)s")
        )
        logger.addHandler(file_handler)

    # Console handler
    else:
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(
            logging.Formatter(f"%(asctime)s %(levelname)s %(message)s")
        )
        logger.addHandler(console_handler)

    # Prevent propagation to parent loggers
    logger.propagate = False

    return logger


""" Create logger instance """

# Terminal log
info_logger = setup_logger("info_logger")
debug_logger = setup_logger("debug_logger", level=logging.DEBUG)
error_logger = setup_logger("error_logger", level=logging.ERROR)
