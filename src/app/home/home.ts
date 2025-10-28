import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  formReserva!: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formReserva = this.fb.group({
      dataIda: [localStorage.getItem('dataIda') || '', Validators.required],
      dataVolta: [localStorage.getItem('dataVolta') || '', Validators.required],
      destino: [localStorage.getItem('destino') || '', Validators.required],
      numeroPassageiros: [
        localStorage.getItem('numeroPassageiros') || '',
        [Validators.required, Validators.min(1), Validators.max(5)]
      ],
      email: [
        localStorage.getItem('email') || '',
        [Validators.required, Validators.email]
      ]
    });

    this.formReserva.valueChanges.subscribe(values => {
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          localStorage.setItem(key, values[key]);
        }
      }
    });
  }

  isDataInvalida(): boolean {
    const ida = this.formReserva.get('dataIda')?.value;
    const volta = this.formReserva.get('dataVolta')?.value;
    if (!ida || !volta) return false;
    return new Date(volta) < new Date(ida);
  }

  isFormValid(): boolean {
    return this.formReserva.valid && !this.isDataInvalida();
  }

  logInformation(): void {
    console.log('Formulário:', this.formReserva.value);
  }
}