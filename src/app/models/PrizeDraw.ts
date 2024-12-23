import { Instance } from "./Instance";

export interface PrizeDraw {
  id?: number;
  instance_id: string;
  instance_name: string;
  groups: string;
  groups_name: string;
  prize_name: string;
  created_at: Date;
  drawns: PrizeDrawDrawn[];
  instance: Instance;
}

export interface PrizeDrawDrawn {
  id?: number;
  prize_draw_id: number;
  name?: string;
  number: string;
  created_at: Date;
}