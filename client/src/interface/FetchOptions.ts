export interface FetchOptions {
	method: string;
	headers?: {
		Accept?: string;
		"Content-Type"?: string;
	};
	body?: string | FormData;
	credentials: RequestCredentials;
}
