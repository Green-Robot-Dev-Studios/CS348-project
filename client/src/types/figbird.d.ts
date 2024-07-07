declare module "figbird" {
  import { Service, ServiceMethods } from "@feathersjs/feathers";
  import { ClientApplication as Application, createClient } from "waterfood";
  import type { ServiceTypes } from "waterfood";
  import { FC, ReactNode } from "react";

  export interface ProviderProps {
    feathers: Application;
    idField?: string | ((item: any) => string);
    children: ReactNode;
  }

  export const Provider: FC<ProviderProps>;

  export interface FigbirdContextValue {
    actions: any;
    atom: any;
    config: any;
    feathers: Application;
    useSelector: any;
  }

  export type Realtime = "merge" | "refetch" | "disabled";
  export type FetchPolicy = "swr" | "cache-first" | "network-only";
  export type Status = "loading" | "success" | "error";
  export type MutationStatus = Status | "idle";

  interface BaseParams {
    skip?: boolean;
    realtime?: boolean;
    fetchPolicy?: FetchPolicy;
  }

  interface FetchResult<T = any> {
    data: null | T;
    status: Status;
    isFetching?: null | boolean;
    error?: null | any;
    refetch: () => any;
  }

  export const useFigbird: () => FigbirdContextValue;
  export const useFeathers: () => Application;
  export const useIdField: (field?: string) => any;
  export const useUpdatedAtField: (updatedAtField?: string) => any;

  export const useQuery: (serviceName: keyof ServiceTypes, options: any, queryHookOptions: any) => any;

  export type UseGetParams = BaseParams;
  export type UseGetResult<T = any> = FetchResult<T>;

  export const useGet: <T = any>(serviceName: keyof ServiceTypes, id: any, options?: any) => UseGetResult<T>;

  export interface UseFindParams extends BaseParams {
    allPages?: boolean;
    additionalFilters?: string[];
    additionalOperators?: string[];
    query?: any;
    matcher?: (query: any) => (item: any) => boolean;
  }

  export interface UseFindResult<T = any> extends FetchResult<T[]> {
    total: number;
    limit: number;
    skip: number;
  }

  export const useFind: <T extends keyof ServiceTypes>(
    serviceName: T,
    params?: UseFindParams,
  ) => FetchResult<Awaited<ReturnType<ServiceTypes[T]["get"]>>[]>;

  export interface UseMutationResult<T = any>
    extends Pick<ServiceMethods<T>, "create" | "update" | "patch" | "remove"> {
    status: MutationStatus;
    data: null | T | T[];
    error: null | any;
  }

  export const useMutation: <T = any>(serviceName: keyof ServiceTypes) => UseMutationResult<T>;
}

export type CardData = {
  id: number;
  displayName: string;
  photoLink: string;
  formattedAddress: string;
  editorialSummary: string;
  websiteURL: string;
};