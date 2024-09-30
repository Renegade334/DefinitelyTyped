/**
 * The utility consumer functions provide common options for consuming
 * streams.
 *
 * They are accessed using:
 * ```js
 * import {
 *   arrayBuffer,
 *   blob,
 *   buffer,
 *   json,
 *   text,
 * } from 'node:stream/consumers';
 * ```
 * @see [source](https://github.com/nodejs/node/blob/v22.x/lib/stream/consumers.js)
 * @since v16.7.0
 */
declare module "stream/consumers" {
    import { Blob as NodeBlob } from "node:buffer";
    import { ReadableStream as WebReadableStream } from "node:stream/web";
    function buffer(stream: WebReadableStream | NodeJS.ReadableStream | AsyncIterable<any>): Promise<Buffer>;
    function text(stream: WebReadableStream | NodeJS.ReadableStream | AsyncIterable<any>): Promise<string>;
    function arrayBuffer(stream: WebReadableStream | NodeJS.ReadableStream | AsyncIterable<any>): Promise<ArrayBuffer>;
    function blob(stream: WebReadableStream | NodeJS.ReadableStream | AsyncIterable<any>): Promise<NodeBlob>;
    function json(stream: WebReadableStream | NodeJS.ReadableStream | AsyncIterable<any>): Promise<unknown>;
}
declare module "node:stream/consumers" {
    export * from "stream/consumers";
}
