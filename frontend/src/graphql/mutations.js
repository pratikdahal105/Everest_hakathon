import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      user {
        id
        username
      }
    }
  }
`;
