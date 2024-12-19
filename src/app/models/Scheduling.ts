export interface Scheduling {
  id?: number;
  description?: string;
  instance_id?: string;
  group_id?: string;
  group_name?: string;
  midia?: string;
  text?: string;
  video_path?: string;
  image_path?: string;
  audio_path?: string;
  datetime?: Date;
  status?: SchedulingStatus;
  user_id?: number;
}

export enum SchedulingStatus {
  Waiting = 'Waiting',
  Sent = 'Sent',
  Model = 'Model',
  Inactive = 'Inactive',
  Copy = 'Copy',
}