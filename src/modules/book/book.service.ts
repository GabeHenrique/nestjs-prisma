import { Injectable } from "@nestjs/common";
import { BookDTO } from "./book.dto";
import { PrismaService } from "../../database/prismaService";

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {
  }

  async create(data: BookDTO) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      }
    });
    if (bookExists) {
      return new Error("Book already exists").message;
    }
    const book = await this.prisma.book.create({
      data,
    });
    return book;
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      }
    });
    if (!book) {
      throw new Error("Book not found").message;
    }
    return book;
  }

  async update(id: string, data: BookDTO) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      }
    });
    if (!bookExists) {
      throw new Error("Book not found").message;
    }
    return await this.prisma.book.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      }
    });
    if (!bookExists) {
      throw new Error("Book not found").message;
    }
    return await this.prisma.book.delete({
      where: { id },
    });
  }
}
