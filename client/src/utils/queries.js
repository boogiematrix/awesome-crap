import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me{
            _id
            username
            savedSales{
                _id
                location
                description
                startDate
                endDate
                image
            }
            sales{
                 _id
                location
                description
                startDate
                endDate
                image
            }
        }
    }
`;

export const GET_ALL_SALES = gql`
    query sales {
        sales{
            _id
            location
            startDate
            endDate
            description
            image
        }
    }
`;

export const GET_ONE_SALE = gql`
    query sale($_id: ID!){
        sale(_id: $_id){
            _id
            location
            startDate
            endDate
            description
            image
        }
    }
`;