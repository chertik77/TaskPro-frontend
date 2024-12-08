export const ApiEndpoints = {
  Signup: '/auth/signup',
  Signin: '/auth/signin',
  Tokens: '/auth/tokens',
  Logout: '/auth/logout',
  Google: '/auth/google',

  User: '/user',
  UserMe: '/user/me',
  UserTheme: '/user/theme',
  UserHelp: '/user/help',

  Board: '/board',
  BoardById: (boardId: string) => `${ApiEndpoints.Board}/${boardId}`,

  Column: '/column',
  ColumnById: (columnId: string) => `${ApiEndpoints.Column}/${columnId}`,
  ColumnBoardById: (boardId: string) => `${ApiEndpoints.Column}/${boardId}`,
  ColumnOrder: (boardId: string) =>
    `${ApiEndpoints.ColumnBoardById(boardId)}/order`,

  Card: '/card',
  CardById: (cardId: string) => `${ApiEndpoints.Card}/${cardId}`,
  CardColumnById: (columnId: string) => `${ApiEndpoints.Card}/${columnId}`,
  CardOrder: (columnId: string) =>
    `${ApiEndpoints.CardColumnById(columnId)}/order`
}
