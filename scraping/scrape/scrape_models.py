import locale
import logging
from datetime import datetime
import re


class Representative:
    def __init__(
        self,
        name,
        gender,
        birth_date,
        department,
        circonscription,
        commission,
        profession,
        substitute,
        political_group,
        picture,
    ):
        self.name = name
        self.gender = self.get_gender(gender)
        self.birth_date = self.format_birth_date(birth_date)
        self.department = department
        self.circonscription = self.format_circonscription(circonscription)
        self.commission = commission
        self.profession = profession
        self.substitute = substitute
        self.political_group = political_group
        self.picture = picture

    def __repr__(self):
        return (
            f"Representative(name={self.name}, "
            f"gender={self.gender}, "
            f"birth_date={self.birth_date}, "
            f"department={self.department}, "
            f"circonscription={self.circonscription}, "
            f"commission={self.commission}, "
            f"profession={self.profession}, "
            f"substitute={self.substitute}, "
            f"political_group={self.political_group}, "
            f"picture={self.picture})"
        )

    def to_dict(self):
        return {
            "name": self.name,
            "gender": self.gender,
            "birth_date": self.birth_date,
            "department": self.department,
            "circonscription": self.circonscription,
            "commission": self.commission,
            "profession": self.profession,
            "substitute": self.substitute,
            "political_group": self.political_group,
            "picture": self.picture,
        }

    def get_gender(self, gender):
        if gender == "M.":
            return "male"
        elif gender == "Mme":
            return "female"
        else:
            logging.warning(f"Error in parsing representative gender for : {self.name}")
            return None

    def format_birth_date(self, birth_date):

        parts = birth_date.split(" ")
        day = parts[2]
        month = parts[3]
        year = parts[4]

        date = f"{day} {month} {year}"

        # TODO: from datetime import datetime
        # import locale

        # locale.setlocale(locale.LC_ALL, 'de_DE')
        # date_str_de_DE = '16-Dezember-2022 Freitag'  # de_DE locale
        # datetime_object = datetime.strptime(date_str_de_DE, '%d-%B-%Y %A')
        # print(type(datetime_object))
        # print(datetime_object)

        try:
            # Month mapping from French to numerical format
            month_mapping = {
                "janvier": "01",
                "février": "02",
                "mars": "03",
                "avril": "04",
                "mai": "05",
                "juin": "06",
                "juillet": "07",
                "août": "08",
                "septembre": "09",
                "octobre": "10",
                "novembre": "11",
                "décembre": "12",
            }

            month_number = month_mapping.get(month.lower())
            formatted_date = f"{day.zfill(2)}-{month_number}-{year}"

            return formatted_date

        except (IndexError, ValueError) as e:
            print(f"Error in parsing birth date for {self.name} representative : {e}")

    def format_circonscription(self, circonscription):
        full_circonscription = f"Circonscription n°{str(circonscription)}"
        return full_circonscription


class PoliticalGroup:
    def __init__(self, name, president, title):
        self.name = name
        self.president = self.format_president_name(president)
        self.title = title
        self.gender = self.get_gender(title)

    def format_president_name(self, name):
        return name.replace("\xa0", " ")

    def __repr__(self):
        return (
            f"PoliticalGroup(name={self.name}, "
            f"president={self.president}, "
            f"title={self.title})"
        )

    def to_dict(self):
        return {
            "name": self.name,
            "president": self.president,
            "title": self.title,
        }

    def get_gender(self, title):
        if title == "Président":
            return "male"
        elif title == "Présidente":
            return "female"
        else:
            logging.warning(f"Error in parsing president gender for : {self.name}")
            return None


class StandingCommittees:
    def __init__(self, name, mission, logo):
        self.name = name
        self.mission = mission
        self.logo = logo

    def __repr__(self):
        return (
            f"StandingCommittees(name={self.name}, "
            f"mission={self.mission}, "
            f"logo={self.logo})"
        )

    def to_dict(self):
        return {
            "name": self.name,
            "mission": self.mission,
            "logo": self.logo,
        }


class Departement:
    def __init__(self, name):
        self.name = self.format_departement_name(name)

    def __repr__(self):
        return f"Departement(name={self.name})"

    def to_dict(self):
        return {"name": self.name}

    def format_departement_name(self, name):
        parts = name.split(" ", 1)
        return parts[0]
