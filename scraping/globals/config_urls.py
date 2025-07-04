"""File to store all root urls"""

BASE_URL = "https://www2.assemblee-nationale.fr"
POLITICAL_GROUPS_URLS = f"{BASE_URL}/dyn/les-groupes-politiques"
COMMISSIONS_URL = f"{BASE_URL}/dyn/commissions-et-autres-organes"
DEPARTEMENTS_URLS = f"{BASE_URL}/deputes/liste/departements"
RECORDED_VOTE_URL = f"{BASE_URL}/dyn/17/scrutins?limit=100"  # 100 results / page
GOVERNMENT_BILLS = f"{BASE_URL}/documents/liste/(type)/projets-loi"
PARLEMENT_BILLS = f"{BASE_URL}/documents/liste/(type)/propositions-loi"
ENACTED_BILLS = f"{BASE_URL}/documents/liste/(type)/ta"  # à vérifier
POL_GROUP_CHANGES = (
    f"{BASE_URL}/17/les-groupes-politiques/modifications-a-la-composition-des-groupes"
)
