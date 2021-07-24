import { gql } from '@apollo/client';

export const LOGIN = gql`
 mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_SALE = gql`
    mutation addSale(
            $location: String!,
            $startDate: String!,
            $endDate: String!,
            $description: String!,
            $image: String){
        addSale(
            location:$location,
            startDate: $startDate,
            endDate: $endDate,
            description: $description,
            image: $image
            ){
              _id
              location
              description  
            }
            }
`;

export const UPDATE_SALE = gql`
    mutation updateSale(
            $_id: ID!,
            $location: String,
            $startDate: Strin!,
            $endDate: String,
            $description: String,
            $image: String
    ) {
        updateSale(
            _id: $_id
            location:$location,
            startDate: $startDate,
            endDate: $endDate,
            description: $description,
            image: $image
        ) {
            _id
            location
            description
        }
    }
`;

export const REMOVE_SALE = gql`
    mutation removeSale($_id: ID) {
        removeSale(_id: $_id){
            _id
            locationd
            description
        }
    }
`;

export const SAVE_SALE = gql`
    mutation saveSale(
            $_id: ID!,
            $location: String!,
            $startDate: String!,
            $endDate: String!,
            $description: String!,
            $image: String
    ) {
        saveSale(
             _id: $_id
            location:$location,
            startDate: $startDate,
            endDate: $endDate,
            description: $description,
            image: $image
        ) {
            _id
            username
        }
    }
`;

export const UNSAVE_SALE = gql`
    mutation unsaveSale($_id: ID!) {
        unsaveSale(
            _id: $_id
        ) {
            _id
            username
        }
    }
`;