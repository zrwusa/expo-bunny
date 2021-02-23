export const methods = {
    "CONNECT": {
        "method": "CONNECT",
        "description": "\"requests that the recipient establish a tunnel to the destination origin server identified by the request-target and, if successful, thereafter restrict its behavior to blind forwarding of packets, in both directions, until the connection is closed.\"",
        "safe": true,
        "idempotent": true,
        "cacheable": false,
        "spec_title": "RFC7231#4.3.6",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-4.3.6"
    },
    "DELETE": {
        "method": "DELETE",
        "description": "\"requests that the origin server remove the association between the target resource and its current functionality.\"",
        "safe": false,
        "idempotent": true,
        "cacheable": false,
        "spec_title": "RFC7231#4.3.5",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-4.3.5"
    },
    "GET": {
        "method": "GET",
        "description": "\"requests transfer of a current selected representation for the target resource.\"",
        "safe": true,
        "idempotent": true,
        "cacheable": true,
        "spec_title": "RFC7231#4.3.1",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-4.3.1"
    },
    "HEAD": {
        "method": "HEAD",
        "description": "\"is identical to GET except that the server MUST NOT send a message body in the response (i.e., the response terminates at the end of the header block).\"",
        "safe": true,
        "idempotent": true,
        "cacheable": true,
        "spec_title": "RFC7231#4.3.2",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-4.3.2"
    },
    "OPTIONS": {
        "method": "OPTIONS",
        "description": "\"requests information about the communication options available on the request/response chain identified by the effective request URI.\"",
        "safe": true,
        "idempotent": true,
        "cacheable": false,
        "spec_title": "RFC7231#4.3.7",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-4.3.7"
    },
    "POST": {
        "method": "POST",
        "description": "\"requests that the target resource process the representation enclosed in the request according to the resource's own specific semantics.\"",
        "safe": false,
        "idempotent": false,
        "cacheable": false,
        "spec_title": "RFC7231#4.3.3",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-4.3.3"
    },
    "PUT": {
        "method": "PUT",
        "description": "\"requests that the state of the target resource be created or replaced with the state defined by the representation enclosed in the request message payload.\"",
        "safe": false,
        "idempotent": true,
        "cacheable": false,
        "spec_title": "RFC7231#4.3.4",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-4.3.4"
    },
    "TRACE": {
        "method": "TRACE",
        "description": "\"is used to invoke a remote, application-layer loopback of the request message.\"",
        "safe": true,
        "idempotent": true,
        "cacheable": false,
        "spec_title": "RFC7231#4.3.8",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-4.3.8"
    },
    "ACL": {
        "method": "ACL",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC3744#8.1",
        "spec_href": "https://tools.ietf.org/html/rfc3744#section-8.1"
    },
    "BASELINE-CONTROL": {
        "method": "BASELINE-CONTROL",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC3253#12.6",
        "spec_href": "https://tools.ietf.org/html/rfc3253#section-12.6"
    },
    "BIND": {
        "method": "BIND",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC5842#4",
        "spec_href": "https://tools.ietf.org/html/rfc5842#section-4"
    },
    "CHECKIN": {
        "method": "CHECKIN",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC3253#4.4",
        "spec_href": "https://tools.ietf.org/html/rfc3253#section-4.4"
    },
    "CHECKOUT": {
        "method": "CHECKOUT",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC3253#4.3",
        "spec_href": "https://tools.ietf.org/html/rfc3253#section-4.3"
    },
    "COPY": {
        "method": "COPY",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC4918#9.8",
        "spec_href": "https://tools.ietf.org/html/rfc4918#section-9.8"
    },
    "LABEL": {
        "method": "LABEL",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC3253#8.2",
        "spec_href": "https://tools.ietf.org/html/rfc3253#section-8.2"
    },
    "LINK": {
        "method": "LINK",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC2068#19.6.1.2",
        "spec_href": "https://tools.ietf.org/html/rfc2068#section-19.6.1.2"
    },
    "LOCK": {
        "method": "LOCK",
        "description": "",
        "safe": false,
        "idempotent": false,
        "cacheable": "",
        "spec_title": "RFC4918#9.10",
        "spec_href": "https://tools.ietf.org/html/rfc4918#section-9.10"
    },
    "MERGE": {
        "method": "MERGE",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC3253#11.2",
        "spec_href": "https://tools.ietf.org/html/rfc3253#section-11.2"
    },
    "MKACTIVITY": {
        "method": "MKACTIVITY",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC3253#13.5",
        "spec_href": "https://tools.ietf.org/html/rfc3253#section-13.5"
    },
    "MKCALENDAR": {
        "method": "MKCALENDAR",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC4791#5.3.1",
        "spec_href": "https://tools.ietf.org/html/rfc4791#section-5.3.1"
    },
    "MKCOL": {
        "method": "MKCOL",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC4918#9.3",
        "spec_href": "https://tools.ietf.org/html/rfc4918#section-9.3"
    },
    "MKREDIRECTREF": {
        "method": "MKREDIRECTREF",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC4437#6",
        "spec_href": "https://tools.ietf.org/html/rfc4437#section-6"
    },
    "MKWORKSPACE": {
        "method": "MKWORKSPACE",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC3253#6.3",
        "spec_href": "https://tools.ietf.org/html/rfc3253#section-6.3"
    },
    "MOVE": {
        "method": "MOVE",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC4918#9.9",
        "spec_href": "https://tools.ietf.org/html/rfc4918#section-9.9"
    },
    "ORDERPATCH": {
        "method": "ORDERPATCH",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC3648#7",
        "spec_href": "https://tools.ietf.org/html/rfc3648#section-7"
    },
    "PATCH": {
        "method": "PATCH",
        "description": "\"requests that a set of changes described in the request entity be applied to the resource identified by the Request-URI.\"",
        "safe": false,
        "idempotent": false,
        "cacheable": false,
        "spec_title": "RFC5789",
        "spec_href": "https://tools.ietf.org/html/rfc5789#section-2"
    },
    "PROPFIND": {
        "method": "PROPFIND",
        "description": "",
        "safe": true,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC4918#9.1",
        "spec_href": "https://tools.ietf.org/html/rfc4918#section-9.1"
    },
    "PROPPATCH": {
        "method": "PROPPATCH",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC4918#9.2",
        "spec_href": "https://tools.ietf.org/html/rfc4918#section-9.2"
    },
    "REBIND": {
        "method": "REBIND",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC5842#6",
        "spec_href": "https://tools.ietf.org/html/rfc5842#section-6"
    },
    "REPORT": {
        "method": "REPORT",
        "description": "",
        "safe": true,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC3253#3.6",
        "spec_href": "https://tools.ietf.org/html/rfc3253#section-3.6"
    },
    "SEARCH": {
        "method": "SEARCH",
        "description": "",
        "safe": true,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC5323#2",
        "spec_href": "https://tools.ietf.org/html/rfc5323#section-2"
    },
    "UNBIND": {
        "method": "UNBIND",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC5842#5",
        "spec_href": "https://tools.ietf.org/html/rfc5842#section-5"
    },
    "UNCHECKOUT": {
        "method": "UNCHECKOUT",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC3253#4.5",
        "spec_href": "https://tools.ietf.org/html/rfc3253#section-4.5"
    },
    "UNLINK": {
        "method": "UNLINK",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC2068#19.6.1.3",
        "spec_href": "https://tools.ietf.org/html/rfc2068#section-19.6.1.3"
    },
    "UNLOCK": {
        "method": "UNLOCK",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC4918#9.11",
        "spec_href": "https://tools.ietf.org/html/rfc4918#section-9.11"
    },
    "UPDATE": {
        "method": "UPDATE",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC3253#7.1",
        "spec_href": "https://tools.ietf.org/html/rfc3253#section-7.1"
    },
    "UPDATEREDIRECTREF": {
        "method": "UPDATEREDIRECTREF",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC4437#7",
        "spec_href": "https://tools.ietf.org/html/rfc4437#section-7"
    },
    "VERSION-CONTROL": {
        "method": "VERSION-CONTROL",
        "description": "",
        "safe": false,
        "idempotent": true,
        "cacheable": "",
        "spec_title": "RFC3253#3.5",
        "spec_href": "https://tools.ietf.org/html/rfc3253#section-3.5"
    }
}
