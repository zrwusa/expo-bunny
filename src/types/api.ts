import {BunnyAPIError} from "../utils";

export type BunnyAPIResponseProtocol<T> = {
    data: T | object,
    created_at?: string,
    time_spend?: number,
    http_extra: {
        code?: number,
        message?: string,
        des?: string,
        error_code?: number,
        error_message?: string,
        error_des?: string,
        error_stack?: string,
    }
    business_logic: {
        code?: string,
        message?: string,
        des?: string,
        error_code?: string,
        error_message?: string,
        error_des?: string,
        error_stack?: string,
    }
}

export type BunnyAPIConfig<T> = {
    isHttps: boolean,
    timeout: number,
    responseProtocolStructure: BunnyAPIResponseProtocol<T>,
    errorClass: BunnyAPIError,
    interceptors: {
        request: {
            accessToken?(): Promise<string>,
        },
        response: {
            // 1xx: Informational	Temporary response for the handshake phase of the protocol
            // 2xx: Success	        The client's request was successfully received
            // 3xx: Redirection	    The client must have some additional actions to complete request
            // 4xx: Client Error	Such errors should be the responsibility of the client
            // 5xx: Server Error	Such errors should be the responsibility of the server
            Created: 201 | number,             // e.g
            Accepted: 202 | number,            // just notify client in processing,but not completed
            NoContent: 204 | number,           // e.g. POST,PUT,DELETE success,but no need to response a entity
            SeeOther: 303 | number,            // e.g.  similar to 202, call limit is not exceeded, the server may put your request into the queue and process it slowly.
                                               // At this time, you will receive the 303, and the Location header tells the caller that it should pass that URL is used for next step.
            Forbidden: 403 | number,           // e.g. server refuses to authorize it
            BadRequest: 400 | number,          // client error,but the server needs additional info to notify the client in the protocol structure
            Unauthorized: 401 | number,        // e.g. lacks valid authentication credentials
            NotFound: 404 | number,
            UnprocessableEntity: 422 | number, // e.g. business logic error
            RequestTimeout: 408 | number,      // server is waiting request,but timeout
            Conflict: 409 | number,            // e.g. sign up user info already exists
            Locked: 423 | number,              // e.g. someone is modifying the entity witch your are accessing
            TooManyRequests: 429 | number,     // too many requests,the server can not process now
            NotImplemented: 501 | number,      // need to be implemented
            isMergeHttpStatusDes: boolean,
        }
    },
    isDevServerProxy: boolean,
    devProxyPrefix: string,
}

export interface BunnyAPIStandardRequestParams {
    pageNum?: number,
    pageCount?: number,
    filter?: {
        id?: number
    }
}
