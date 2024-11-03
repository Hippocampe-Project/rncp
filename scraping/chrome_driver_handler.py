from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from logging_utils import info_logger, error_logger


class ChromeDriverHandler:
    def __init__(self, chrome_bin: str, chrome_driver_path: str):
        self.chrome_bin = chrome_bin
        self.chrome_driver_path = chrome_driver_path
        self.driver = None

    def _set_chrome_options(self) -> webdriver.ChromeOptions:
        """Set up Chrome options."""
        chrome_options = webdriver.ChromeOptions()
        chrome_options.binary_location = self.chrome_bin
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("window-size=1400,2100")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-software-rasterizer")
        return chrome_options

    def get_driver(self) -> webdriver.Chrome:
        """Create and return a Chrome WebDriver instance."""
        if self.driver is None:
            info_logger.info("Instantiating chrome web driver...")
            chrome_options = self._set_chrome_options()
            service = Service(executable_path=self.chrome_driver_path)
            self.driver = webdriver.Chrome(service=service, options=chrome_options)
        return self.driver

    def quit_driver(self):
        """Quit the Chrome driver."""
        if self.driver is not None:
            info_logger.info("Closing chrome web driver")
            self.driver.quit()
            self.driver = None
