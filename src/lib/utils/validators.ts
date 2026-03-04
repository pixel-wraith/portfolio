import { z } from 'zod';

export const emailSchema = z.string()
    .min(1, { message: 'Email is required' })
    .max(255, { message: 'Email cannot be greater than 255 characters' })
    .email({ message: 'Invalid email address' });

export const contactNameSchema = z.string()
    .min(1, { message: 'Name is required' })
    .max(255, { message: 'Name cannot be greater than 255 characters' });

export const contactMessageSchema = z.string()
    .min(1, { message: 'Message is required' })
    .max(2000, { message: 'Message cannot be greater than 2000 characters' });