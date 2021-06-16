export interface S3UploadAPIData {
	error?: string;
	success?: string;
  locationURls: { locationUrl: string; key: string; }[];
}