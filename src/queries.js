import gql from "graphql-tag";

export const getAllPosts = gql`
    {
        posts {
            description
            time
            species
            user {
                name
            }
        }
    }
`;