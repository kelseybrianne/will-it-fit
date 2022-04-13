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

// addItemPhoto:
export const ADD_PHOTO = gql`
mutation Mutation( $id: ID!) {
    addPhoto(_id: $id) {
      _id
     
    }
  }
  `

// removeItemPhoto:
  export const REMOVE_PHOTO = gql`
mutation Mutation ($id: ID! ){
    removePhoto (_id: $id) {
      _id
    }
  }
`
// removeProfilePicture 
export const ADD_PROFILE_PHOTO = gql`
mutation Mutation ($id: ID! ){
  addProfilePhoto (_id: $id) {
      _id
    }
  }
`

// removeProfilePicture 
export const REMOVE_PROFILE_PHOTO = gql`
mutation Mutation ($id: ID! ){
    removeProfilePhoto (_id: $id) {
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
