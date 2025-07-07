import type { QueryKey } from '@tanstack/react-query'

interface MyMeta<T = any> extends Record<string, unknown> {
  invalidates?: Array<QueryKey>
  callBack?: (data: any) => void
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: MyMeta
    mutationMeta: MyMeta
  }
}
