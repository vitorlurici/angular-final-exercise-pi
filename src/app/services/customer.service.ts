import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Customer {
  id?: number;
  nome: string;
  idade: number;
  sistemaConector: string;
  ativo: boolean;
  tipoCliente: string;
  dataCadastro?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customers: Customer[] = [];
  private customersSubject = new BehaviorSubject<Customer[]>(this.customers);
  customers$ = this.customersSubject.asObservable();
  private lastId = 0;

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.addCustomer({
      nome: 'Cliente Exemplo',
      idade: 30,
      sistemaConector: 'Sistema A',
      ativo: true,
      tipoCliente: 'regular',
    });
  }

  addCustomer(customer: Customer) {
    customer.id = ++this.lastId;
    customer.dataCadastro = new Date();
    this.customers.push(customer);
    this.customersSubject.next([...this.customers]);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('angular-customers', JSON.stringify(this.customers));
  }

  private loadFromLocalStorage() {
    const saved = localStorage.getItem('angular-customers');
    if (saved) {
      this.customers = JSON.parse(saved);
      this.lastId = Math.max(...this.customers.map((c) => c.id || 0), 0);
      this.customersSubject.next([...this.customers]);
    }
  }
}
