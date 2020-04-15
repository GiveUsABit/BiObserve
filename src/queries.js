import gql from "graphql-tag";

export const getAllPosts = gql`
    {
        posts {
            description
            time
            species
            latitude
            longitude
            id
            user {
                name
            }
        }
    }
`;