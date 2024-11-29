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
            f"political_group={self.political_group}), "
            f"picture={self.picture})"
        )

    def get_gender(self, gender):
        if gender == "M.":
            return "male"
        elif gender == "Mme":
            return "female"
        else:
            return "Error in parsing representative gender"

    def format_birth_date(self, birth_date):

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

            parts = birth_date.split(" ")
            day = parts[2]
            month = parts[3]
            year = parts[4]

            month_number = month_mapping.get(month.lower())
            formatted_date = f"{year}-{month_number}-{day.zfill(2)}"

            return formatted_date

        except (IndexError, ValueError) as e:
            print(f"Error in parsing birth date for {self.name} representative : {e}")

    def format_circonscription(self, circonscription):
        full_circonscription = f"Circonscription n°{str(circonscription)}"
        return full_circonscription


class PoliticalGroup:
    def __init__(self, name, president):
        self.name = name
        self.president = president


class StandingCommittees:
    def __init__(self, name, object):
        self.name = name
        self.object = object
