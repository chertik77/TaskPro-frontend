export const CardApiEndpoints = {
  Card: '/card',
  CardById: (cardId: string) => `${CardApiEndpoints.Card}/${cardId}`,
  CardColumnById: (columnId: string) => `${CardApiEndpoints.Card}/${columnId}`,
  CardOrder: (columnId: string) =>
    `${CardApiEndpoints.CardColumnById(columnId)}/order`
}
