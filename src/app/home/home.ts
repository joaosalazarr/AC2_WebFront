import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  email: string = '';
  destino: string = '';
  numeroPassageiros: number = 0;
  dataIda: string = '';
  dataVolta: string = '';
  
  ngOnInit(): void {
    const savedEmail = localStorage.getItem('email');
    const savedDestino = localStorage.getItem('destino');
    const savedNumeroPassageiros = localStorage.getItem('numeroPassageiros');
    const savedDataIda = localStorage.getItem('dataIda');
    const savedDataVolta = localStorage.getItem('dataVolta');

    if (savedDestino) this.destino = savedDestino;
    if (savedEmail) this.email = savedEmail;
    if (savedNumeroPassageiros) this.numeroPassageiros = Number(savedNumeroPassageiros);
    if (savedDataIda) this.dataIda = savedDataIda;
    if (savedDataVolta) this.dataVolta = savedDataVolta;
  }

  updateLocalStorage(key: string, value: number): void {
    localStorage.setItem(key, value.toString());
  }

  isDataValid(): boolean {
    if(!this.dataIda || !this.dataVolta) return false;
    const dataIda = new Date(this.dataIda);
    const dataVolta = new Date(this.dataVolta);
    return dataVolta > dataIda;
  }

  isFormValid(): boolean {
    return this.email !== '' && this.destino !== '' && this.numeroPassageiros > 0 && this.numeroPassageiros <= 5
    && this.dataIda !== '';
  }

  logInformation(): void {
    console.log('Email:', this.email);
    console.log('Destino:', this.destino);
    console.log('Número de Passageiros:', this.numeroPassageiros);
    console.log('Data de Ida:', this.dataIda);
    console.log('Data de Volta:', this.dataVolta);
  }
}
