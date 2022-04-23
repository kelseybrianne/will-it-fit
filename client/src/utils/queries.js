import { gql } from '@apollo/client';

// get one user by username
export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      height
      weight
      shoeSize
      following {
        _id
        username
        primaryPhoto
      }
      followers {
        _id
        username
        primaryPhoto
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
        height
        weight
        user {
          primaryPhoto
          username
        }
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
        height
        weight
        user {
          primaryPhoto
          username
        }
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
      shoeSize
      following {
        _id
      }
      followers {
        _id
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
        height
        weight
        user {
          primaryPhoto
          username
        }
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
        height
        weight
        user {
          primaryPhoto
          username
        }
      }
      following {
        _id
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
  query UserMatches {
    userMatches {
      _id
      username
      height
      weight
      primaryPhoto
      shoeSize
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
        height
        weight
        user {
          primaryPhoto
          username
        }
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
      height
      weight
      user {
        primaryPhoto
        username
      }
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
      height
      weight
      user {
        primaryPhoto
        username
      }
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
        height
        weight
        user {
          primaryPhoto
          username
        }
      }
    }
  }
`;

// get favorites (users' saved items) by user id
export const GET_FAVORITES = gql`
  query SavedItems($id: ID!) {
    savedItems(_id: $id) {
      _id
      height
      weight
      category
      style
      user_id
      user {
        _id
        username
        primaryPhoto
      }
      brand
      name
      gender
      size
      link
      photo
      color
      review
      createdAt
    }
  }
`;

export const GET_FOLLOWING = gql`
  query Following {
    following {
      _id
      following {
        _id
      }
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query Following {
    following {
      _id
      following {
        _id
      }
    }
  }
`;

export const GET_FEED = gql`
  query feed {
    feed {
      _id
      height
      weight
      category
      style
      user_id
      user {
        _id
        username
        primaryPhoto
      }
      brand
      name
      gender
      size
      link
      photo
      color
      review
      createdAt
    }
  }
`;

export const SEARCH_ITEMS = gql`
  query Query($keyword: String) {
    searchItems(keyword: $keyword) {
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
      createdAt
      height
      weight
      user {
        primaryPhoto
        username
      }
    }
  }
`;
