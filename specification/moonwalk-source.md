
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
<section class="introductory">

## Current Status of Document

This contents of this document have been gathered from a combination of the 3.1 specification and proposed changes for Moonwalk. <strong>None of the content in this document should be considered as product of consensus.</strong>  This is a working document for the purposes of getting the mechanics of publishing a document in place and beginning to discuss the overall structure of the document.
</section>

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
An OpenAPI Description (OAD) formally describes the surface of an API and its semantics. It is composed of an [entry document](#documentStructure) and any/all of its referenced documents. 
<p class="ednote">Need to define what are the required top level properties</p>

##### Media Types
Media type definitions are spread across several resources.
The media type definitions SHOULD be in compliance with [RFC6838](https://tools.ietf.org/html/rfc6838).

Some examples of possible media type definitions:
```shell
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
Status codes SHOULD be selected from the available status codes registered in the [IANA Status Code Registry](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml).

## Conventions

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

<p class="issue" data-number="131" >Replace this paragraph with a reference to the format registry</p>

#### Working With Binary Data

The OAS can describe either _raw_ or _encoded_ binary data.

* **raw binary** is used where unencoded binary data is allowed, such as when sending a binary payload as the entire HTTP message body, or as part of a `multipart/*` payload that allows binary parts
* **encoded binary** is used where binary data is embedded in a text-only format such as `application/json` or `application/x-www-form-urlencoded` (either as a message body or in the URL query string).

In the following table showing how to use Schema Object keywords for binary data, we use `image/png` as an example binary media type.  Any binary media type, including `application/octet-stream`, is sufficient to indicate binary content.

Keyword | Raw | Encoded | Comments
------- | --- | ------- | --------
`type`  | _omit_ | `string` | raw binary is [outside of `type`](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-4.2.3)
`contentMediaType` | `image/png` | `image/png` | can sometimes be omitted if redundant (see below)
`contentEncoding`  | _omit_ | `base64`&nbsp;or&nbsp;`base64url` | other encodings are [allowed](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00#section-8.3)

Note that the encoding indicated by `contentEncoding`, which inflates the size of data in order to represent it as 7-bit ASCII text, is unrelated to HTTP's `Content-Encoding` header, which indicates whether and how a message body has been compressed and is applied after all content serialization described in this section has occurred.  Since HTTP allows unencoded binary message bodies, there is no standardized HTTP header for indicating base64 or similar encoding of an entire message body.

Using a `contentEncoding` of `base64url` ensures that URL encoding (as required in the query string and in message bodies of type `application/x-www-form-urlencoded`) does not need to further encode any part of the already-encoded binary data.

The `contentMediaType` keyword is redundant if the media type is already set:

* as the key for a [`MediaType Object`](#mediaTypeObject)
* in the `contentType` field of an [`Encoding Object`](#encodingObject)

If the Schema Object will be processed by a non-OAS-aware JSON Schema implementation, it may be useful to include `contentMediaType` even if it is redundant.  However, if `contentMediaType` contradicts a relevant Media Type Object or Encoding Object, then `contentMediaType` SHALL be ignored.

The `maxLength` keyword MAY be used to set an expected upper bound on the length of a streaming payload.  The keyword can be applied to either string data, including encoded binary data, or to unencoded binary data.  For unencoded binary, the length is the number of octets.

##### Migrating binary descriptions from OAS 3.0
The following table shows how to migrate from OAS 3.0 binary data descriptions, continuing to use `image/png` as the example binary media type:

OAS < 3.1 | OAS 3.1 | Comments
--------- | ------- | --------
`type: string`<br />`format: binary` | `contentMediaType: image/png` | if redundant, can be omitted, often resulting in an empty Schema Object
`type: string`<br />`format: byte`   | `type: string`<br />`contentMediaType: image/png`<br />`contentEncoding: base64` | note that `base64url` can be used to avoid re-encoding the base64 string to be URL-safe


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

### Referencing Imports

#### Using Imported Names

<p class="ednote">This syntax comes directly from the deployments examples.  It does involve values that are either objects (inline) or strings (imported names) which might be of concern to developers in strictly typed languages.
</p>

Imported names are used in specific contexts that require a particular type of Object.  The syntax for using a name is:

```YAML
  <fieldName>: <namespace>:<componentName>
```

where `<namespace>` is replaced by the namespace from an Import Object in the current document, and `<componentName>` MUST but the name of an Object in the imported document's Components Object, under the appropriate semantic type section.  Therefore:

```YAML
openapi: 4.0.0
self: https://example.com/fooComponents
components:
  pathItems:
    Foos: {...}
  schemas:
    Foos: {...}
```
```YAML
openapi: 4.0.0
self: https://example.com/fooPaths
components:
  pathItems:
    Bars: {...}
imports:
- namespace: foo
  href: fooComponents
paths:
  /foos: foo:Foos
  /bars: self:Bars
```

In this example, the import `href` "fooComponents" is an IRI-reference resolved against `self` as a base IRI, producing `https://example.com/fooComponents`.  Since the `foo:Foos` is found where a Path Item Object is expected, the "Foos" entry under `pathItems` is used rather than the identically-named Schema Object under `schemas`.

The `/bars` entry shows how to use a component from the current document with the reserved `self` namespace.

#### Referencing a Complete Document

Some fields require a document-level reference, such as connecting a deployment to its shape.  In that case, only the namespace is used, without the component name separator:

```YAML
  <fieldName>: <namespace>
```

This form MUST only be used when it makes sense to talk about the effect of the complete document, rather than components within the document.

#### Locating and Loading Imported Resources

<p class="ednote">The requirements in this section are phrased to allow, but not require, compliant implementations to delegate all I/O to applications.  It should also be possible to implement resolvers separate from the core OAS support, somewhat like reference resolvers/removers but with much better UX.
</p>

Implementations MUST support two methods of resolving imports:

* matching the import IRI to the resource's self-assigned IRI
* treating the import IRI as a retrieval URL

Note that interacting with local files is equivalent to retrieval using `file:` IRIs ([RFC 8089])(https://datatracker.ietf.org/doc/html/rfc8089).

As implementations cannot determine a self-assigned IRI without parsing the resource, they MUST support pre-loading resources or otherwise configuring some mechanism to load likely candidates on demand.

Implementations MAY directly support URL retrieval.  Those that do SHOULD support URI schemes most relevant to their environment, such as `file:` for local access and `https:` for network access.

Implementations that do not support URL retrieval MUST support associating a retrieval URL with each resource.

#### Security Considerations for URL Retrieval

<p class="ednote">TODO</p>


### Specification Extensions

While the OpenAPI Specification tries to accommodate most use cases, additional data can be added to extend the specification at certain points.

The extensions properties are implemented as patterned fields that are always prefixed by `"x-"`.

Field Pattern | Type | Description
---|:---:|---
^x- | Any | Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. Field names beginning `x-oai-` and `x-oas-` are reserved for uses defined by the [OpenAPI Initiative](https://www.openapis.org/). The value can be `null`, a primitive, an array or an object.

The extensions may or may not be supported by the available tooling, but those may be extended as well to add requested support (if tools are internal or open-sourced).

## Document Processing

#### Parsing Documents

In order to properly handle [Schema Objects](#schemaObject), OAS 3.1 inherits the parsing requirements of [JSON Schema draft 2020-12 §9](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-9), with appropriate modifications regarding base URIs as specified in [Relative References In URIs](#relativeReferencesURI).

This includes a requirement to parse complete documents before deeming a Schema object reference to be unresolvable, in order to detect keywords that might provide the reference target or impact the determination of the appropriate base URI.

Implementations MAY support complete-document parsing in any of the following ways:

* Detecting OpenAPI or JSON Schema documents using media types
* Detecting OpenAPI documents through the root `openapi` property
* Detecting JSON Schema documents through detecting keywords or otherwise successfully parsing the document in accordance with the JSON Schema specification
* Detecting a document containing a referenceable Object at its root based on the expected type of the reference
* Allowing users to configure the type of documents that might be loaded due to a reference to a non-root Object

Implementations that parse referenced fragments of OpenAPI content without regard for the content of the rest of the containing document will miss keywords that change the meaning and behavior of the reference target.
In particular, failing to take into account keywords that change the base URI introduces security risks by causing references to resolve to unintended URIs, with unpredictable results.
While some implementations support this sort of parsing due to the requirements of past versions of this specification, in version 3.1, the result of parsing fragments in isolation is _undefined_ and likely to contradict the requirements of this specification.

While it is possible to structure certain OpenAPI Descriptions to ensure that they will behave correctly when references are parsed as isolated fragments, depending on this is NOT RECOMMENDED.
This specification does not explicitly enumerate the conditions under which such behavior is safe, and provides no guarantee for continued safety in any future versions of the OAS.

A special case of parsing fragments of OAS content would be if such fragments are embedded in another format, referred to as an _embedding format_ with respect to the OAS.
Note that the OAS itself is an embedding format with respect to JSON Schema, which is embedded as Schema Objects.
It is the responsibility of an embedding format to define how to parse embedded content, and OAS implementations that do not document support for an embedding format cannot be expected to parse embedded OAS content correctly.

#### Structural Interoperability

When parsing an OAD, JSON or YAML objects are parsed into specific Objects (such as [Operation Objects](#operationObject), [Response Objects](#responseObject), [Reference Objects](#referenceObject), etc.) based on the parsing context.  Depending on how references are arranged, a given JSON or YAML object can be parsed in multiple different contexts:

* As a full OpenAPI Description document (an [OpenAPI Object](#oasObject) taking up an entire document)
* As the Object type implied by its parent Object within the document
* As a reference target, with the Object type matching the reference source's context

If the same JSON/YAML object is parsed multiple times and the respective contexts require it to be parsed as _different_ Object types, the resulting behavior is _implementation defined_, and MAY be treated as an error if detected.  An example would be referencing an empty Schema Object under `#/components/schemas` where a Path Item Object is expected, as an empty object is valid for both types.  For maximum interoperability, it is RECOMMENDED that OpenAPI Description authors avoid such scenarios.

#### Resolving Implicit Connections


#### Undefined and Implementation-Defined Behavior

This specification deems certain situations to have either _undefined_ or _implementation-defined_ behavior.

Behavior described as _undefined_ is likely, at least in some circumstances, to result in outcomes that contradict the specification.
This description is used when detecting the contradiction is impossible or impractical.
Implementations MAY support undefined scenarios for historical reasons, including ambiguous text in prior versions of the specification.
This support might produce correct outcomes in many cases, but relying on it is NOT RECOMMENDED as there is no guarantee that it will work across all tools or with future specification versions, even if those versions are otherwise strictly compatible with this one.

Behavior described as _implementation-defined_ allows implementations to choose which of several different-but-compliant approaches to a requirement to implement.
This documents ambiguous requirements that API description authors are RECOMMENDED to avoid in order to maximize interoperability.
Unlike undefined behavior, it is safe to rely on implementation-defined behavior if _and only if_ it can be guaranteed that all relevant tools support the same behavior.


## OpenAPI Document Structure

The features of an OpenAPI description can be divided into two main categories: API shape and API deployment. The shape of an API can be described independently of deployment.  An API shape could be deployed many times, but a deployment must reference a single API shape.

The fields that represent the API shape and API deployment both live at the root of an OpenAPI document.

##### General Fixed Fields

Field Name | Type | Description
---|:---:|---
openapi | `string` | **REQUIRED**. This string MUST be the [version number](#versions) of the OpenAPI Specification that the OpenAPI document uses. The `openapi` field SHOULD be used by tooling to interpret the OpenAPI document. This is *not* related to the API [`info.version`](#infoVersion) string.
self | `IRI-reference` (without a fragment) | Sets the IRI of this document, which also serves as its base IRI in accordance with [RFC 3986 §5.1.1](https://www.rfc-editor.org/rfc/rfc3986#section-5.1.1); the value MUST NOT be the empty string
info | [Info Object](#info-object) | **REQUIRED**. Provides metadata about the API. The metadata MAY be used by tooling as required.
 jsonSchemaDialect | `string` | The default value for the `$schema` keyword within [Schema Objects](#schema-object) contained within this OAS document. This MUST be in the form of a URI.
imports |  [ [Import Object](#import-object) ]  | A list of resources to import, from which all references within this document MUST be resolved.
components | [Components Object](#components-object) | An element to hold various schemas for the document.
tags | [ [Tag Object](#tag-object) ] | A list of tags used by the document with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](#operation-object) must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.

The value of `self` is an _identifier_, and not necessarily a _locator_.  The value need not be usable as a URL, and even if it is, the document need not be accessible at that location.

This object MAY be extended with [Specification Extensions](#specification-extensions).

#### Info Object

The object provides metadata about the API.
The metadata MAY be used by the clients if needed, and MAY be presented in editing or documentation generation tools for convenience.

##### Fixed Fields {#info-object-fixed-fields}

Field Name | Type | Description
---|:---:|---
title | `string` | **REQUIRED**. The title of the API.
summary | `string` | A short summary of the API.
description | `string` | A description of the API. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.
termsOfService | `string` | A URL to the Terms of Service for the API. This MUST be in the form of a URL.
contact | [Contact Object](#contact-object) | The contact information for the exposed API.
license | [License Object](#license-object) | The license information for the exposed API.
version | `string` | **REQUIRED**. The version of the OpenAPI description (which is distinct from the [OpenAPI Specification version](#oas-version) or the API implementation version).
externalDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation.

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
name | `string` | The identifying name of the contact person/organization.
url | `string` | The URL pointing to the contact information. This MUST be in the form of a URL.
email | `string` | The email address of the contact person/organization. This MUST be in the form of an email address.

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
name | `string` | **REQUIRED**. The license name used for the API description.
identifier | `string` | An [SPDX](https://spdx.org/licenses/) license expression for the API description. The `identifier` field is mutually exclusive of the `url` field.
url | `string` | A URL to the license used for the API description. This MUST be in the form of a URL. The `url` field is mutually exclusive of the `identifier` field.

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

#### Components Object

TBD

#### Import Object

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
namespace | `string` | **REQUIRED**. A name, unique to the imports in this document, that is used to reference the imported document; this name MUST NOT be 'self'.
href | `IRI-reference` (without a fragment) | **REQUIRED**. The IRI of the document to import; this IRI is not necessarily usable as a URL.


### API Shape

API shape features are used to describe the capabilities of an API and the mechanism for interacting with those capabilties.

##### Shape Fixed Fields

Field Name | Type | Description
---|:---:|---
operations | [ [Operation Object](#operation-object) ] | A list of operations defined for the API.
webhooks | Map[`string`, [Operation Object](#operation-object)] | The incoming webhooks that MAY be received as part of this API and that the API consumer MAY choose to implement. Closely related to the `callbacks` feature, this section describes requests initiated other than by an API call, for example by an out of band registration. The key name is a unique string to refer to each webhook, while the [[#operation-object]] describes a request that may be initiated by the API provider and the expected responses. 


#### Operation Object

Describes a single API operation.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
id | `string` | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The Id value is **case-sensitive**. Tools and libraries MAY use the Id to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.
method | `string` | **REQUIRED** The [HTTP] method used to invoke the operation.
uriTemplate | `string` | A [[RFC6570]] URI template used to construct a URL to invoke the operation.
summary | `string` | A short summary of what the operation does.
description | `string` | A verbose explanation of the operation behavior. [[CommonMark]] MAY be used for rich text representation.
parameters | [[Parameter Object](#parameter-object) \| [Reference Object](#reference-object)] | A list of parameters that are applicable for this operation. A unique parameter is defined by a combination of a [name](#parameterName) and [location](#parameterIn). The list can use the [Reference Object](#reference-object) to link to parameters that are defined at the [OpenAPI Object's components/parameters](#componentsParameters).
requestBody | [Request Body Object](#request-body-object) \| [Reference Object](#reference-object) | The request body applicable for this operation.  The `requestBody` is fully supported in HTTP methods where the HTTP 1.1 specification [RFC7231](https://tools.ietf.org/html/rfc7231#section-4.3.1) has explicitly defined semantics for request bodies.  In other cases where the HTTP spec is vague (such as [GET](https://tools.ietf.org/html/rfc7231#section-4.3.1), [HEAD](https://tools.ietf.org/html/rfc7231#section-4.3.2) and [DELETE](https://tools.ietf.org/html/rfc7231#section-4.3.5)), `requestBody` is permitted but does not have well-defined semantics and SHOULD be avoided if possible.
responses | [Responses Object](#responses-object) | The list of possible responses as they are returned from executing this operation.
callbacks | Map[`string`, [Callback Object](#callback-object) \| [Reference Object](#reference-object)] | A map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the Callback Object. Each value in the map is a [Callback Object](#callback-object) that describes a request that may be initiated by the API provider and the expected responses.
security | [[Security Requirement Object](#security-requirement-object)] | A declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. To make security optional, an empty security requirement (`{}`) can be included in the array. This definition overrides any declared top-level [`security`](#oasSecurity). To remove a top-level security declaration, an empty array can be used.
tags | [`string`] | A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.
externalDocs | [External Documentation Object](#external-documentation-object) | Additional external documentation for this operation.
deprecated | `boolean` | Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is `false`.

This object MAY be extended with [Specification Extensions](#specification-extensions).

##### Operation Object Example

```json
{
  "summary": "Updates a pet in the store with form data",
  "id": "updatePetWithForm",
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
  "tags": [
    "pet"
  ],
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

API deployment features are used to describe where an API shape has been deployed and what kind of security schemes are used to protect it..

##### Deployment Fixed Fields

Field Name | Type | Description
---|:---:|---
deployments | map[ [Deployment Object](#deployment-object)] | A map of deployment Objects, which provide information about how to interact with a deployed instance of an API shape.

##### Deployment Example

```yaml
deployments:
    default: 
      title: "prod - ca"
      location: https://api.example.ca
      security:
          - basic: []
```

#### Deployment Object

##### Deployment Fixed Fields

Field Name | Type | Description
---|:---:|---
title | `string` | **REQUIRED**. The title of the deployment.
location | `string` | **REQUIRED**. The URL of the deployed API.
security | [[Security Requirement Object](#security-requirement-object)] | A declaration of which security mechanisms can be used with this API deployment. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition. To make security optional, an empty security requirement (`{}`) can be included in the array.

#### Security Scheme Object

Defines a security scheme that MAY be used by a [[#security-requirements-object]].

<p class="ednote">This security scheme is significantly different than that of OAS 3.0. It is based on the proposal here https://github.com/OAI/sig-security/blob/main/2021-05-19-New-Security-Definitions.md. We are seeing a significant increase in the number of security mechanism being used and proposed. The current design is unnecessarily complex and will get worse as more security mechansims are added. </p>

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
type | `string` |  **REQUIRED**. The type of the security scheme. Valid values are `"apiKey"`, `"http"`, `"mutualTLS"`, `"oauth2"`, `"openIdConnect"`.
description | `string` | A description for security scheme. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.
credential | [Credential Object](#credential-object) |  **REQUIRED**. An array of credential locations that convey how the credential can be included in the HTTP request. The array MUST contain at least one element. 
config | [Security Config Object](#security-config-object)  |  **REQUIRED**. An object with security configuration information specific to declared `type` value.

This object MAY be extended with [Specification Extensions](#specification-extensions).

#### Credential Object

A credential object specifies where in the HTTP request the credential is provided.

##### Field Fields

| Field Name | Type |  Description |
| ---------- | ---- |  ----------- |
| in | `string` | **REQUIRED.** Specifies where in the request the credential is provided.  Valid values are: `body`, `cookie`, `header`, `path` and `query` |
| format | `regex` |  Specifies the format of the credential.  Since in many cases, the credential is a subset of the raw value, `format` must be a regular expression that matches the complete value, and contains a single capturing group to match the actual value within the raw value. |
| name | `string` | **REQUIRED.** Specifies the name used to resolve the credential in the location provided by `in`. |

<p class="ednote">We should discuss the use of regex in the format field. It is a powerful tool but can be difficult to use. We may want to consider a simpler format that is easier to use.</p>

#### Security Config Object

 The security config object is an abstract type that represents one of the concrete security configuration objects. The concrete type is determined by the `type` field of the parent [Security Scheme Object](#security-scheme-object).

  - [ApiKey Config Object](#apikey-config-object)
  - [OAuth2 Config Object](#oauth2-config-object)
  - [OIDC Config Object](#oidc-config-object)
  - [HTTP Config Object](#http-config-object)

##### ApiKey Config Object

 TBD

##### OAuth2 Config Object

 TBD

 ##### OIDC Config Object

 TBD

 ##### HTTP Config Object

 TBD



## Appendix

<section class="appendix">

## Revision History

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

</section>

<section class="appendix" id="issue-summary">
  <!-- A list of issues will magically appear here -->
</section>