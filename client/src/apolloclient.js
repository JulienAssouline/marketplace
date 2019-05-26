import { onError } from "apollo-link-error"
import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { withClientState } from "apollo-link-state"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

let apolloClient = null

const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql",
  credentials: "include"
})

const appCache = new InMemoryCache()

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const stateLink = withClientState({
  cache: appCache
})

apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, stateLink, httpLink]),
  cache: appCache
})

export default apolloClient