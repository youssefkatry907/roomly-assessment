import { Injectable } from '@nestjs/common';
import { Room, RoomProps } from '../domain/entities/room.entity';
import { RoomRepository } from '../domain/repositories/room.repository.port';

/**
 * GIVEN - the reference adapter. Read it: the booking repository you write is
 * expected to follow the same shape.
 *
 * Note that it hands back aggregates, never its own storage records, and that
 * it knows nothing about tenants, rules or HTTP.
 */
@Injectable()
export class InMemoryRoomRepository implements RoomRepository {
  private readonly rooms = new Map<string, RoomProps>();

  public seed(rooms: readonly RoomProps[]): void {
    for (const room of rooms) {
      this.rooms.set(room.id, { ...room });
    }
  }

  public async findById(id: string): Promise<Room | null> {
    const record = this.rooms.get(id);
    return record ? Room.reconstitute({ ...record }) : null;
  }
}
