import { gql } from '@apollo/client';

export const GET_VOTES = gql`
  query GetVotes {
    votes {
      id
      titre
      dossier_legislatif
      numero_vote
      date
      num_votants
      num_pour
      num_contre
      num_abstention
      non_votants
      num_non_votants
      adopte
      num_absents
      votants_pour
      votants_contre
      votants_abstention
    }
  }
`;

export const GET_VOTES_SIMPLE = gql`
  query GetVotesSimple {
    votes {
      id
      titre
      numero_vote
      date
      adopte
    }
  }
`;

export const GET_VOTE_BY_ID = gql`
  query GetVoteById($id: Int!) {
    vote(id: $id) {
      id
      titre
      dossier_legislatif
      numero_vote
      date
      num_votants
      num_pour
      num_contre
      num_abstention
      non_votants
      num_non_votants
      adopte
      num_absents
      votants_pour
      votants_contre
      votants_abstention
    }
  }
`;

export const SEARCH_VOTES_BY_TITLE = gql`
  query SearchVotes($searchTerm: String!) {
    votes(titre: $searchTerm) {
      id
      titre
      numero_vote
      date
      adopte
      num_votants
      num_pour
      num_contre
      num_abstention
    }
  }
`;

export const SEARCH_VOTES_BY_DATE = gql`
  query SearchVotes($searchTerm: String!) {
    votes(date: $searchTerm) {
      id
      titre
      numero_vote
      date
      adopte
      num_votants
      num_pour
      num_contre
      num_abstention
    }
  }
`;

export const GET_VOTES_BY_DATE_RANGE = gql`
  query GetVotesByDateRange($startDate: String!, $endDate: String!) {
    votes(startDate: $startDate, endDate: $endDate) {
      id
      titre
      numero_vote
      date
      adopte
      num_votants
      num_pour
      num_contre
      num_abstention
    }
  }
`;

export const GET_RECENT_VOTES = gql`
  query GetRecentVotes($limit: Int = 10) {
    votes(limit: $limit, orderBy: "date", orderDirection: "DESC") {
      id
      titre
      numero_vote
      date
      adopte
      num_votants
      num_pour
      num_contre
      num_abstention
    }
  }
`;