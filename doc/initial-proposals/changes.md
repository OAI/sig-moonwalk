# Major Changes from V3
* PathItem object is identified using a full UriTemplate
* Operation objects are replaced by requests objects and are named
* Response objects are named.
* Info object is optional to allow aggregation of files into a single API
* Parameters are defined by a JSON Schema object that is a combination of the pathItem parameterSchema and the request parameterSchema
* pathitem key is relative and does NOT start with a slash


# Issues addressed by this change
## no more parameter arrays
## no more deeply nested structure
## Collapsed structure shows names of requests and responses.
## Responses are named and use pattern matching so are much more flexible.
## ParameterSchema can be used to define interdependent parameters
## Treating parameters as JSON Schema objects allows doing allOf to reuse parameter groups
## Creating names for requests and responses provides a hint for co-pilot to suggest the right response/request