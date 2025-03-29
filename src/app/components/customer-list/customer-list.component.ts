import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  standalone: false,
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = [
    'nome',
    'idade',
    'sistemaConector',
    'ativo',
    'tipoCliente',
    'dataCadastro',
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.customers$.subscribe((customers) => {
      this.dataSource.data = customers.map((c) => ({
        ...c,
        ativo: c.ativo ? 'Sim' : 'Não',
        dataCadastro: c.dataCadastro
          ? new Date(c.dataCadastro).toLocaleString()
          : '',
      }));
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
