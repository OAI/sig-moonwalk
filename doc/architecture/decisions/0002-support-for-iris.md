# 2. Support for IRIs

Date: 2024-02-29

## Status

Accepted

## Context

The OpenAPI Specification (OAS) version 3 and earlier only support RFC 3986 URIs / URLs, for both API endpoints and for identifying and/or locating OpenAPI Description (OAD) documents.  This means that users whose languages cannot be represented in the US-ASCII character set must encode all components (authorities, paths, query strings, and/or fragments) that include non-US-ASCII characters in accordance with [RFC 3987 §3.1](https://www.rfc-editor.org/rfc/rfc3987.html#section-3.1).

The results of such encodings are not human-readible:

IRI: https://www.例如.中国/api/中国/endpoint?例=如#如
URI: https://www.xn--fsqu6v.xn--fiqs8s/api/%E4%B8%AD%E5%9B%BD/endpoint?%E4%BE%8B=%E5%A6%82#%E5%A6%82

IRI: http://اب.تث.جح/خد/ذر/زس?شص=ضط;ظع=غف#قك
URI: http://xn--mgbc.xn--pgbc.xn--rgbc/%D8%AE%D8%AF/%D8%B0%D8%B1/%D8%B2%D8%B3?%D8%B4%D8%B5=%D8%B6%D8%B7;%D8%B8%D8%B9=%D8%BA%D9%81#%D9%82%D9%83

It's 2024, and the OAS is used all over the world.  Everyone should be able to read identifiers in their own language and writing system.

## Decision

All places where a URI/URL(-reference) would be used will be specified to allow an IRI(-reference) in UTF-8 encoding.  If RFC 6570 URI Templates are used, then in accordance with [the last paragraph of section 1.1](https://www.rfc-editor.org/rfc/rfc6570.html#section-1.1) of that RFC, such templates will allow the use of the full IRI-supported character set.

## Consequences

Implementations MUST support displaying IRIs and allowing their direct entry.  When using an IRI as a URL, they will need to tranlsate the IRI to a URI first, or delegate such translation to an IRI-aware retrieval library.  (Retrieval is not defined directly on IRI; there is no such thing as an "Internationalized Resource Locator").

Implementations MAY perform operations such as relative reference resolution, normalization, comparison, etc. either on IRIs or on IRIs encoded to URIs, but MUST display the results of such operations as IRIs.

Implementations that already support I18N should not have difficulty with the display requirements, although implementations that assume US-ASCII, or at least left-to-right character ordering, will be impacted more substantially.
