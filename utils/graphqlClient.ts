import { GraphQLClient } from 'graphql-request';

const url = process.env.NEXT_PUBLIC_HYGRAPH_URL || '';

const client = new GraphQLClient(url);
export default client;