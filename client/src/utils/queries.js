import { gql } from 'apollo/client'

export const GET_ME = gql`
// execute the me query?
{
    me {
        _id
        username
        email
        bookCount
        //how to query saved books?
        savedBooks {
            _id
            bookId
            authors
            image
            link
            title
            description
            

        }
    }
}
`;

