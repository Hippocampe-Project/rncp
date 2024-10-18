from scrap_Deputes import scrape_political_groups


def main():
    political_groups_links = scrape_political_groups("https://www.assemblee-nationale.fr/dyn/les-groupes-politiques")
    print(political_groups_links)
    return political_groups_links
    




if __name__ == "__main__":
    main()