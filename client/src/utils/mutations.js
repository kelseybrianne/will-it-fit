import { gql } from '@apollo/client';

// addUser:
export const ADD_USER = gql`
  mutation Mutation(
    $username: String!
    $email: String!
    $password: String!
    $height: Float!
    $weight: Float!
    $primaryPhoto: String!
    $shoeSize: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      height: $height
      weight: $weight
      primaryPhoto: $primaryPhoto
      shoeSize: $shoeSize
    ) {
      token
      user {
        _id
      }
    }
  }
`;
// login:
export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
// addItem:
export const ADD_ITEM = gql`
  mutation Mutation(
    $category: String!
    $size: String!
    $photo: String!
    $style: String
    $brand: String
    $name: String!
    $gender: String
    $link: String
    $color: String
    $review: String
    $user: String!
    $user_id: String!
  ) {
    addItem(
      category: $category
      size: $size
      photo: $photo
      style: $style
      brand: $brand
      name: $name
      gender: $gender
      link: $link
      color: $color
      review: $review
      user: $user
      user_id: $user_id
    ) {
      _id
    }
  }
`;
// addItemPhoto:
export const ADD_PHOTO = gql`
  mutation Mutation($id: ID!, $photo: String!) {
    addPhoto(_id: $id, photo: $photo) {
      _id
    }
  }
`;
// addProfilePhoto:
export const ADD_PROFILE_PHOTO = gql`
  mutation Mutation($id: ID!, $primaryPhoto: String!) {
    addProfilePhoto(_id: $id, primaryPhoto: $primaryPhoto) {
      _id
    }
  }
`;
//  addFavorite:
export const ADD_FAVORITE = gql`
  mutation Mutation($id: ID!) {
    addFavorite(_id: $id) {
      _id
    }
  }
`;

// addFollower:
export const ADD_FOLLOWER = gql`
  mutation Mutation($id: ID!) {
    addFollower(_id: $id) {
      _id
    }
  }
`;

// addFollowing:
export const ADD_FOLLOWING = gql`
  mutation Mutation($id: ID!) {
    addFollowing(_id: $id) {
      _id
    }
  }
`;

// removeItem:
export const REMOVE_ITEM = gql`
  mutation Mutation($id: ID!) {
    removeItem(_id: $id) {
      _id
    }
  }
`;

// removeFavorite:
export const REMOVE_FAVORITE = gql`
  mutation Mutation($id: ID!) {
    removeFavorite(_id: $id) {
      _id
    }
  }
`;

// removeProfilePhoto:
export const REMOVE_PROFILE_PHOTO = gql`
  mutation Mutation($id: ID!) {
    removeProfilePhoto(_id: $id) {
      _id
    }
  }
`;
// removeFollower:
export const REMOVE_FOLLOWER = gql`
  mutation Mutation($id: ID!) {
    removeFollower(_id: $id) {
      _id
    }
  }
`;
// removeFollowing:
export const REMOVE_FOLLOWING = gql`
  mutation Mutation($id: ID!) {
    removeFollowing(_id: $id) {
      _id
    }
  }
`;
