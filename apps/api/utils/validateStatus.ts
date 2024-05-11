import { Status } from '../models/schema';

export function validateStatus(status: any): boolean {
  // Verifica si el status está incluido en los miembros de la enumeración
  return Object.values(Status).includes(status);
}