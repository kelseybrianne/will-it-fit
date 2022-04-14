import { gql } from '@apollo/client'

const QUERY_CLOSET = gql `
query Query($id: ID!) {
  closet(_id: $id) {
    _id
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
`
