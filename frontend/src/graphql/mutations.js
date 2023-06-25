import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!, $phoneNumber: String!) {
    createUser(username: $username, password: $password, phoneNumber: $phoneNumber) {
      user {
        id
        username
      }
    }
  }
`;