import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entitiy';
import { CreateBoardDto } from './dto/create-board.dto';

// 1. 레포지토리 역할을 하는 서비스를 만들어서 의존성 주입.
// 2. 커스텀 레포지토리를 만들어서 사용한다.

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }
}
