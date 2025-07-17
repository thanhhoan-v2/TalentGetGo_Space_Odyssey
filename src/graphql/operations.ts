import { gql } from '@apollo/client';

// Example: Get all users
export const GET_USERS = gql`
  query GetUsers($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset, order_by: { created_at: desc }) {
      id
      name
      email
      created_at
      updated_at
    }
  }
`;

// Example: Get user by ID
export const GET_USER_BY_ID = gql`
  query GetUserById($id: uuid!) {
    users_by_pk(id: $id) {
      id
      name
      email
      created_at
      updated_at
    }
  }
`;

// Example: Insert new user
export const INSERT_USER = gql`
  mutation InsertUser($object: users_insert_input!) {
    insert_users_one(object: $object) {
      id
      name
      email
      created_at
    }
  }
`;

// Example: Update user
export const UPDATE_USER = gql`
  mutation UpdateUser($id: uuid!, $changes: users_set_input!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: $changes) {
      id
      name
      email
      updated_at
    }
  }
`;

// Example: Delete user
export const DELETE_USER = gql`
  mutation DeleteUser($id: uuid!) {
    delete_users_by_pk(id: $id) {
      id
      name
      email
    }
  }
`;

// Example: Subscribe to users changes
export const SUBSCRIBE_TO_USERS = gql`
  subscription SubscribeToUsers {
    users(order_by: { created_at: desc }) {
      id
      name
      email
      created_at
      updated_at
    }
  }
`;

// Example: Subscribe to user by ID
export const SUBSCRIBE_TO_USER = gql`
  subscription SubscribeToUser($id: uuid!) {
    users_by_pk(id: $id) {
      id
      name
      email
      created_at
      updated_at
    }
  }
`;
