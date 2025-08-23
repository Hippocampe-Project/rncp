import { gql } from '@apollo/client';

export const GET_DEPUTIES = gql`
  query GetDeputies {
    deputies {
      id
      nom
      date_naissance
      sexe
      departement_id
      circonscription
      commission_permanente_id
      profession
      suppleant
      parti_id
      photo
      activite
      activite_timestamp
    }
  }
`;

export const GET_DEPUTIES_SIMPLE = gql`
  query GetDeputiesSimple {
    deputies {
      id
      nom
      departement_id
      commission_permanente_id
      photo
    }
  }
`;

export const GET_DEPUTY_BY_ID = gql`
  query GetDeputyById($id: Int!) {
    deputy(id: $id) {
      id
      nom
      date_naissance
      sexe
      departement_id
      circonscription
      commission_permanente_id
      profession
      suppleant
      parti_id
      photo
      activite
      activite_timestamp
    }
  }
`;

export const SEARCH_DEPUTE_BY_NAME = gql`
  query SearchDeputies($searchTerm: String!) {
    deputies(nom: $searchTerm) {
      id
      nom
      departement_id
      commission_permanente_id
      photo
    }
  }
`;