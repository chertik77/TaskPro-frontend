export const CardApiEndpoints = {
  Card: '/card',
  CardById: (cardId: string) => `${CardApiEndpoints.Card}/${cardId}`,
  CardColumnById: (columnId: string) => `${CardApiEndpoints.Card}/${columnId}`,
  CardNewColumn: (cardId: string, newColumnId: string) =>
    `${CardApiEndpoints.Card}/${cardId}/${newColumnId}`,
  CardOrder: (columnId: string) =>
    `${CardApiEndpoints.CardColumnById(columnId)}/order`
}
