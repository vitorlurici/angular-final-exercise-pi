import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
  standalone: false,
})
export class CustomerFormComponent {
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private customerService: CustomerService
  ) {
    this.customerForm = this.fb.group({
      nome: ['', Validators.required],
      idade: ['', [Validators.required, Validators.min(0)]],
      sistemaConector: ['', Validators.required],
      ativo: [false],
      tipoCliente: ['regular', Validators.required],
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const formData = this.customerForm.value;
      if (!formData.title) {
        formData.title = formData.nome;
      }
      if (!formData.autor) {
        formData.autor = `Idade: ${formData.idade}`;
      }

      this.customerService.addCustomer(formData);

      console.log('Cliente salvo:', formData);
      this.snackBar.open('Cliente salvo com sucesso!', 'Fechar', {
        duration: 3000,
      });
      this.router.navigate(['/customers']);
    }
  }

  onCancel() {
    this.router.navigate(['/customers']);
  }
}
