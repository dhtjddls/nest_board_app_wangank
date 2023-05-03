import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.entitiy';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}
  // private boards: Board[] = [];
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // getBoardById(id: string): Board {
  //   return this.boards.find((board) => board.id === id);
  // }

  async getBoardById(id: number): Promise<Board> {
    console.log(id);
    const found = await this.boardRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException('Can not find Board');
    }
    return found;
  }
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
  // deleteBoard(id: string): void {
  //   this.boards = this.boards.filter((board) => board.id !== id);
  // }
}
