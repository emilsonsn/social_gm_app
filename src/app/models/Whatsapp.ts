export interface Message {
  id: number;
  message: string;
  phone: string;
  fromMe: boolean;
  updated_at: Date;
}

export interface LastMessage {
  id: number;
  remoteJid: string;
  externalId: string;
  instanceId: string;
  fromMe: number;
  message: string;
  messageReplied: string | null;
  whatsapp_chat_id: number;
  created_at: string; // ISO date string.
  updated_at: string; // ISO date string.
  deleted_at: string | null; // ISO date string ou null.
}

export interface Contact {
  id: number;
  name: string;
  remoteJid: string;
  instance: string;
  instanceId: string;
  profilePicUrl: string | null;
  status: ContactStatus; // Enum utilizado para status.
  apiKey: string;
  user_id: number | null;
  label_id: number | null;
  created_at: string; // ISO date string.
  updated_at: string; // ISO date string.
  deleted_at: string | null; // ISO date string ou null.
  unread_count: number;
  last_message: LastMessage | null; // Representa a última mensagem.
}

export enum ContactStatus {
  Waiting = "Waiting",
  Responding = "Responding",
  Finished = "Finished"
}

export interface SendMessagePayloadDto {
  number: string;
  message: string;
  sign?: boolean;
}

export interface SendMessagePayload extends SendMessagePayloadDto {
  instance: string;
}
