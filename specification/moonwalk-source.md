<section class="introductory">

## Current Status of Document

This contents of this document have been gathered from a combination of the 3.1 specification and proposed changes for Moonwalk. <strong>None of the content in this document should be considered as product of consensus.</strong> This is a working document for the purposes of getting the mechanics of publishing a document in place and beginning to discuss the overall structure of the document.

</section>

<section id="abstract">
The OpenAPI Specification (OAS) defines a standard, programming language-agnostic interface description for HTTP APIs, which allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic. When properly defined via OpenAPI, a consumer can understand and interact with the remote service with a minimal amount of implementation logic. Similar to what interface descriptions have done for lower-level programming, the OpenAPI Specification removes guesswork in calling a service.
</section>

<section id="conformance" class="introductory">
This document is licensed under [The Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html).  
</section>

## Introduction

## Definitions

## Specification

### Schema
#### OpenAPI Object

This is the root object of the [OpenAPI Description](#openapi-description).

##### Fixed Fields

| Field Name | Type | Description |
| ---- | :----: | ---- |
| resources | [[Resources Object](#resources-object)] | A list of available resources for the API. |
| signature | [[Signature Object](#signature-object)] | An object that defines the uniquely identifying characteristics of the HTTP requests for this API, unless redefined in a Resources Object. |


This object MAY be extended with [Specification Extensions](#specification-extensions).

#### Resources Object

This object represents a set of HTTP resources with shared behavior and schemas.

##### Fixed Fields

| Field Name | Type | Description |
| ---- | :----: | ---- |
| uriTemplate | `string` | A RFC6570 URI template that matches the set of resources available resources for the API. |
| operations | map[`string`,[Operation Object](#operation-object)] | A map of operation objects with a key that provides a descriptiptive identifier of the operation that is unique within the resource. |
| signature | [Signature Object](#signature-object) | An object that defines the uniquely identifying characteristics of the HTTP requests for this Resources Object. |

<aside class="issue">
Should the signature object headers and pointers in the resource override the signature object at the document root, or should it be additive?
</aside>

##### Examples

Simple example of a CRUD api using a distinct resources object for the collection of items and an indiviual item.

```yaml
openapi: 4.0.0
info:
  title: Simple example
  version: 1.0.0
resources:
  - uriTemplate: /items
    operations:
      listItems:
        method: GET
      createItem:
        method: POST
  - uriTemplate: /item/{id}
    operations:
      getItem:
        method: GET
        parameters:
          - name: id
      deleteItem:
        method: DELETE
        parameters:
          - name: id
```

This example leverages an optional path parameter to define a single resources object that has operations on the collection of items and a single item.

```yaml
openapi: 4.0.0
info:
  title: CRUD + List resource
  version: 1.0.0
resources:
  - uriTemplate: /items{/id}
    operations:
      listItems:
        method: GET
      createItem:
        method: POST
      getItem:
        method: GET
        parameters:
          - name: id
      deleteItem:
        method: DELETE
        parameters:
          - name: id
```
<aside class="issue">
Do we need some kind of indicator in the resource level signature to identify that the presence of "id" parameter is used to select the operation? Or does uriTemplate cover this?
</aside>

Example of an RPC API using a HTTP header field as a discriminator.
```yaml
openapi: 4.0.0
info:
  title: RPC API
  version: 1.0.0
signature:
  headers: [path]
paths:
  "/service":
    operations:
      createItem:
        headers:
          path:
            schema:
              const: service.CreateItem
      updateItem:
        method: post
        headers:
          path:
            schema:
              const: service.CreateItem
```

This object MAY be extended with [Specification Extensions](#specification-extensions).

#### Signature Object

This object defines the uniquely identifying characteristics of the HTTP requests. The purpose of this object is to enable matching of HTTP request instances to the corresponding Resource Object, when combined with the server URL.

##### Fixed Fields

| Field Name | Type | Description |
| ---- | :----: | ---- |
| uriTemplate | `boolean` | Indicates if the uriTemplate is part of the operation signature. Default true. |
| httpMethod | `boolean` | Indicates if the HTTP method is part of the operation signature. Default true. |
| headers | `[string]` | A list of response header field names whose values are used as part of the operation signature. |
| pointers | `[string]` | A list of JSON pointers to request content to be used as part of the operation signature. |

<aside class="issue">
This signature design is a strawperson I created. It has not been discussed and does not represent consensus of the group.
</aside>


## Specification Extensions

## Appendix

<section class="appendix">

## Revision History

| Version   | Date       | Notes                                             |
| --------- | ---------- | ------------------------------------------------- |
| 3.1.0     | 2021-02-15 | Release of the OpenAPI Specification 3.1.0        |
| 3.1.0-rc1 | 2020-10-08 | rc1 of the 3.1 specification                      |
| 3.1.0-rc0 | 2020-06-18 | rc0 of the 3.1 specification                      |
| 3.0.3     | 2020-02-20 | Patch release of the OpenAPI Specification 3.0.3  |
| 3.0.2     | 2018-10-08 | Patch release of the OpenAPI Specification 3.0.2  |
| 3.0.1     | 2017-12-06 | Patch release of the OpenAPI Specification 3.0.1  |
| 3.0.0     | 2017-07-26 | Release of the OpenAPI Specification 3.0.0        |
| 3.0.0-rc2 | 2017-06-16 | rc2 of the 3.0 specification                      |
| 3.0.0-rc1 | 2017-04-27 | rc1 of the 3.0 specification                      |
| 3.0.0-rc0 | 2017-02-28 | Implementer's Draft of the 3.0 specification      |
| 2.0       | 2015-12-31 | Donation of Swagger 2.0 to the OpenAPI Initiative |
| 2.0       | 2014-09-08 | Release of Swagger 2.0                            |
| 1.2       | 2014-03-14 | Initial release of the formal document.           |
| 1.1       | 2012-08-22 | Release of Swagger 1.1                            |
| 1.0       | 2011-08-10 | First release of the Swagger Specification        |

</section>

<section class="appendix" id="issue-summary">
  <!-- A list of issues will magically appear here -->
</section>
