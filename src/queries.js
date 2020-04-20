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

export const insertPostQuery = gql`
mutation($objects: [posts_insert_input!]!) {
    insert_posts(objects: $objects) {
      affected_rows
      returning {
        address
        description
        species
        time
      }
    }
}
`