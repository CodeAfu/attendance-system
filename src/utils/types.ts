
export type DropdownType = {
  name: string;
}

export type Error = {
  success: boolean;
  message: string;
}

export type Response<T = unknown> = {
  success: boolean;
  data: T;
}