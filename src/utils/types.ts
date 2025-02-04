
export type DropdownType = {
  name: string;
}

export type Error = {
  success: boolean;
  message: string;
}

export type APIResponse<T = unknown> = {
  success: boolean;
  data: T;
}

export type QRData = {
  venue: string;
  course: string;
  qrCode: string | null;
  url: string | "#";
}

export enum FetchType {
  text,
  date,
}

