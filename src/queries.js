import gql from "graphql-tag";

export const getAllPosts = gql`
    {
        posts {
            description
            time
            species
            latitude
            longitude
            post_id
            user {
                name
            }
        }
    }
`;