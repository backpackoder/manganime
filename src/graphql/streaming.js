import { gql } from 'graphql-request'

export const STREAMING_REQUEST = gql`
  query Details($type: MediaType, $id: [Int]) {
    Page {
      media(type: $type, id: $id) {
        streamingEpisodes {
            title
            url
            site
        }
    }
  }
`
