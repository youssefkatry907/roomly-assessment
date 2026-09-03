/**
 * FROZEN CONTRACT - do not modify.
 *
 * `findById` takes no tenant. That is deliberate, not an oversight: think
 * about where R-TENANT is enforced, and what it must produce.
 */
import { Room } from '../entities/room.entity';

export interface RoomRepository {
  findById(id: string): Promise<Room | null>;
}
