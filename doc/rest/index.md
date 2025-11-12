# REpresentational State Transfer (REST)

This proposal aims to make a concrete move towards at least one principle of Moonwalk:

- Inclusion: Moonwalk aspires to describe all HTTP-based APIs while remaining neutral regarding any specific design debate.

Thus, this proposal adds a way to describe REST APIs, where, as per Roy Fielding's description in his PhD thesis:

- a client acts on resources, by sending and receiving representations of them, in negotiable media types
- representations contain data and state transitions (also called hypermedia links)
- state transitions are URIs, that can be used to make further requests, according to the semantics associated with a resource representation

This has several advantages, especially that it decouples critical elements of the server from the client, because the client doesn't need to be able to construct URIs:

- URIs can change on the server for any number of reasons
- several instances of the same type of resource could have URIs constructed in different ways because, unbeknownst to the client, they are handled differently by the server
  - this includes the possibility of sharding, by putting different parts of a system on different servers
- the presence or absence of transitions signal to the client the availability of actions

This means that the organization of the API's routes and the logic that decides when some state transitions are possible can be modified on the server without needing to update any client.

Both to avoid confusion with the existing notion of `Link` in OpenAPI and to reuse REST's original terminology, this proposal adds a type `Transition`. Such a transition has a property `resource` which links to an element in the `resources` top-level key. Such a resource contains `requests` like a path, but not `parameterSchema`, as a client wouldn't construct the URI, instead getting the already constructed URI in a response.

There is a small example for a [REST banking API](./rest-banking.yaml).
