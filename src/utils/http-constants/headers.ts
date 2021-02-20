export const headers = {
    "Content-Encoding": {
        "header": "Content-Encoding",
        "description": "\"indicates what content codings have been applied to the representation, beyond those inherent in the media type, and thus what decoding mechanisms have to be applied in order to obtain data in the media type referenced by the Content-Type header field.\"",
        "spec_title": "RFC7231#3.1.2.2",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-3.1.2.2"
    },
    "Content-Language": {
        "header": "Content-Language",
        "description": "\"describes the natural language(s) of the intended audience for the representation.\"",
        "spec_title": "RFC7231#3.1.3.2",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-3.1.3.2"
    },
    "Content-Location": {
        "header": "Content-Location",
        "description": "\"references a URI that can be used as an identifier for a specific resource corresponding to the representation in this message's payload.\"",
        "spec_title": "RFC7231#3.1.4.2",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-3.1.4.2"
    },
    "Content-Type": {
        "header": "Content-Type",
        "description": "\"indicates the media type of the associated representation: either the representation enclosed in the message payload or the selected representation, as determined by the message semantics.\"",
        "spec_title": "RFC7231#3.1.1.5",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-3.1.1.5"
    },
    "Content-Length": {
        "header": "Content-Length",
        "description": "\"can provide the anticipated size, as a decimal number of octets, for a potential payload body.\"",
        "spec_title": "RFC7230#3.3.2",
        "spec_href": "https://tools.ietf.org/html/rfc7230#section-3.3.2"
    },
    "Content-Range": {
        "header": "Content-Range",
        "description": "\"is sent in a single part 206 (Partial Content) response to indicate the partial range of the selected representation enclosed as the message payload, sent in each part of a multipart 206 response to indicate the range enclosed within each body part, and sent in 416 (Range Not Satisfiable) responses to provide information about the selected representation.\"",
        "spec_title": "RFC7233#4.2",
        "spec_href": "https://tools.ietf.org/html/rfc7233#section-4.2"
    },
    "Transfer-Encoding": {
        "header": "Transfer-Encoding",
        "description": "\"lists the transfer coding names corresponding to the sequence of transfer codings that have been (or will be) applied to the payload body in order to form the message body.\"",
        "spec_title": "RFC7230#3.3.1",
        "spec_href": "https://tools.ietf.org/html/rfc7230#section-3.3.1"
    },
    "Cache-Control": {
        "header": "Cache-Control",
        "description": "\"is used to specify directives for caches along the request/response chain.\"",
        "spec_title": "RFC7234#7.2",
        "spec_href": "https://tools.ietf.org/html/rfc7234#section-7.2"
    },
    "Expect": {
        "header": "Expect",
        "description": "\"is used to indicate that particular server behaviors are required by the client.\"",
        "spec_title": "RFC7231#5.1.1",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-5.1.1"
    },
    "Host": {
        "header": "Host",
        "description": "\"provides the host and port information from the target URI, enabling the origin server to distinguish among resources while servicing requests for multiple host names on a single IP address.\"",
        "spec_title": "RFC7230#5.4",
        "spec_href": "https://tools.ietf.org/html/rfc7230#section-5.4"
    },
    "HTTP2-Settings": {
        "header": "HTTP2-Settings",
        "description": "\"A request that upgrades from HTTP/1.1 to HTTP/2 MUST include exactly one HTTP2-Settings header field. The HTTP2-Settings header field is a connection-specific header field that includes parameters that govern the HTTP/2 connection, provided in anticipation of the server accepting the request to upgrade.\"",
        "spec_title": "RFC7540#3.2.1",
        "spec_href": "https://tools.ietf.org/html/rfc7540#section-3.2.1"
    },
    "Max-Forwards": {
        "header": "Max-Forwards",
        "description": "\"provides a mechanism with the TRACE and OPTIONS methods to limit the number of times that the request is forwarded by proxies.\"",
        "spec_title": "RFC7231#5.1.2",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-5.1.2"
    },
    "Pragma": {
        "header": "Pragma",
        "description": "\"allows backwards compatibility with HTTP/1.0 caches, so that clients can specify a \"no-cache\" request that they will understand (as Cache-Control was not defined until HTTP/1.1).\"",
        "spec_title": "RFC7234#7.4",
        "spec_href": "https://tools.ietf.org/html/rfc7234#section-7.4"
    },
    "Range": {
        "header": "Range",
        "description": "\"modifies the method semantics to request transfer of only one or more subranges of the selected representation data, rather than the entire selected representation data.\"",
        "spec_title": "RFC7233#3.1",
        "spec_href": "https://tools.ietf.org/html/rfc7233#section-3.1"
    },
    "TE": {
        "header": "TE",
        "description": "\"indicates what transfer codings, besides chunked, the client is willing to accept in response, and whether or not the client is willing to accept trailer fields in a chunked transfer coding.\"",
        "spec_title": "RFC7230#4.3",
        "spec_href": "https://tools.ietf.org/html/rfc7230#section-4.3"
    },
    "If-Match": {
        "header": "If-Match",
        "description": "\"can be used to make a request method conditional on the current existence or value of an entity-tag for one or more representations of the target resource.\"",
        "spec_title": "RFC7232#3.1",
        "spec_href": "https://tools.ietf.org/html/rfc7232#section-3.1"
    },
    "If-Modified-Since": {
        "header": "If-Modified-Since",
        "description": "\"can be used with GET or HEAD to make the method conditional by modification date: if the selected representation has not been modified since the time specified in this field, then do not perform the request method; instead, respond as detailed below.\"",
        "spec_title": "RFC7232#3.3",
        "spec_href": "https://tools.ietf.org/html/rfc7232#section-3.3"
    },
    "If-None-Match": {
        "header": "If-None-Match",
        "description": "\"can be used to make a request method conditional on not matching any of the current entity-tag values for representations of the target resource.\"",
        "spec_title": "RFC7232#3.2",
        "spec_href": "https://tools.ietf.org/html/rfc7232#section-3.2"
    },
    "If-Range": {
        "header": "If-Range",
        "description": "\"Informally, its meaning is: if the representation is unchanged, send me the part(s) that I am requesting in Range; otherwise, send me the entire representation.\"",
        "spec_title": "RFC7233#3.2",
        "spec_href": "https://tools.ietf.org/html/rfc7233#section-3.2"
    },
    "If-Unmodified-Since": {
        "header": "If-Unmodified-Since",
        "description": "\"can be used to make a request method conditional by modification date: if the selected representation has been modified since the time specified in this field, then the server MUST NOT perform the requested operation and MUST instead respond with the 412 (Precondition Failed) status code.\"",
        "spec_title": "RFC7232#3.4",
        "spec_href": "https://tools.ietf.org/html/rfc7232#section-3.4"
    },
    "Accept": {
        "header": "Accept",
        "description": "\"can be used to specify certain media types which are acceptable for the response.\"",
        "spec_title": "RFC7231#5.3.2",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-5.3.2"
    },
    "Accept-Charset": {
        "header": "Accept-Charset",
        "description": "\"can be sent by a user agent to indicate what charsets are acceptable in textual response content.\"",
        "spec_title": "RFC7231#5.3.3",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-5.3.3"
    },
    "Accept-Encoding": {
        "header": "Accept-Encoding",
        "description": "\"can be used by user agents to indicate what response content-codings are acceptable in the response.\"",
        "spec_title": "RFC7231#5.3.4",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-5.3.4"
    },
    "Accept-Language": {
        "header": "Accept-Language",
        "description": "\"can be used by user agents to indicate the set of natural languages that are preferred in the response.\"",
        "spec_title": "RFC7231#5.3.5",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-5.3.5"
    },
    "Authorization": {
        "header": "Authorization",
        "description": "\"allows a user agent to authenticate itself with a server -- usually, but not necessarily, after receiving a 401 (Unauthorized) response.\"",
        "spec_title": "RFC7235#4.1",
        "spec_href": "https://tools.ietf.org/html/rfc7235#section-4.1"
    },
    "Proxy-Authorization": {
        "header": "Proxy-Authorization",
        "description": "\"allows the client to identify itself (or its user) to a proxy that requires authentication.\"",
        "spec_title": "RFC7235#4.3",
        "spec_href": "https://tools.ietf.org/html/rfc7235#section-4.3"
    },
    "DNT": {
        "header": "DNT",
        "description": "\"defined as the means for expressing a user's tracking preference via HTTP.\"",
        "spec_title": "Tracking Preference Expression (DNT)",
        "spec_href": "https://www.w3.org/TR/tracking-dnt/#dnt-header-field"
    },
    "From": {
        "header": "From",
        "description": "\"contains an Internet email address for a human user who controls the requesting user agent.\"",
        "spec_title": "RFC7231#5.5.1",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-5.5.1"
    },
    "Referer": {
        "header": "Referer",
        "description": "\"allows the user agent to specify a URI reference for the resource from which the target URI was obtained (i.e., the \"referrer\", though the field name is misspelled).\"",
        "spec_title": "RFC7231#5.5.2",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-5.5.2"
    },
    "User-Agent": {
        "header": "User-Agent",
        "description": "\"contains information about the user agent originating the request, which is often used by servers to help identify the scope of reported interoperability problems, to work around or tailor responses to avoid particular user agent limitations, and for analytics regarding browser or operating system use.\"",
        "spec_title": "RFC7231#5.5.3",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-5.5.3"
    },
    "Age": {
        "header": "Age",
        "description": "\"conveys the sender's estimate of the amount of time since the response was generated or successfully validated at the origin server.\"",
        "spec_title": "RFC7234#5.1",
        "spec_href": "https://tools.ietf.org/html/rfc7234#section-5.1"
    },
    "Expires": {
        "header": "Expires",
        "description": "\"gives the date/time after which the response is considered stale.\"",
        "spec_title": "RFC7234#7.3",
        "spec_href": "https://tools.ietf.org/html/rfc7234#section-7.3"
    },
    "Date": {
        "header": "Date",
        "description": "\"represents the date and time at which the message was originated\"",
        "spec_title": "RFC7231#7.1.1.2",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-7.1.1.2"
    },
    "Location": {
        "header": "Location",
        "description": "\"is used in some responses to refer to a specific resource in relation to the response.\"",
        "spec_title": "RFC7231#7.1.2",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-7.1.2"
    },
    "Retry-After": {
        "header": "Retry-After",
        "description": "\"indicates how long the user agent ought to wait before making a follow-up request.\"",
        "spec_title": "RFC7231#7.1.3",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-7.1.3"
    },
    "Tk": {
        "header": "Tk",
        "description": "\"defined as an OPTIONAL means for indicating the tracking status that applied to the corresponding request and as a REQUIRED means for indicating that a state-changing request has resulted in an interactive change to the tracking status. \"",
        "spec_title": "Tracking Preference Expression (DNT)",
        "spec_href": "https://www.w3.org/TR/tracking-dnt/#response-header-field"
    },
    "Vary": {
        "header": "Vary",
        "description": "\"describes what parts of a request message, aside from the method and request target, might influence the origin server's process for selecting and representing the response.\"",
        "spec_title": "RFC7231#7.1.4",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-7.1.4"
    },
    "Warning": {
        "header": "Warning",
        "description": "\"is used to carry additional information about the status or transformation of a message that might not be reflected in the message.\"",
        "spec_title": "RFC7234#7.6",
        "spec_href": "https://tools.ietf.org/html/rfc7234#section-7.6"
    },
    "ETag": {
        "header": "ETag",
        "description": "\"provides the current entity-tag for the selected representation, as determined at the conclusion of handling the request.\"",
        "spec_title": "RFC7232#2.3",
        "spec_href": "https://tools.ietf.org/html/rfc7232#section-2.3"
    },
    "Last-Modified": {
        "header": "Last-Modified",
        "description": "\"provides a timestamp indicating the date and time at which the origin server believes the selected representation was last modified, as determined at the conclusion of handling the request.\"",
        "spec_title": "RFC7232#2.2",
        "spec_href": "https://tools.ietf.org/html/rfc7232#section-2.2"
    },
    "WWW-Authenticate": {
        "header": "WWW-Authenticate",
        "description": "\"consists of at least one challenge that indicates the authentication scheme(s) and parameters applicable to the effective request URI.\"",
        "spec_title": "RFC7235#4.4",
        "spec_href": "https://tools.ietf.org/html/rfc7235#section-4.4"
    },
    "Proxy-Authenticate": {
        "header": "Proxy-Authenticate",
        "description": "\"consists of at least one challenge that indicates the authentication scheme(s) and parameters applicable to the proxy for this effective request URI.\"",
        "spec_title": "RFC7235#4.2",
        "spec_href": "https://tools.ietf.org/html/rfc7235#section-4.2"
    },
    "Accept-Ranges": {
        "header": "Accept-Ranges",
        "description": "\"allows a server to indicate that it supports range requests for the target resource.\"",
        "spec_title": "RFC7233#2.3",
        "spec_href": "https://tools.ietf.org/html/rfc7233#section-2.3"
    },
    "Allow": {
        "header": "Allow",
        "description": "\"lists the set of methods advertised as supported by the target resource.\"",
        "spec_title": "RFC7231#7.4.1",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-7.4.1"
    },
    "Server": {
        "header": "Server",
        "description": "\"contains information about the software used by the origin server to handle the request, which is often used by clients to help identify the scope of reported interoperability problems, to work around or tailor requests to avoid particular server limitations, and for analytics regarding server or operating system use.\"",
        "spec_title": "RFC7231#7.4.2",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-7.4.2"
    },
    "Accept-Patch": {
        "header": "Accept-Patch",
        "description": "\"used to specify the patch document formats accepted by the server.\"",
        "spec_title": "RFC5789#3.1",
        "spec_href": "https://tools.ietf.org/html/rfc5789#section-3.1"
    },
    "Accept-Post": {
        "header": "Accept-Post",
        "description": "\"indicates server support for specific media types for entity bodies in HTTP POST requests.\"",
        "spec_title": "draft-wilde-accept-post",
        "spec_href": "https://tools.ietf.org/html/draft-wilde-accept-post"
    },
    "Access-Control-Allow-Credentials": {
        "header": "Access-Control-Allow-Credentials",
        "description": "\"indicates whether the response to request can be exposed when the omit credentials flag is unset\"",
        "spec_title": "CORS",
        "spec_href": "https://www.w3.org/TR/cors/#access-control-allow-credentials-response-header"
    },
    "Access-Control-Allow-Headers": {
        "header": "Access-Control-Allow-Headers",
        "description": "\"indicates, as part of the response to a preflight request, which header field names can be used during the actual request\"",
        "spec_title": "CORS",
        "spec_href": "https://www.w3.org/TR/cors/#access-control-allow-headers-response-header"
    },
    "Access-Control-Allow-Methods": {
        "header": "Access-Control-Allow-Methods",
        "description": "\"indicates, as part of the response to a preflight request, which methods can be used during the actual request\"",
        "spec_title": "CORS",
        "spec_href": "https://www.w3.org/TR/cors/#access-control-allow-methods-response-header"
    },
    "Access-Control-Allow-Origin": {
        "header": "Access-Control-Allow-Origin",
        "description": "\"indicates whether a resource can be shared\"",
        "spec_title": "CORS",
        "spec_href": "https://www.w3.org/TR/cors/#access-control-allow-origin-response-header"
    },
    "Access-Control-Expose-Headers": {
        "header": "Access-Control-Expose-Headers",
        "description": "\"indicates which headers are safe to expose to the API of a CORS API specification\"",
        "spec_title": "CORS",
        "spec_href": "https://www.w3.org/TR/cors/#access-control-expose-headers-response-header"
    },
    "Access-Control-Max-Age": {
        "header": "Access-Control-Max-Age",
        "description": "\"indicates how long the results of a preflight request can be cached in a preflight result cache\"",
        "spec_title": "CORS",
        "spec_href": "https://www.w3.org/TR/cors/#access-control-max-age-response-header"
    },
    "Access-Control-Request-Headers": {
        "header": "Access-Control-Request-Headers",
        "description": "\"indicates which headers will be used in the actual request as part of the preflight request\"",
        "spec_title": "CORS",
        "spec_href": "https://www.w3.org/TR/cors/#access-control-request-headers-request-header"
    },
    "Access-Control-Request-Method": {
        "header": "Access-Control-Request-Method",
        "description": "\"indicates which method will be used in the actual request as part of the preflight request\"",
        "spec_title": "CORS",
        "spec_href": "https://www.w3.org/TR/cors/#access-control-request-method-request-header"
    },
    "Content-Disposition": {
        "header": "Content-Disposition",
        "description": "\"standard\"",
        "spec_title": "RFC6266",
        "spec_href": "https://tools.ietf.org/html/rfc6266"
    },
    "Content-Security-Policy": {
        "header": "Content-Security-Policy",
        "description": "\"is the preferred mechanism for delivering a CSP policy\"",
        "spec_title": "CSP",
        "spec_href": "https://www.w3.org/TR/CSP/#content-security-policy-header-field"
    },
    "Content-Security-Policy-Report-Only": {
        "header": "Content-Security-Policy-Report-Only",
        "description": "\"lets servers experiment with policies by monitoring (rather than enforcing) a policy\"",
        "spec_title": "CSP",
        "spec_href": "https://www.w3.org/TR/CSP/#content-security-policy-report-only-header-field"
    },
    "Cookie": {"header": "Cookie", "description": "\"standard\"", "spec_title": "RFC6265", "spec_href": "https://tools.ietf.org/html/rfc6265"},
    "Forwarded": {"header": "Forwarded", "description": "\"standard\"", "spec_title": "RFC7239", "spec_href": "https://tools.ietf.org/html/rfc7239"},
    "Link": {
        "header": "Link",
        "description": "\"provides a means for serialising one or more links in HTTP headers.\"",
        "spec_title": "RFC5988#5",
        "spec_href": "https://tools.ietf.org/html/rfc5988#section-5"
    },
    "Origin": {"header": "Origin", "description": "\"standard\"", "spec_title": "RFC6454", "spec_href": "https://tools.ietf.org/html/rfc6454"},
    "Prefer": {
        "header": "Prefer",
        "description": "\"is used to indicate that particular server behaviors are preferred by the client, but not required for successful completion of the request.\"",
        "spec_title": "RFC7240#2",
        "spec_href": "https://tools.ietf.org/html/rfc7240#section-2"
    },
    "Preference-Applied": {
        "header": "Preference-Applied",
        "description": "\"MAY be included within a response message as an indication as to which Prefer tokens were honored by the server and applied to the processing of a request.\"",
        "spec_title": "RFC7240#3",
        "spec_href": "https://tools.ietf.org/html/rfc7240#section-3"
    },
    "Set-Cookie": {
        "header": "Set-Cookie",
        "description": "\"standard\"",
        "spec_title": "RFC6265",
        "spec_href": "https://tools.ietf.org/html/rfc6265"
    },
    "Strict-Transport-Security": {
        "header": "Strict-Transport-Security",
        "description": "\"standard\"",
        "spec_title": "RFC6797",
        "spec_href": "https://tools.ietf.org/html/rfc6797"
    },
    "Via": {"header": "Via", "description": "\"\"", "spec_title": "RFC7230#5.7.1", "spec_href": "https://tools.ietf.org/html/rfc7230#section-5.7.1"},
    "A-IM": {
        "header": "A-IM",
        "description": "\"\"",
        "spec_title": "RFC3229#10.5.3",
        "spec_href": "https://tools.ietf.org/html/rfc3229#section-10.5.3"
    },
    "Accept-CH": {
        "header": "Accept-CH",
        "description": "\"advertise support for Client Hints\"",
        "spec_title": "draft-grigorik-http-client-hints",
        "spec_href": "https://tools.ietf.org/html/draft-grigorik-http-client-hints"
    },
    "Accept-Features": {
        "header": "Accept-Features",
        "description": "\"can be used by a user agent to give information about the presence or absence of certain features in the feature set of the current request.\"",
        "spec_title": "RFC2295#8.2",
        "spec_href": "https://tools.ietf.org/html/rfc2295#section-8.2"
    },
    "ALPN": {
        "header": "ALPN",
        "description": "\"indicates the application-layer protocol that a client intends to use within the tunnel, or a set of protocols that might be used within the tunnel.\"",
        "spec_title": "RFC7639#2",
        "spec_href": "https://tools.ietf.org/html/rfc7639#section-2"
    },
    "Alt-Svc": {
        "header": "Alt-Svc",
        "description": "\"is advertising the availability of alternate services to HTTP/1.1 and HTTP/2.0 clients by adding an Alt-Svc header field to responses.\"",
        "spec_title": "draft-nottingham-httpbis-alt-svc",
        "spec_href": "https://tools.ietf.org/html/draft-nottingham-httpbis-alt-svc"
    },
    "Alternates": {
        "header": "Alternates",
        "description": "\"is used to convey the list of variants bound to a negotiable resource.\"",
        "spec_title": "RFC2295#8.3",
        "spec_href": "https://tools.ietf.org/html/rfc2295#section-8.3"
    },
    "Apply-To-Redirect-Ref": {
        "header": "Apply-To-Redirect-Ref",
        "description": "\"\"",
        "spec_title": "RFC4437",
        "spec_href": "https://tools.ietf.org/html/rfc4437"
    },
    "CH": {
        "header": "CH",
        "description": "\"describes an example list of client preferences that the server can use to adapt and optimize the resource to satisfy a given request.\"",
        "spec_title": "draft-grigorik-http-client-hints",
        "spec_href": "https://tools.ietf.org/html/draft-grigorik-http-client-hints"
    },
    "Content-Base": {
        "header": "Content-Base",
        "description": "\"obsoleted\"",
        "spec_title": "RFC2068",
        "spec_href": "https://tools.ietf.org/html/rfc2068"
    },
    "Content-DPR": {
        "header": "Content-DPR",
        "description": "\"is a number that indicates the ratio between physical pixels over CSS px of the selected image response.\"",
        "spec_title": "draft-grigorik-http-client-hints",
        "spec_href": "https://tools.ietf.org/html/draft-grigorik-http-client-hints"
    },
    "Cookie2": {"header": "Cookie2", "description": "\"obsoleted\"", "spec_title": "RFC2965", "spec_href": "https://tools.ietf.org/html/rfc2965"},
    "DASL": {"header": "DASL", "description": "\"standard\"", "spec_title": "RFC5323", "spec_href": "https://tools.ietf.org/html/rfc5323"},
    "DAV": {"header": "DAV", "description": "\"standard\"", "spec_title": "RFC4918", "spec_href": "https://tools.ietf.org/html/rfc4918"},
    "Delta-Base": {
        "header": "Delta-Base",
        "description": "\"\"",
        "spec_title": "RFC3229#10.5.1",
        "spec_href": "https://tools.ietf.org/html/rfc3229#section-10.5.1"
    },
    "Depth": {"header": "Depth", "description": "\"standard\"", "spec_title": "RFC4918", "spec_href": "https://tools.ietf.org/html/rfc4918"},
    "Destination": {
        "header": "Destination",
        "description": "\"standard\"",
        "spec_title": "RFC4918",
        "spec_href": "https://tools.ietf.org/html/rfc4918"
    },
    "DPR": {
        "header": "DPR",
        "description": "\"is a number that, in requests, indicates the client’s current Device Pixel Ratio (DPR), which is the ratio of physical pixels over CSS px of the layout viewport on the device.\"",
        "spec_title": "draft-grigorik-http-client-hints",
        "spec_href": "https://tools.ietf.org/html/draft-grigorik-http-client-hints"
    },
    "Encryption": {
        "header": "Encryption",
        "description": "\"describes the encrypted content encoding(s) that have been applied to a payload body, and therefore how those content encoding(s) can be removed.\"",
        "spec_title": "draft-thomson-http-encryption",
        "spec_href": "https://tools.ietf.org/html/draft-thomson-http-encryption#section-3"
    },
    "Encryption-Key": {
        "header": "Encryption-Key",
        "description": "\"can be used to describe the input keying material used in the Encryption header field.\"",
        "spec_title": "draft-thomson-http-encryption",
        "spec_href": "https://tools.ietf.org/html/draft-thomson-http-encryption#section-4"
    },
    "IM": {"header": "IM", "description": "\"\"", "spec_title": "RFC3229#10.5.2", "spec_href": "https://tools.ietf.org/html/rfc3229#section-10.5.2"},
    "If": {"header": "If", "description": "\"standard\"", "spec_title": "RFC4918", "spec_href": "https://tools.ietf.org/html/rfc4918"},
    "If-Schedule-Tag-Match": {
        "header": "If-Schedule-Tag-Match",
        "description": "\"standard\"",
        "spec_title": "RFC6638",
        "spec_href": "https://tools.ietf.org/html/rfc6638"
    },
    "Key": {
        "header": "Key",
        "description": "\"allows an origin server to describe the cache key for a negotiated response: a short algorithm that can be used upon later requests to determine if the same response is reusable.\"",
        "spec_title": "draft-fielding-http-key",
        "spec_href": "https://tools.ietf.org/html/draft-fielding-http-key"
    },
    "Last-Event-ID": {
        "header": "Last-Event-ID",
        "description": "\"The value of the event source's last event ID string, encoded as UTF-8.\"",
        "spec_title": "Server-Sent Events",
        "spec_href": "https://www.w3.org/TR/eventsource/#last-event-id"
    },
    "Link-Template": {
        "header": "Link-Template",
        "description": "\"provides a means for serialising one or more links into HTTP headers.\"",
        "spec_title": "draft-nottingham-link-template",
        "spec_href": "https://tools.ietf.org/html/draft-nottingham-link-template"
    },
    "Lock-Token": {
        "header": "Lock-Token",
        "description": "\"standard\"",
        "spec_title": "RFC4918",
        "spec_href": "https://tools.ietf.org/html/rfc4918"
    },
    "MD": {
        "header": "MD",
        "description": "\"is a number that, in requests, indicates the client’s maximum downlink speed in megabits per second (Mbps), which is the standardized, or generally accepted, maximum download data rate for the underlying connection technology in use by the client.\"",
        "spec_title": "draft-grigorik-http-client-hints",
        "spec_href": "https://tools.ietf.org/html/draft-grigorik-http-client-hints"
    },
    "Negotiate": {
        "header": "Negotiate",
        "description": "\"can contain directives for any content negotiation process initiated by the request.\"",
        "spec_title": "RFC2295#8.4",
        "spec_href": "https://tools.ietf.org/html/rfc2295#section-8.4"
    },
    "Nice": {
        "header": "Nice",
        "description": "\"indicates that a request is less important than a request that doesn't bear this header.\"",
        "spec_title": "draft-thomson-http-nice",
        "spec_href": "https://tools.ietf.org/html/draft-thomson-http-nice"
    },
    "Overwrite": {"header": "Overwrite", "description": "\"standard\"", "spec_title": "RFC4918", "spec_href": "https://tools.ietf.org/html/rfc4918"},
    "POE": {
        "header": "POE",
        "description": "\"The POE HTTP header is a request-header field whose field-value indicates the version of POE that a client supports.\"",
        "spec_title": "draft-nottingham-http-poe",
        "spec_href": "https://tools.ietf.org/html/draft-nottingham-http-poe"
    },
    "POE-Links": {
        "header": "POE-Links",
        "description": "\"The POE-Links HTTP header is an entity-header field whose field-value is a comma-separated list of quoted URI-references (without fragment identifiers) that the origin server asserts to be POE resources. The contents of the POE-Links response header SHOULD correspond to links found in the content of the response body.\"",
        "spec_title": "draft-nottingham-http-poe",
        "spec_href": "https://tools.ietf.org/html/draft-nottingham-http-poe"
    },
    "Redirect-Ref": {"header": "Redirect-Ref", "description": "\"\"", "spec_title": "RFC4437", "spec_href": "https://tools.ietf.org/html/rfc4437"},
    "RW": {
        "header": "RW",
        "description": "\"is a number that, in requests, indicates the Resource Width (RW) in CSS px, which is either the display width of the requested resource (e.g. display width of an image), or the layout viewport width if the resource does not have a display width (e.g. a non-image asset).\"",
        "spec_title": "draft-grigorik-http-client-hints",
        "spec_href": "https://tools.ietf.org/html/draft-grigorik-http-client-hints"
    },
    "Schedule-Reply": {
        "header": "Schedule-Reply",
        "description": "\"standard\"",
        "spec_title": "RFC6638",
        "spec_href": "https://tools.ietf.org/html/rfc6638"
    },
    "Schedule-Tag": {
        "header": "Schedule-Tag",
        "description": "\"standard\"",
        "spec_title": "RFC6638",
        "spec_href": "https://tools.ietf.org/html/rfc6638"
    },
    "Sec-WebSocket-Accept": {
        "header": "Sec-WebSocket-Accept",
        "description": "\"standard\"",
        "spec_title": "RFC6455",
        "spec_href": "https://tools.ietf.org/html/rfc6455"
    },
    "Sec-WebSocket-Extensions": {
        "header": "Sec-WebSocket-Extensions",
        "description": "\"standard\"",
        "spec_title": "RFC6455",
        "spec_href": "https://tools.ietf.org/html/rfc6455"
    },
    "Sec-WebSocket-Key": {
        "header": "Sec-WebSocket-Key",
        "description": "\"standard\"",
        "spec_title": "RFC6455",
        "spec_href": "https://tools.ietf.org/html/rfc6455"
    },
    "Sec-WebSocket-Protocol": {
        "header": "Sec-WebSocket-Protocol",
        "description": "\"standard\"",
        "spec_title": "RFC6455",
        "spec_href": "https://tools.ietf.org/html/rfc6455"
    },
    "Sec-WebSocket-Version": {
        "header": "Sec-WebSocket-Version",
        "description": "\"standard\"",
        "spec_title": "RFC6455",
        "spec_href": "https://tools.ietf.org/html/rfc6455"
    },
    "Set-Cookie2": {
        "header": "Set-Cookie2",
        "description": "\"obsoleted\"",
        "spec_title": "RFC2965",
        "spec_href": "https://tools.ietf.org/html/rfc2965"
    },
    "SLUG": {"header": "SLUG", "description": "\"standard\"", "spec_title": "RFC5023", "spec_href": "https://tools.ietf.org/html/rfc5023"},
    "Status-URI": {
        "header": "Status-URI",
        "description": "\"\"",
        "spec_title": "RFC2518",
        "spec_href": "https://tools.ietf.org/html/rfc2518#section-9.7"
    },
    "Sunset": {
        "header": "Sunset",
        "description": "\"allows a server to communicate the fact that a resource is expected to become unresponsive at a specific point in time.\"",
        "spec_title": "draft-wilde-sunset-header",
        "spec_href": "https://tools.ietf.org/html/draft-wilde-sunset-header"
    },
    "Surrogate-Capability": {
        "header": "Surrogate-Capability",
        "description": "\"\"",
        "spec_title": "Edge Architecture",
        "spec_href": "https://www.w3.org/TR/edge-arch"
    },
    "Surrogate-Control": {
        "header": "Surrogate-Control",
        "description": "\"\"",
        "spec_title": "Edge Architecture",
        "spec_href": "https://www.w3.org/TR/edge-arch"
    },
    "TCN": {
        "header": "TCN",
        "description": "\"is used by a server to signal that the resource is transparently negotiated.\"",
        "spec_title": "RFC2295#8.5",
        "spec_href": "https://tools.ietf.org/html/rfc2295#section-8.5"
    },
    "Timeout": {"header": "Timeout", "description": "\"standard\"", "spec_title": "RFC4918", "spec_href": "https://tools.ietf.org/html/rfc4918"},
    "Variant-Vary": {
        "header": "Variant-Vary",
        "description": "\"can be used in a choice response to record any vary information which applies to the variant data (the entity body combined with some of the entity headers) contained in the response, rather than to the response as a whole.\"",
        "spec_title": "RFC2295#8.6",
        "spec_href": "https://tools.ietf.org/html/rfc2295#section-8.6"
    },
    "X-Frame-Options": {
        "header": "X-Frame-Options",
        "description": "\"indicates a policy that specifies whether the browser should render the transmitted resource within a &lt;frame&gt; or an &lt;iframe&gt;. Servers can declare this policy in the header of their HTTP responses to prevent clickjacking attacks, which ensures that their content is not embedded into other pages or frames.\"",
        "spec_title": "RFC7034",
        "spec_href": "https://tools.ietf.org/html/rfc7034"
    }
}
