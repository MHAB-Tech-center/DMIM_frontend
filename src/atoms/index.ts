/*
--- EXAMPLE ---
 export const showDeleteModal = atom<boolean>({
    key: 'showDeleteModal',
    default: false,
 }); 
 */

import { atom } from "recoil";

export const loginEmailState = atom<string>({
  key: "loginEmailState",
  default: "",
});

export const loginPasswordState = atom<string>({
  key: "loginPasswordState",
  default: "",
});

export const paginationOptionsState = atom({
  key: "paginationOptionsState",
  default: 1,
});

export interface Role {
  rtbRoleName: string;
  roleDescription: string;
  id: string;
  systemFeatures: string;
}

export const rolesState = atom<Role[]>({
  key: "rolesState",
  default: [],
});

export {};
