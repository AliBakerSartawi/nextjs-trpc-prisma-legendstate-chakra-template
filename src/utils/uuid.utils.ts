import { v4 } from 'uuid';

export type UUID = string;

export const newUUID = (): UUID => v4();
