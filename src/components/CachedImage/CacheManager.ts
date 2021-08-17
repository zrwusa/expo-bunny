import * as FileSystem from 'expo-file-system';
import {DownloadOptions, DownloadProgressData, DownloadResumable} from 'expo-file-system';
import SHA1 from 'crypto-js/sha1';
import {DownloadProgressCallback} from 'expo-file-system/src/FileSystem.types';
import {uuidV4} from '../../utils';

const BASE_DIR = `${FileSystem.cacheDirectory}expo-image-cache/`;

async function ensureCacheDirExists() {
    const dirInfo = await FileSystem.getInfoAsync(BASE_DIR);
    if (!dirInfo.exists) {
        console.log(`${BASE_DIR} directory doesn't exist, creating...`);
        await FileSystem.makeDirectoryAsync(BASE_DIR, {intermediates: true});
    }
}

export class CacheLabor {
    url: string;
    isDone: boolean;
    downloadOptions: DownloadOptions;
    downloader: DownloadResumable | null;
    uri: string;
    downloadProgressCallback: { [key in string]: DownloadProgressCallback };
    isFileExist: boolean;
    uriCallbacks: { [key in string]: (uri: string) => void }
    downloadProgressData: DownloadProgressData | undefined

    constructor(url: string, downloadOptions: DownloadOptions) {
        this.url = url;
        this.downloadOptions = downloadOptions;
        this.isDone = false;
        this.uri = '';
        this.downloader = null;
        this.downloadProgressCallback = {};
        this.isFileExist = false;
        this.uriCallbacks = {};
        this.downloadProgressData = undefined;

        this.init().then();
    }


    register(callback: (uri: string) => void, downloadProgressCallback?: DownloadProgressCallback) {
        if (this.isDone) {
            callback(this.uri)
            if (this.downloadProgressData) {
                downloadProgressCallback?.(this.downloadProgressData)
            }

        } else {
            this.uriCallbacks[uuidV4()] = callback;
            if (downloadProgressCallback) {
                this.downloadProgressCallback[uuidV4()] = downloadProgressCallback;
            }
        }
    }

    async init() {
        const {url} = this;
        const filename = url.substring(url.lastIndexOf('/'), url.indexOf('?') === -1 ? url.length : url.indexOf('?'));
        const ext = filename.indexOf('.') === -1 ? '.jpg' : filename.substring(filename.lastIndexOf('.'));
        this.uri = `${BASE_DIR}${SHA1(url)}${ext}`;
        await ensureCacheDirExists()
        const {exists} = await this.getFileInfo();
        if (exists) {
            this.isFileExist = true;
        }

        if (this.isDone) {
            return
        }


        this.downloader = FileSystem.createDownloadResumable(url, this.uri, this.downloadOptions, (downloadProgress) => {
            for (const i in this.downloadProgressCallback) {
                this.downloadProgressCallback[i](downloadProgress)
            }
            this.downloadProgressCallback = {}
            this.downloadProgressData = downloadProgress
            this.isDone = downloadProgress.totalBytesExpectedToWrite === downloadProgress.totalBytesWritten
            if (this.isDone) {
                this.isFileExist = true;
                for (const i in this.uriCallbacks) {
                    this.uriCallbacks[i](this.uri)
                }
                this.uriCallbacks = {}
            }
        })

        const downloadResult = await this.downloader.downloadAsync();

        if (downloadResult && downloadResult.status !== 200) {
            switch (downloadResult.status) {
                case 200:

                    break;
                default:

                    break;
            }
        }
    }

    async getFileInfo() {
        return await FileSystem.getInfoAsync(this.uri);
    }
}

export class CacheManager {
    private cacheLabors: { [url: string]: CacheLabor } = {};
    private readonly downloadOptions: DownloadOptions = {}

    constructor(downloadOptions: DownloadOptions) {
        this.downloadOptions = downloadOptions
    }

    getCacheLabor(url: string, downloadOptions?: DownloadOptions): CacheLabor {
        if (!this.cacheLabors[url]) {
            this.cacheLabors[url] = new CacheLabor(url, downloadOptions || this.downloadOptions);
        }
        return this.cacheLabors[url];
    }

    async clearCache(): Promise<void> {
        await FileSystem.deleteAsync(BASE_DIR, {idempotent: true});
        await FileSystem.makeDirectoryAsync(BASE_DIR);
        this.cacheLabors = {}
    }

    async getTotalSize(): Promise<number> {
        const dirInfo = await FileSystem.getInfoAsync(BASE_DIR);
        if (!dirInfo.exists) {
            throw new Error(`${BASE_DIR} not found`);
        }
        return dirInfo.size;
    }
}

export default new CacheManager({})


