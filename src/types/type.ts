
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'client' | 'barber';
}

export type Profile = {
  userId: string;
  phone?: string;
  cep?: string;
  address?: string;
  number?: string;
  complement?: string;
  bio?: string;
  avatar?: string;
}

export type Barber = {
  id: string;
  name: string;
  avatar?: string;
  status?: string;
  description?: string;
  establishmentName?: string;
};



