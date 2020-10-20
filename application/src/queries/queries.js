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

const GET_USER_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      email
      name
    }
  }
`;
const CREATE_USER_MUTATION = gql`
  mutation createUser($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
      name
      email
    }
  }
`;
const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: ID!, $email: String, $name: String) {
    updateUser(id: $id, input: { name: $name, email: $email }) {
      name
      email
    }
  }
`;
const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export {
  GET_USERS_QUERY,
  GET_USER_QUERY,
  CREATE_USER_MUTATION,
  UPDATE_USER_MUTATION,
  DELETE_USER_MUTATION,
};
