import { gql } from '@apollo/client'

// addUser:
export const ADD_USER = gql`
 mutation Mutation($username: String!, $email: String!, 
 $password: String!, $height: Float!, $weight: Float!, 
 $primaryPhoto: String) {
   addUser(username: $username, email: $email, password: $password, height: $height, weight: $weight, primaryPhoto: $primaryPhoto) {
    token
    user {
        _id
      }
     }
   }
`

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
`

// addItem:
export const ADD_ITEM = gql`
mutation Mutation($category: String!, $name: String!, $size: String!, $style: String, $brand: String, $gender: String, $link: String, $photo: String, $color: String, $review: String) {
    addItem(category: $category, name: $name, size: $size, style: $style, brand: $brand, gender: $gender, link: $link, photo: $photo, color: $color, review: $review) {
      _id
      closet {
        _id
 
      }
    }
  }
`
// removeItem: 
export const REMOVE_ITEM = gql `
mutation Mutation($itemId: ID!) {
    removeItem(itemId: $itemId) {
      _id
      closet {
        _id
      }
    }
  }
`

// addPhoto:
export const ADD_PHOTO = gql`
mutation Mutation($path: String!, $name: String!) {
    addPhoto(path: $path, name: $name) {
      _id
      closet {
        _id
      }
    }
  }
  `

// removePhoto:
  export const REMOVE_PHOTO = gql`
mutation Mutation {
    removePhoto {
      _id
    }
  }
`
// addFollower
export const ADD_FOLLOWER = gql`
mutation Mutation($username: String!) {
    addFollower(username: $username) {
      _id
    }
  }
`

// removeFollower: 
export const REMOVE_FOLLOWER =gql`
mutation Mutation($username: String!) {
    removeFollower(username: $username) {
      _id
    }
  }
  `


