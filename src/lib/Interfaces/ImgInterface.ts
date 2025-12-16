export interface IImage {
  _id?: string;
  url: string;
  public_id: string;
  type: "image" | "video" | "audio";
  created_by?: string;
  isReel?: boolean;
}

export interface IMediaItem {
  _id: string;
  url: string;
  public_id: string;
  type: "image" | "video" | "audio";
  created_by: string;
}
