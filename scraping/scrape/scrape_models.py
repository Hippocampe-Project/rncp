import locale
import logging
from datetime import datetime
import re

# N.b. : to_dict keys corresponds to databse collumns names


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
            "nom": self.name,
            "sexe": self.gender,
            "date_naissance": self.birth_date,
            "departement_name": self.department,  # FK
            "circonscription": self.circonscription,
            "commission_permanente_name": self.commission,  # FK
            "profession": self.profession,
            "suppleant": self.substitute,
            "parti_name": self.political_group,  # FK
            "photo": self.picture,
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

        # TODO: from datetime import datetime
        # import locale

        # date = f"{day} {month} {year}"

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
            "nom": self.name,
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


class Commissions:
    def __init__(self, name, mission, logo):
        self.name = name
        self.mission = mission
        self.logo = logo

    def __repr__(self):
        return (
            f"Commissions(name={self.name}, "
            f"mission={self.mission}, "
            f"logo={self.logo})"
        )

    def to_dict(self):
        return {
            "nom": self.name,
            "objet": self.mission,
            "logo": self.logo,
        }


class Departement:
    def __init__(self, name):
        self.name = self.format_departement_name(name)

    def __repr__(self):
        return f"Departement(name={self.name})"

    def to_dict(self):
        return {"nom": self.name}

    def format_departement_name(self, name):
        parts = name.split(" ", 1)
        return parts[0]


class Bill:
    def __init__(self, title, state):
        self.title = title
        self.state = state

    def __repr__(self):
        return f"Bills(title={self.title}, state={self.state}"

    def to_dict(self):
        return {"title": self.title, "state": self.state}


class Vote:
    def __init__(
        self,
        title,
        legislative_file,
        date,
        num_voters,
        num_for,
        num_against,
        num_abstention,
        vote_adoption_status,
        for_voters,
        against_voters,
        abstention_voters,
        non_voters,
    ):
        self.title = title
        self.legislative_file = legislative_file
        self.vote_number = self.get_vote_number(title)
        self.date = self.format_date(date)
        self.num_voters = int(num_voters)
        self.num_for = int(num_for)
        self.num_against = int(num_against)
        self.num_abstention = int(num_abstention)
        self.non_voters = non_voters if non_voters else None
        self.num_non_voters = len(non_voters)
        self.num_absentee = 577 - (self.num_voters + self.num_non_voters)
        self.adopted = self.is_vote_adopted(vote_adoption_status)
        self.for_voters = for_voters if for_voters else None
        self.against_voters = against_voters if against_voters else None
        self.abstention_voters = abstention_voters if abstention_voters else None

    def __repr__(self):
        return (
            f"Votes(title={self.title}, "
            f"legislative_file={self.legislative_file}, "
            f"vote_number={self.vote_number}, "
            f"date={self.date}, "
            f"num_voters={self.num_voters}, "
            f"num_for={self.num_for}, "
            f"num_against={self.num_against}, "
            f"num_abstention={self.num_abstention}, "
            f"num_absentee={self.num_absentee}, "
            f"num_non_voters={self.num_non_voters}, "
            f"adopted={self.adopted}, "
            f"for_voters={self.for_voters}, "
            f"against_voters={self.against_voters}, "
            f"abstention_voters={self.abstention_voters}, "
            f"non_voters={self.non_voters})"
        )

    def to_dict(self):
        return {
            "title": self.title,
            "legislative_file": self.legislative_file,
            "vote_number": self.vote_number,
            "date": self.date,
            "num_voters": self.num_voters,
            "num_for": self.num_for,
            "num_against": self.num_against,
            "num_abstention": self.num_abstention,
            "num_absentee": self.num_absentee,
            "num_non_voters": self.num_non_voters,
            "adopted": self.adopted,
            "for_voters": self.for_voters,
            "against_voters": self.against_voters,
            "abstention_voters": self.abstention_voters,
            "non_voters": self.non_voters,
        }

    def format_date(self, date_str):

        date_match = re.search(r"\d{1,2} \w+ \d{4}", date_str)
        if not date_match:
            return None
        else:
            date_str = date_match.group()

            parts = date_str.split(" ")
            day = parts[0]
            month = parts[1]
            year = parts[2]

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
                print(f"Error in parsing date for {self.title} vote : {e}")

    def get_vote_number(self, vote_title):
        match = re.search(r"n°\d+", vote_title)
        if match:
            return match.group()
        else:
            return None

    def is_vote_adopted(self, vote_status):
        if vote_status == "L'Assemblée nationale n'a pas adopté":
            return False
        elif vote_status == "L'Assemblée nationale a adopté":
            return True
        else:
            return None
