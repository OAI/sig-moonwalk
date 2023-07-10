# Moonwalk Document refactoring

The initial moonwalk proposal was primarily focused on how to describe the paths, requests and responses of an API.  Further discussions around the growing needs of the API community have identified additional opportunities for improvement by refactoring the structure of the OpenAPI document and the elements it contains.

## Requirements:

- Advertise a list of APIs that share an endpoint
- Enable those APIs to either reuse descriptions or to use different API descriptions (potentionally with different description formats)
- Naturally support the existing use cases of OpenAPI


## Current sitation

The description of an API contained in an OpenAPI document may actually be implemented by multiple services. Or it may not be implemented by any. In the case of industry standards bodies defining API shapes, the API may be implemented by completely different organizations than those describing the API shape.

OpenAPI v3 does not make a clear delineation between the shape of the API and certain implementation details of the API by intention. 

## Proposal

For moonwalk this proposal suggests that we create a new object called `deployment` that captures the deployment details of a specific instance of an API along with certain implementation characteristics.  The `deployment` object provides the context necessary you need to be able to call API operations without providing any details about the shape of the API.

```mermaid
classDiagram
  class OpenAPI {

  }
  OpenAPI --> Info:descriptionInfo
  OpenAPI "0" --> "0-1" Deployment
  
  class Deployment {
  }
  Deployment --> Info:apiInfo
  Deployment --> Server
  Deployment --> TermsOfUse
  Deployment --> Pricing
  
  class Server {
  }

  Server "0" --> "*" SecurityRequirement:security  

  class Info {
    title: string
    description: string
    contact: string
    version: string
  }

  class SecurityRequirement {

  }

  OpenAPI "0" --> "*" pathItem:paths  
  OpenAPI "0" --> "*" response:apiResponses

  class pathItem {
    uriTemplate: UriTemplate
    parameterSchema: JSONSchema
  }
  pathItem "0" --> "*" request:requests
  pathItem "0" --> "*" response:pathResponses

  class request {
    method: string
    contentType: string
    contentSchema: JSONSchema
    parameterSchema: JSONSchema
  }
  request "0" --> "*" response:responses

  class response {
    status: string
    contentType: string
    contentSchema: JSONSchema
  }  

```

A single OpenAPI document may contain zero or multiple Deployment objects for the description contained within the OpenAPI document.

```yaml
OpenApi: 4.0.0
deployments:
    - apiInfo:
        title: "Production Hello API"
        version: 1.0
      location: http://localhost:8080 # might location be optional and assumed to be relative to the location of this document?
      pricing: {} # is it a goal to support non-functional entitlement descriptions like pricing or TOS? Perhaps that is information that is better represented elsewhere for now?
      termsOfUse: {}
      support: {}
      security: 
          - basic: []
      clientRegistrationUrl: "" # if there are different clientRegistrationUrls, then that implies different versions of this document?
descriptionInfo: # why `descriptionInfo`?
  title: ""
paths:
    /hello:
        requests:
          basic:
            method: GET
            responses:
              success:
                status: '200'
                contentType: application/json
                contentSchema: HelloResponse
              fail:
                status: '5XX'
                contentType: application/json
                contentSchema: Error
components:
    schemas:
        Error:
            type: object
            properties:
                code:
                    type: integer
                    format: int32
                message:
                    type: string
        HelloResponse:
            type: object
            properties:
                message:
                    type: string
```

However, an OpenAPI document may also contain only Deployment entries and each Deployment object can contain a pointer to a separate API Description. This enables OpenAPI document files to fulfill the role of an API catalog.

# Do we want this to fulfill the role of a catalog? It is not common to independently manage the various servers that fulfull the example deployments. It also runs into challenges around role-based access control for who can see what.

```yaml
openapi: 4.0.0
deployments:
    - apiInfo:
        title: "API A"
        version: 1.0
      server: http://localhost:8080/A
      pricing: {}
      termsOfUse: {}
      support: {}
      security:
          - basic: []
      clientRegistrationUrl: ""
      apiDescriptionUrl: http://localhost:8080/A/openapi.json
    - apiInfo:
        title: "API B"
        version: 1.0
      server: http://localhost:8080/B
      pricing: {}
      termsOfUse: {}
      support: {}
      security:
          - basic: []
      clientRegistrationUrl: ""
      apiDescriptionUrl: http://localhost:8080/B/openapi.json
```
