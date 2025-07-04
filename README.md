# Scraping environement installation


## Dev env instal 
Dockerised environement 
1. Clone the GitHub repo
    git clone https://github.com/Hippocampe-Project/rncp
    cd repo
2. Build the Docker image locally
    docker build -t scraper .
3.  Run the Docker container
    docker-compose up -d scraper  
4. Runs container terminal 
    docker exec -it -your container's id- /bin/sh
5. Run main
    python3 main.py    


## Prod env install (for Ubuntu server)
1. Clone the GitHub repo
    git clone https://github.com/Hippocampe-Project/rncp
    cd repo
2. Install system-wide dependencies
    sudo apt install chromium-browser chromium-chromedriver
3. Install venv
    python3 -m venv venv
    source venv/bin/activate
4. Install python dependencies
    pip3 install -r requirements.txt
5. Setup env variables
    touch .env (at the root of the project's folder)
    nano .env --> edit the file with the help of the .env.exemple template
6. Run main
    python3 main.py   


## CONFIGURATION

### Prod configuration 

At the top of main.py, you can find a 'scraping configugation' section with variables. 

##### For the first scraping in prod env : 
<pre> ```python permanent_infos = True scrape_pol_groups_and_deputes = True scrape_votes = True database_insertion = True updating_votes = False updating_deputes = False ``` </pre>

##### The prod setting for automatic scraping is : 
<pre> ```python permanent_infos = False scrape_pol_groups_and_deputes = True scrape_votes = True database_insertion = True updating_votes = True updating_deputes = True ``` </pre>
Note: Scraping only the deputes that have changed is quite complex. For now, we re-scrape all deputes and perform the comparison and update directly during the database insertion step.