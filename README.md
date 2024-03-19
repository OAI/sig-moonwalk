# Welcome to the OpenAPI Moonwalk SIG!

The OpenAPI Moonwalk [Special Interest Group](https://learn.openapis.org/glossary.html) (SIG) is working on the next major release of the OpenAPI Specification (OAS), version 4.0, with a goal of [publishing by the end of 2024](https://www.openapis.org/blog/2023/12/06/openapi-moonwalk-2024).

## Principles

Moonwalk is being developed in accordance with the following principles, which you can read in more detail in the [announcement blog post](https://www.openapis.org/blog/2023/12/06/openapi-moonwalk-2024):

1. **Semantics**:  Semantics provide purpose, whether the consumer is a human or an AI.
1. **Signatures**:  An API operation is identifiable by its signature, which can be based on any aspect of HTTP mechanics
1. **Inclusion**: Moonwalk aspires to describe all HTTP-based APIs while remaining neutral regarding any specific design debate
1. **Separation of Concerns**: Modularization will keep the scope of Moonwalk manageable with loose coupling among concerns such as HTTP interfaces ("API shapes"), deployment configuration, and content schema formats
1. **Mechanical Upgrading**: An automated upgrade process from 3.x to 4.0 will be developed as part of the Moonwalk effort

## Contributing

As of March 2024, we are using the following documents and processes:

* [The Initial Moonwalk Proposals](./doc/initial-proposals) launched this effort, and continue to serve as the reference point for our discussions
* [Discussions](https://github.com/OAI/sig-moonwalk/discussions): All Moonwalk ideas should start as discussions
* [Architectural Design Records (ADRs)](./doc/architecture) as discussions produce consensus, decisions are recorded as ADRs
* [Issues](https://github.com/OAI/sig-moonwalk/issues) should ***only*** be used to track actionable work items
* [Meeting Agendas](https://github.com/OAI/sig-moonwalk/discussions?discussions_q=is%3Aopen+label%3AHousekeeping) focus the discussion in our weekly calls, which are open to all and are often where we decide discussions are ready for ADRs

### Issues and formal documents

We are not yet at the point of writing a formal specification, so there are very few reasons to file issues at this stage.

We will begin writing a formal document once enough decisions have been made through ADRs that a coherent document can be structured.

### Writing ADRs

Before writing an ADR to submit as a PR, please make sure that there is sufficient agreement to move ahead either in the discussion or by getting a decision in the weekly call.

A good ADR decides _just enough_ of a topic to allow moving on to the next decision.  As discussions tend to be rather sprawling, it might take several ADRs to resolve everything needed to close a discussion.

Feedback on ADR PRs should be about whether the ADR captures the decision and all related concerns from the discussion.  Details will likely be refined in the PR process, but if the direction of the decision is still being challenged, it is best to close the PR (or declare the ADR "rejected" before merging) and return to the GitHub discussion to re-build consensus.
