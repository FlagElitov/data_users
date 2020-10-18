import { gql } from "@apollo/client";

const GET_USERS_QUERY = gql`
  query users {
    users {
      id
      name
      email
    }
  }
`;
const CREATE_USER_MUTATION = gql`
  mutation createUser {
    createUser(input: { name: "", email: "" }) {
      name
      email
    }
  }
`;

export { GET_USERS_QUERY, CREATE_USER_MUTATION };
