export {};

import * as undici from "undici-types";
import { TransferListItem } from "worker_threads";

// Types prefixed with _ will be merged forward into the relevant global namespace interfaces.
// If lib.dom (or lib.webworker) are already present in the build environment, these types will be empty,
// so that the interface merge becomes a no-op and the DOM library type is preserved.

// Interfaces that are present in both lib.dom and lib.webworker should be conditional on `onmessage`.
// Interfaces that are present in lib.dom only should be conditional on `onabort`.

// #region undici/fetch
type _EventSource = typeof globalThis extends { onmessage: any } ? {} : undici.EventSource;
type _FormData = typeof globalThis extends { onmessage: any } ? {} : undici.FormData;
type _Headers = typeof globalThis extends { onmessage: any } ? {} : undici.Headers;
type _MessageEvent = typeof globalThis extends { onmessage: any } ? {} : undici.MessageEvent;
type _Request = typeof globalThis extends { onmessage: any } ? {} : undici.Request;
type _RequestInit = typeof globalThis extends { onmessage: any } ? {} : undici.RequestInit;
type _Response = typeof globalThis extends { onmessage: any } ? {} : undici.Response;
type _ResponseInit = typeof globalThis extends { onmessage: any } ? {} : undici.ResponseInit;
type _WebSocket = typeof globalThis extends { onmessage: any } ? {} : undici.WebSocket;
// #endregion undici/fetch

// #region AbortController
type _AbortController = typeof globalThis extends { onmessage: any } ? {} : NodeAbortController;
interface NodeAbortController {
    readonly signal: AbortSignal;
    abort(reason?: any): void;
}
interface NodeAbortControllerConstructor {
    prototype: AbortController;
    new(): AbortController;
}

type _AbortSignal = typeof globalThis extends { onmessage: any } ? {} : NodeAbortSignal;
interface NodeAbortSignal extends EventTarget {
    readonly aborted: boolean;
    onabort: ((this: AbortSignal, event: Event) => any) | null;
    readonly reason: any;
    throwIfAborted(): void;
}
interface NodeAbortSignalConstructor {
    prototype: AbortSignal;
    new(): AbortSignal;
    abort(reason?: any): AbortSignal;
    any(signals: AbortSignal[]): AbortSignal;
    timeout(milliseconds: number): AbortSignal;
}
// #endregion AbortController

// #region DOMException
type _DOMException = typeof globalThis extends { onmessage: any } ? {} : NodeDOMException;
interface NodeDOMException extends Error {
    readonly code: number;
    readonly message: string;
    readonly name: string;
    readonly INDEX_SIZE_ERR: 1;
    readonly DOMSTRING_SIZE_ERR: 2;
    readonly HIERARCHY_REQUEST_ERR: 3;
    readonly WRONG_DOCUMENT_ERR: 4;
    readonly INVALID_CHARACTER_ERR: 5;
    readonly NO_DATA_ALLOWED_ERR: 6;
    readonly NO_MODIFICATION_ALLOWED_ERR: 7;
    readonly NOT_FOUND_ERR: 8;
    readonly NOT_SUPPORTED_ERR: 9;
    readonly INUSE_ATTRIBUTE_ERR: 10;
    readonly INVALID_STATE_ERR: 11;
    readonly SYNTAX_ERR: 12;
    readonly INVALID_MODIFICATION_ERR: 13;
    readonly NAMESPACE_ERR: 14;
    readonly INVALID_ACCESS_ERR: 15;
    readonly VALIDATION_ERR: 16;
    readonly TYPE_MISMATCH_ERR: 17;
    readonly SECURITY_ERR: 18;
    readonly NETWORK_ERR: 19;
    readonly ABORT_ERR: 20;
    readonly URL_MISMATCH_ERR: 21;
    readonly QUOTA_EXCEEDED_ERR: 22;
    readonly TIMEOUT_ERR: 23;
    readonly INVALID_NODE_TYPE_ERR: 24;
    readonly DATA_CLONE_ERR: 25;
}
interface NodeDOMExceptionConstructor {
    prototype: DOMException;
    new(message?: string, options?: string | { name?: string; cause?: unknown }): DOMException;
    readonly INDEX_SIZE_ERR: 1;
    readonly DOMSTRING_SIZE_ERR: 2;
    readonly HIERARCHY_REQUEST_ERR: 3;
    readonly WRONG_DOCUMENT_ERR: 4;
    readonly INVALID_CHARACTER_ERR: 5;
    readonly NO_DATA_ALLOWED_ERR: 6;
    readonly NO_MODIFICATION_ALLOWED_ERR: 7;
    readonly NOT_FOUND_ERR: 8;
    readonly NOT_SUPPORTED_ERR: 9;
    readonly INUSE_ATTRIBUTE_ERR: 10;
    readonly INVALID_STATE_ERR: 11;
    readonly SYNTAX_ERR: 12;
    readonly INVALID_MODIFICATION_ERR: 13;
    readonly NAMESPACE_ERR: 14;
    readonly INVALID_ACCESS_ERR: 15;
    readonly VALIDATION_ERR: 16;
    readonly TYPE_MISMATCH_ERR: 17;
    readonly SECURITY_ERR: 18;
    readonly NETWORK_ERR: 19;
    readonly ABORT_ERR: 20;
    readonly URL_MISMATCH_ERR: 21;
    readonly QUOTA_EXCEEDED_ERR: 22;
    readonly TIMEOUT_ERR: 23;
    readonly INVALID_NODE_TYPE_ERR: 24;
    readonly DATA_CLONE_ERR: 25;
}
// #endregion DOMException

// #region Storage
type _Storage = typeof globalThis extends { onabort: any } ? {} : NodeStorage;
interface NodeStorage {
    readonly length: number;
    clear(): void;
    getItem(key: string): string | null;
    key(index: number): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
    [key: string]: any;
}
interface NodeStorageConstructor {
    prototype: Storage;
    new(): Storage;
}
// #endregion Storage

// #region structuredClone
type _StructuredSerializeOptions = typeof globalThis extends { onmessage: any } ? {} : NodeStructuredSerializeOptions;
interface NodeStructuredSerializeOptions {
    transfer?: TransferListItem[];
}
// #endregion structuredClone

declare global {
    // #region undici/fetch
    interface EventSource extends _EventSource {}
    var EventSource: typeof globalThis extends { onmessage: any; EventSource: infer T } ? T : typeof undici.EventSource;

    interface FormData extends _FormData {}
    var FormData: typeof globalThis extends { onmessage: any; FormData: infer T } ? T : typeof undici.FormData;

    interface Headers extends _Headers {}
    var Headers: typeof globalThis extends { onmessage: any; Headers: infer T } ? T : typeof undici.Headers;

    interface MessageEvent extends _MessageEvent {}
    var MessageEvent: typeof globalThis extends { onmessage: any; MessageEvent: infer T } ? T
        : typeof undici.MessageEvent;

    interface Request extends _Request {}
    var Request: typeof globalThis extends { onmessage: any; Request: infer T } ? T : typeof undici.Request;

    interface RequestInit extends _RequestInit {}

    interface Response extends _Response {}
    var Response: typeof globalThis extends { onmessage: any; Response: infer T } ? T : typeof undici.Response;

    interface ResponseInit extends _ResponseInit {}

    interface WebSocket extends _WebSocket {}
    var WebSocket: typeof globalThis extends { onmessage: any; WebSocket: infer T } ? T : typeof undici.WebSocket;

    function fetch(input: string | URL | Request, init?: RequestInit): Promise<Response>;
    // #endregion undici/fetch

    // #region AbortController
    interface AbortController extends _AbortController {}
    var AbortController: typeof globalThis extends { onmessage: any; AbortController: infer T } ? T
        : NodeAbortControllerConstructor;
    interface AbortSignal extends _AbortSignal {}
    var AbortSignal: typeof globalThis extends { onmessage: any; AbortSignal: infer T } ? T
        : NodeAbortSignalConstructor;
    // #endregion AbortController

    // #region DOMException
    interface DOMException extends _DOMException {}
    var DOMException: typeof globalThis extends { onmessage: any; DOMException: infer T } ? T
        : NodeDOMExceptionConstructor;
    // #endregion DOMException

    // #region Storage
    interface Storage extends _Storage {}
    var Storage: typeof globalThis extends { onabort: any; Storage: infer T } ? T : NodeStorageConstructor;

    var localStorage: Storage;
    var sessionStorage: Storage;
    // #endregion Storage

    // #region structuredClone
    interface StructuredSerializeOptions extends _StructuredSerializeOptions {}

    function structuredClone<T = any>(value: T, options?: StructuredSerializeOptions): T;
    // #endregion structuredClone
}
