export interface User {
  id? : number;
  name : string;
  email : string;
  phone : string;
  cpf : string;
  cpf_cnpj: string;
  birth_date: Date;
  company_position_id: string;
  sector_id: string;
  whatsapp: number;
  status : UserStatus;
  createdAt : string;
  updatedAt : string;
  admin?: boolean;
  photo?: string;
  role: UserRole;
}


export enum UserRole {
  Admin = 'Admin',  
  Manager = 'Manager',
  User = 'User',
}

export interface UserCards {
  total: number;
  active: number;
  inactive: number;
}

export enum UserStatus {
	ATIVO = 'ACTIVE',
	INATIVO = 'INACTIVE',
	BLOQUEADO = 'BLOCKED',
}


export enum Positions { //Gerente/Gestor/Adm/Tiago
  Admin = 'Admin',
  Financial = 'Financial',
  Supplies = 'Supplies',
  Requester = 'Requester'
}
