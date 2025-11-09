import { gql } from '@apollo/client';

export const GET_DEPUTE = gql`
  query GetDepute {
    depute {
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

export const GET_DEPUTE_SIMPLE = gql`
  query GetDeputeSimple {
    depute {
      id
      nom
      departement_id
      commission_permanente_id
      photo
    }
  }
`;

export const GET_DEPUTE_BY_ID = gql`
  query GetDeputeById($id: Int!) {
    depute(id: $id) {
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
  query SearchDepute($deputeName: String!) {
    depute(nom: $searchTerm) {
      id
      nom
      departement_id
      commission_permanente_id
      photo
    }
  }
`;

export const SEARCH_DEPUTE_VOTES_BY_NAME = gql`
  query SearchDeputeVotes($deputeName: String!) {
    deputeByName: depute(nom: $deputeName) {
      vote_id
      depute_id
      vote_category
      depute_nom
      vote_titre
    }
  }
`;
