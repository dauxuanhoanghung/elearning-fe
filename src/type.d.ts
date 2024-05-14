interface IResponse {
  data?: any;
  status: number;
  message?: string;
}

interface ICurrentUser {
  id: number;
  username: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  slug: string;
  roles: string[];
  [...props: string]: any;
}
