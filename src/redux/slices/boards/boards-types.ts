export type Boards = {
  _id: string
  title: string
  icon: string
  owner: string
}

export type BoardsInitialState = {
  boards: Boards[]
}
