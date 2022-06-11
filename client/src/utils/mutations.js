import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}

`;

export const ADD_USER = gql`
mutation addUser($username: String, $email: String, $password: String) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const SAVE_BOOK = gql `
// mutation saveBook($id: ID!) {
    saveBook(bookId: $id) {
        _id
        username
        bookCount
        savedBooks {
            bookId
            title
            image
            link
            authors
            description
        }
    }
}
`;

export const REMOVE_BOOK = gql `
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
        _id
        username
        bookCount
        savedbooks {
            bookId
            title
            image
            link
            authors
            description
        }
    }
}
`;

