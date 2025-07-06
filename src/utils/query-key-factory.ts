export const initialKeys = (key: string) => {
  return {
    all: [key] as const,
    lists: () => [...initialKeys(key).all, 'list'] as const,
    list: (filters: string) =>
      [...initialKeys(key).lists(), { filters }] as const,
    details: () => [...initialKeys(key).all, 'detail'] as const,
    detail: (id: number) => [...initialKeys(key).details(), id] as const,
  }
}
