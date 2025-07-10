// src/app/email.service.ts
import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({ providedIn: 'root' })
export class EmailService {
  sendForm(serviceId: string, templateId: string, form: HTMLFormElement, userId: string) {
    return emailjs.sendForm(serviceId, templateId, form, userId);
  }
}