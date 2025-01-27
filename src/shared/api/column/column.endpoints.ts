export const ColumnApiEndpoints = {
  Column: '/column',
  ColumnById: (columnId: string) => `${ColumnApiEndpoints.Column}/${columnId}`,
  ColumnBoardById: (boardId: string) =>
    `${ColumnApiEndpoints.Column}/${boardId}`,
  ColumnOrder: (boardId: string) =>
    `${ColumnApiEndpoints.ColumnBoardById(boardId)}/order`
}
