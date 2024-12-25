export const BoardApiEndpoints = {
  Board: '/board',
  BoardById: (boardId: string) => `${BoardApiEndpoints.Board}/${boardId}`
}
