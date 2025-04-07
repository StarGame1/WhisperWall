"use server"

import { prisma } from "./db"
import { revalidatePath } from "next/cache"
import type { Message } from "./types"

export async function getMessages(): Promise<Message[]> {
  try {
    const messages = await prisma.message.findMany({
      include: {
        replies: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return messages.map((message) => ({
      id: message.id,
      content: message.content,
      createdAt: message.createdAt.toISOString(),
      likeCount: message.likeCount,
      dislikeCount: message.dislikeCount,
      replies: message.replies.map((reply) => ({
        id: reply.id,
        content: reply.content,
        createdAt: reply.createdAt.toISOString(),
        likeCount: reply.likeCount,
        dislikeCount: reply.dislikeCount,
      })),
    }))
  } catch (error) {
    console.error("Failed to get messages:", error)
    return []
  }
}

export async function postMessage(content: string): Promise<void> {
  try {
    await prisma.message.create({
      data: {
        content,
      },
    })

    revalidatePath("/")
  } catch (error) {
    console.error("Failed to post message:", error)
    throw new Error("Failed to post message")
  }
}

export async function postReply(messageId: string, content: string): Promise<void> {
  try {
    await prisma.reply.create({
      data: {
        content,
        messageId,
      },
    })

    revalidatePath("/")
  } catch (error) {
    console.error("Failed to post reply:", error)
    throw new Error("Failed to post reply")
  }
}

export async function likeMessage(messageId: string): Promise<void> {
  try {
    await prisma.message.update({
      where: { id: messageId },
      data: {
        likeCount: {
          increment: 1,
        },
      },
    })

    revalidatePath("/")
  } catch (error) {
    console.error("Failed to like message:", error)
    throw new Error("Failed to like message")
  }
}

export async function dislikeMessage(messageId: string): Promise<void> {
  try {
    await prisma.message.update({
      where: { id: messageId },
      data: {
        dislikeCount: {
          increment: 1,
        },
      },
    })

    revalidatePath("/")
  } catch (error) {
    console.error("Failed to dislike message:", error)
    throw new Error("Failed to dislike message")
  }
}

export async function likeReply(messageId: string, replyId: string): Promise<void> {
  try {
    await prisma.reply.update({
      where: { id: replyId },
      data: {
        likeCount: {
          increment: 1,
        },
      },
    })

    revalidatePath("/")
  } catch (error) {
    console.error("Failed to like reply:", error)
    throw new Error("Failed to like reply")
  }
}

export async function dislikeReply(messageId: string, replyId: string): Promise<void> {
  try {
    await prisma.reply.update({
      where: { id: replyId },
      data: {
        dislikeCount: {
          increment: 1,
        },
      },
    })

    revalidatePath("/")
  } catch (error) {
    console.error("Failed to dislike reply:", error)
    throw new Error("Failed to dislike reply")
  }
}

