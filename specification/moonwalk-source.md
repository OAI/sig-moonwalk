
<style>
/* Override the default respec styling */
pre > code { background: hsl(24, 20%, 95%); display: block; padding: 1em; margin: .5em 0; overflow: auto; border-radius: 0; }
h1,h2,h3 { color: #629b34; }
p#w3c-state { color: #629b34; }
p#dt-published { color: #629b34; }
a[href] { color: #45512c; }
body:not(.toc-inline)
#toc h2 { color: #45512c; }
body:not(.toc-inline) #toc h2 { color: #45512c; }
table { display: block; width: 100%; overflow: auto; }
table th { font-weight: 600; }
table th, table td { padding: 6px 13px; border: 1px solid #dfe2e5; }
table tr { background-color: #fff; border-top: 1px solid #c6cbd1; }
table tr:nth-child(2n) { background-color: #f6f8fa; }
pre { background-color: #f6f8fa !important; }
</style>

<section id="abstract">
The OpenAPI Specification (OAS) defines a standard, programming language-agnostic interface description for HTTP APIs, which allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic. When properly defined via OpenAPI, a consumer can understand and interact with the remote service with a minimal amount of implementation logic. Similar to what interface descriptions have done for lower-level programming, the OpenAPI Specification removes guesswork in calling a service.
</section>

<section id="conformance" class="introductory">

This document is licensed under [The Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html).

</section>

## Introduction

The OpenAPI Specification (OAS) defines a standard, language-agnostic interface to HTTP APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.

An OpenAPI definition can then be used by documentation generation tools to display the API, code generation tools to generate servers and clients in various programming languages, testing tools, and many other use cases.

## Definitions

##### OpenAPI Document
A self-contained or composite resource which defines or describes an API or elements of an API. 

##### Media Types
Media type definitions are spread across several resources.
The media type definitions SHOULD be in compliance with [RFC6838](https://tools.ietf.org/html/rfc6838).

Some examples of possible media type definitions:
```
  text/plain; charset=utf-8
  application/json
  application/vnd.github+json
  application/vnd.github.v3+json
  application/vnd.github.v3.raw+json
  application/vnd.github.v3.text+json
  application/vnd.github.v3.html+json
  application/vnd.github.v3.full+json
  application/vnd.github.v3.diff
  application/vnd.github.v3.patch
```
##### HTTP Status Codes
The HTTP Status Codes are used to indicate the status of the executed operation. 
The available status codes are defined by [RFC7231](https://tools.ietf.org/html/rfc7231#section-6) and registered status codes are listed in the [IANA Status Code Registry](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml).

## Specification

### Versions {#oas-version}

The OpenAPI Specification is versioned using a `major`.`minor`.`patch` versioning scheme. The `major`.`minor` portion of the version string (for example `3.1`) SHALL designate the OAS feature set. *`.patch`* versions address errors in, or provide clarifications to, this document, not the feature set. Tooling which supports OAS 3.1 SHOULD be compatible with all OAS 3.1.\* versions. The patch version SHOULD NOT be considered by tooling, making no distinction between `3.1.0` and `3.1.1` for example.

Occasionally, non-backwards compatible changes may be made in `minor` versions of the OAS where impact is believed to be low relative to the benefit provided.

An OpenAPI document compatible with OAS 3.\*.\* contains a required [`openapi`](#oasVersion) field which designates the version of the OAS that it uses.

### Format

An OpenAPI document that conforms to the OpenAPI Specification is itself a JSON object, which may be represented either in JSON or YAML format.

For example, if a field has an array value, the JSON array representation will be used:

```json
{
   "field": [ 1, 2, 3 ]
}
```
All field names in the specification are **case sensitive**.
This includes all fields that are used as keys in a map, except where explicitly noted that keys are **case insensitive**.

The schema exposes two types of fields: Fixed fields, which have a declared name, and Patterned fields, which declare a regex pattern for the field name.

Patterned fields MUST have unique names within the containing object. 

In order to preserve the ability to round-trip between YAML and JSON formats, YAML version [1.2](https://yaml.org/spec/1.2/spec.html) is RECOMMENDED along with some additional constraints:

- Tags MUST be limited to those allowed by the [JSON Schema ruleset](https://yaml.org/spec/1.2/spec.html#id2803231).
- Keys used in YAML maps MUST be limited to a scalar string, as defined by the [YAML Failsafe schema ruleset](https://yaml.org/spec/1.2/spec.html#id2802346).

**Note:** While APIs may be defined by OpenAPI documents in either YAML or JSON format, the API request and response bodies and other content are not required to be JSON or YAML.

### Data Types

TBD

### Rich Text Formatting
Throughout the specification `description` fields are noted as supporting CommonMark markdown formatting.
Where OpenAPI tooling renders rich text it MUST support, at a minimum, markdown syntax as described by [CommonMark 0.27](https://spec.commonmark.org/0.27/). Tooling MAY choose to ignore some CommonMark features to address security concerns. 

### Relative References in URIs

Unless specified otherwise, all properties that are URIs MAY be relative references as defined by [RFC3986](https://tools.ietf.org/html/rfc3986#section-4.2).

Relative references, including those in [`Reference Objects`](#referenceObject), [`PathItem Object`](#pathItemObject) `$ref` fields, [`Link Object`](#linkObject) `operationRef` fields and [`Example Object`](#exampleObject) `externalValue` fields, are resolved using the referring document as the Base URI according to [RFC3986](https://tools.ietf.org/html/rfc3986#section-5.2).

If a URI contains a fragment identifier, then the fragment should be resolved per the fragment resolution mechanism of the referenced document.  If the representation of the referenced document is JSON or YAML, then the fragment identifier SHOULD be interpreted as a JSON-Pointer as per [RFC6901](https://tools.ietf.org/html/rfc6901).

Relative references in [`Schema Objects`](#schemaObject), including any that appear as `$id` values, use the nearest parent `$id` as a Base URI, as described by [JSON Schema Specification Draft 2020-12](https://tools.ietf.org/html/draft-bhutton-json-schema-00#section-8.2).  If no parent schema contains an `$id`, then the Base URI MUST be determined according to [RFC3986](https://tools.ietf.org/html/rfc3986#section-5.1).

### Relative References in URLs

Unless specified otherwise, all properties that are URLs MAY be relative references as defined by [RFC3986](https://tools.ietf.org/html/rfc3986#section-4.2).
Unless specified otherwise, relative references are resolved using the URLs defined in the [`Server Object`](#serverObject) as a Base URL. Note that these themselves MAY be relative to the referring document.


### Specification Extensions

While the OpenAPI Specification tries to accommodate most use cases, additional data can be added to extend the specification at certain points.

The extensions properties are implemented as patterned fields that are always prefixed by `"x-"`.

Field Pattern | Type | Description
---|:---:|---
<a name="infoExtensions"></a>^x- | Any | Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. Field names beginning `x-oai-` and `x-oas-` are reserved for uses defined by the [OpenAPI Initiative](https://www.openapis.org/). The value can be `null`, a primitive, an array or an object.

The extensions may or may not be supported by the available tooling, but those may be extended as well to add requested support (if tools are internal or open-sourced).

## Document Structure

The features of an OpenAPI description can be divided into two main categories: API shape and API deployment. The shape of an API can be described independently of deployment.  An API shape could be deployed many times, but a deployment must reference a single API shape.

### API Shape

API shape features are used to describe the capabilities of an API and the mechanism for interacting with those capabilties.

#### Info Object

The object provides metadata about the API.
The metadata MAY be used by the clients if needed, and MAY be presented in editing or documentation generation tools for convenience.

##### Fixed Fields {#info-object-fixed-fields}

Field Name | Type | Description
---|:---:|---
<a name="infoTitle"></a>title | `string` | **REQUIRED**. The title of the API.
<a name="infoSummary"></a>summary | `string` | A short summary of the API.
<a name="infoDescription"></a>description | `string` | A description of the API. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.
<a name="infoTermsOfService"></a>termsOfService | `string` | A URL to the Terms of Service for the API. This MUST be in the form of a URL.
<a name="infoContact"></a>contact | [Contact Object](#contact-object) | The contact information for the exposed API.
<a name="infoLicense"></a>license | [License Object](#license-object) | The license information for the exposed API.
<a name="infoVersion"></a>version | `string` | **REQUIRED**. The version of the OpenAPI description (which is distinct from the [OpenAPI Specification version](#oas-version) or the API implementation version).


This object MAY be extended with [Specification Extensions](#specification-extensions).


##### Info Object Example

```json
{
  "title": "Sample Pet Store App",
  "summary": "A pet store manager.",
  "description": "This is a sample server for a pet store.",
  "termsOfService": "https://example.com/terms/",
  "contact": {
    "name": "API Support",
    "url": "https://www.example.com/support",
    "email": "support@example.com"
  },
  "license": {
    "name": "Apache 2.0",
    "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
  },
  "version": "1.0.1"
}
```

```yml
title: Sample Pet Store App
summary: A pet store manager.
description: This is a sample server for a pet store.
termsOfService: https://example.com/terms/
contact:
  name: API Support
  url: https://www.example.com/support
  email: support@example.com
license:
  name: Apache 2.0
  url: https://www.apache.org/licenses/LICENSE-2.0.html
version: 1.0.1
```

#### Contact Object

Contact information for the exposed API.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="contactName"></a>name | `string` | The identifying name of the contact person/organization.
<a name="contactUrl"></a>url | `string` | The URL pointing to the contact information. This MUST be in the form of a URL.
<a name="contactEmail"></a>email | `string` | The email address of the contact person/organization. This MUST be in the form of an email address.

This object MAY be extended with [Specification Extensions](#specification-extensions).

##### Contact Object Example

```json
{
  "name": "API Support",
  "url": "https://www.example.com/support",
  "email": "support@example.com"
}
```

```yaml
name: API Support
url: https://www.example.com/support
email: support@example.com
```

#### License Object

License information for the API description.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="licenseName"></a>name | `string` | **REQUIRED**. The license name used for the API description.
<a name="licenseIdentifier"></a>identifier | `string` | An [SPDX](https://spdx.org/licenses/) license expression for the API description. The `identifier` field is mutually exclusive of the `url` field.
<a name="licenseUrl"></a>url | `string` | A URL to the license used for the API description. This MUST be in the form of a URL. The `url` field is mutually exclusive of the `identifier` field.

This object MAY be extended with [Specification Extensions](#specification-extensions).

##### License Object Example

```json
{
  "name": "Apache 2.0",
  "identifier": "Apache-2.0"
}
```

```yaml
name: Apache 2.0
identifier: Apache-2.0
```


#### Import Object

TBD

#### Operation Object

Describes a single API operation on a path.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="operationTags"></a>tags | [`string`] | A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.
<a name="operationSummary"></a>summary | `string` | A short summary of what the operation does.
<a name="operationDescription"></a>description | `string` | A verbose explanation of the operation behavior. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.
<a name="operationExternalDocs"></a>externalDocs | [External Documentation Object](#external-documentation-object) | Additional external documentation for this operation.
<a name="operationId"></a>operationId | `string` | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.
<a name="operationParameters"></a>parameters | [[Parameter Object](#parameter-object) \| [Reference Object](#reference-object)] | A list of parameters that are applicable for this operation. If a parameter is already defined at the [Path Item](#pathItemParameters), the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](#parameterName) and [location](#parameterIn). The list can use the [Reference Object](#reference-object) to link to parameters that are defined at the [OpenAPI Object's components/parameters](#componentsParameters).
<a name="operationRequestBody"></a>requestBody | [Request Body Object](#request-body-object) \| [Reference Object](#reference-object) | The request body applicable for this operation.  The `requestBody` is fully supported in HTTP methods where the HTTP 1.1 specification [RFC7231](https://tools.ietf.org/html/rfc7231#section-4.3.1) has explicitly defined semantics for request bodies.  In other cases where the HTTP spec is vague (such as [GET](https://tools.ietf.org/html/rfc7231#section-4.3.1), [HEAD](https://tools.ietf.org/html/rfc7231#section-4.3.2) and [DELETE](https://tools.ietf.org/html/rfc7231#section-4.3.5)), `requestBody` is permitted but does not have well-defined semantics and SHOULD be avoided if possible.
<a name="operationResponses"></a>responses | [Responses Object](#responses-object) | The list of possible responses as they are returned from executing this operation.
<a name="operationCallbacks"></a>callbacks | Map[`string`, [Callback Object](#callback-object) \| [Reference Object](#reference-object)] | A map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the Callback Object. Each value in the map is a [Callback Object](#callback-object) that describes a request that may be initiated by the API provider and the expected responses.
<a name="operationDeprecated"></a>deprecated | `boolean` | Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is `false`.
<a name="operationSecurity"></a>security | [[Security Requirement Object](#security-requirement-object)] | A declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. To make security optional, an empty security requirement (`{}`) can be included in the array. This definition overrides any declared top-level [`security`](#oasSecurity). To remove a top-level security declaration, an empty array can be used.
<a name="operationServers"></a>servers | [[Server Object](#server-object)] | An alternative `server` array to service this operation. If an alternative `server` object is specified at the Path Item Object or Root level, it will be overridden by this value.

This object MAY be extended with [Specification Extensions](#specification-extensions).

##### Operation Object Example

```json
{
  "tags": [
    "pet"
  ],
  "summary": "Updates a pet in the store with form data",
  "operationId": "updatePetWithForm",
  "parameters": [
    {
      "name": "petId",
      "in": "path",
      "description": "ID of pet that needs to be updated",
      "required": true,
      "schema": {
        "type": "string"
      }
    }
  ],
  "requestBody": {
    "content": {
      "application/x-www-form-urlencoded": {
        "schema": {
          "type": "object",
          "properties": {
            "name": {
              "description": "Updated name of the pet",
              "type": "string"
            },
            "status": {
              "description": "Updated status of the pet",
              "type": "string"
            }
          },
          "required": ["status"]
        }
      }
    }
  },
  "responses": {
    "200": {
      "description": "Pet updated.",
      "content": {
        "application/json": {},
        "application/xml": {}
      }
    },
    "405": {
      "description": "Method Not Allowed",
      "content": {
        "application/json": {},
        "application/xml": {}
      }
    }
  },
  "security": [
    {
      "petstore_auth": [
        "write:pets",
        "read:pets"
      ]
    }
  ]
}
```

```yaml
tags:
- pet
summary: Updates a pet in the store with form data
operationId: updatePetWithForm
parameters:
- name: petId
  in: path
  description: ID of pet that needs to be updated
  required: true
  schema:
    type: string
requestBody:
  content:
    'application/x-www-form-urlencoded':
      schema:
       type: object
       properties:
          name:
            description: Updated name of the pet
            type: string
          status:
            description: Updated status of the pet
            type: string
       required:
         - status
responses:
  '200':
    description: Pet updated.
    content:
      'application/json': {}
      'application/xml': {}
  '405':
    description: Method Not Allowed
    content:
      'application/json': {}
      'application/xml': {}
security:
- petstore_auth:
  - write:pets
  - read:pets
```


### API Deployment

API deployment features are used to describe where an API shape has been deployed and what kind of security schemes are used to protect it.

#### Depoyment Object

TBD

#### Security Scheme Object

TBD


## Appendix A: Revision History

Version   | Date       | Notes
---       | ---        | ---
3.1.0     | 2021-02-15 | Release of the OpenAPI Specification 3.1.0 
3.1.0-rc1 | 2020-10-08 | rc1 of the 3.1 specification
3.1.0-rc0 | 2020-06-18 | rc0 of the 3.1 specification
3.0.3     | 2020-02-20 | Patch release of the OpenAPI Specification 3.0.3
3.0.2     | 2018-10-08 | Patch release of the OpenAPI Specification 3.0.2
3.0.1     | 2017-12-06 | Patch release of the OpenAPI Specification 3.0.1
3.0.0     | 2017-07-26 | Release of the OpenAPI Specification 3.0.0
3.0.0-rc2 | 2017-06-16 | rc2 of the 3.0 specification
3.0.0-rc1 | 2017-04-27 | rc1 of the 3.0 specification
3.0.0-rc0 | 2017-02-28 | Implementer's Draft of the 3.0 specification
2.0       | 2015-12-31 | Donation of Swagger 2.0 to the OpenAPI Initiative
2.0       | 2014-09-08 | Release of Swagger 2.0
1.2       | 2014-03-14 | Initial release of the formal document.
1.1       | 2012-08-22 | Release of Swagger 1.1
1.0       | 2011-08-10 | First release of the Swagger Specification
