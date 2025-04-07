export interface Reply {
  id: string
  content: string
  createdAt: string
  likeCount: number
  dislikeCount: number
}

export interface Message {
  id: string
  content: string
  createdAt: string
  likeCount: number
  dislikeCount: number
  replies: Reply[]
}

