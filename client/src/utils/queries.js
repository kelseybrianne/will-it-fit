import { gql } from '@apollo/client';

// get one user by username
export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      height
      weight
      closet {
        _id
        category
        style
        brand
        name
        gender
        size
        link
        photo
        color
        review
      }
      primaryPhoto
      savedItems {
        _id
        category
        style
        brand
        name
        gender
        size
        link
        photo
        color
        review
      }
      following {
        username
        weight
        height
        closet {
          _id
          category
          style
          brand
          name
          gender
          size
          link
          photo
          color
          review
        }
      }
    }
  }
`;
// get logged in user data by user id
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      height
      weight
      closet {
        _id
        category
        style
        brand
        name
        gender
        size
        link
        photo
        color
        review
      }
      primaryPhoto
      savedItems {
        _id
        category
        style
        brand
        name
        gender
        size
        link
        photo
        color
        review
      }
      following {
        username
        weight
        height
        closet {
          _id
          category
          style
          brand
          name
          gender
          size
          link
          photo
          color
          review
        }
      }
    }
  }
`;
//get user matches by entering desired height and weight for match. Within 3% height, 5% weight - can change in server resolvers.js if you want to broaden or narrow scope.
export const GET_USERMATCHES = gql`
  query UserMatches($height: Float!, $weight: Float!) {
    userMatches(height: $height, weight: $weight) {
      _id
      username
      height
      weight
      primaryPhoto
      closet {
        _id
        category
        style
        brand
        name
        gender
        size
        link
        photo
        color
        review
      }
    }
  }
`;
// get one item by item id
export const GET_ITEM = gql`
  query item($id: ID!) {
    item(_id: $id) {
      _id
      category
      style
      brand
      name
      gender
      size
      link
      photo
      color
      review
    }
  }
`;

// get all items and data
export const GET_ITEMS = gql`
  query Items {
    items {
      _id
      category
      style
      brand
      name
      gender
      size
      link
      photo
      color
      review
    }
  }
`;

// get closet (users' items) by user id
export const GET_USERCLOSET = gql`
  query closet($id: ID!) {
    closet(_id: $id) {
      closet {
        category
        style
        brand
        name
        size
        photo
        color
        review
        gender
        link
        _id
      }
    }
  }
`;

// get favorites (users' saved items) by user id
export const GET_FAVORITES = gql`
  query SavedItems($id: ID!) {
    savedItems(_id: $id) {
      savedItems {
        _id
        category
        style
        brand
        name
        gender
        size
        link
        photo
        color
        review
      }
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query Query($id: ID!) {
    followers(_id: $id) {
      followers {
        _id
      }
    }
  }
`;

export const GET_FOLLOWING = gql`
  query Query($id: ID!) {
    following(id: $id) {
      following {
        username
        weight
        height
      }
      closet {
        _id
        category
        style
        brand
        name
        gender
        size
        link
        photo
        color
        review
      }
    }
  }
`;
