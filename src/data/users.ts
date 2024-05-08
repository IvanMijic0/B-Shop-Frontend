export interface User {
    id: number;
    name: string;
    email: string;
    password: string; // In a real application, store hashed passwords, not plaintext
    role:string;
}
  
  // Example user data
  export const users: User[] = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      password: 'password123' ,
      role: 'ADMIN'
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
      password: 'password456',
      role:'USER'
    }
  ];
  