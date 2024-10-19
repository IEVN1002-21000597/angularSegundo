import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Usuarios {
  nombre: string;
  apaterno: string;
  amaterno: string;
  dia: number;
  mes: number;
  ano: number;
  sexo: string;
}

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './zodiaco.component.html',
  styles: []
})

export default class ZodiacoComponent implements OnInit {
  formGroup!: FormGroup;
  materia = "pwa";
  tem = '';
  edad: number = 0;
  signoChino: string = '';
  imagenSigno: string = '';
  
  usuario: Usuarios = {
    nombre: '',
    apaterno: '',
    amaterno: '',
    dia: 0,
    mes: 0,
    ano: 0,
    sexo: ''
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      dia: [''],
      mes: [''],
      ano: [''],
      sexo: [''],
    });
  }

  onSubmit(): void {
    const { nombre, apaterno, amaterno, dia, mes, ano, sexo } = this.formGroup.value;

    this.usuario.nombre = nombre;
    this.usuario.apaterno = apaterno;
    this.usuario.amaterno = amaterno;
    this.usuario.dia = dia;
    this.usuario.mes = mes;
    this.usuario.ano = ano;
    this.usuario.sexo = sexo;

    let usuarioJSON = JSON.stringify(this.usuario);
    console.log(this.formGroup.value);

    localStorage.setItem('materia', this.materia);
    localStorage.setItem('usuario', usuarioJSON);

    this.calcularEdadYSigno();
  }

  subImprimir(): void {
    this.tem = localStorage.getItem('materia')!;

    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario: Usuarios = JSON.parse(usuarioGuardado);
      console.log(usuario); 
    }
  }

  calcularEdadYSigno(): void {
    const dia = this.formGroup.value.dia;
    const mes = this.formGroup.value.mes;
    const ano = this.formGroup.value.ano;

    const fechaNacimiento = new Date(ano, mes - 1, dia);
    const hoy = new Date();
    this.edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    
    if (mes > hoy.getMonth() + 1 || (mes === hoy.getMonth() + 1 && dia > hoy.getDate())) {
      this.edad--;
    }

    this.signoChino = this.obtenerSignoChino(ano);
    this.imagenSigno = this.obtenerImagen(ano);
  }

  obtenerSignoChino(ano: number): string {
  const signos = [
    'Mono',   // 0
    'Gallo',  // 1
    'Perro',  // 2
    'Jabalí', // 3
    'Rata',   // 4
    'Buey',   // 5
    'Tigre',  // 6
    'Conejo', // 7
    'Dragon', // 8
    'Serpiente', // 9
    'Caballo', // 10
    'Cabra'   // 11
  ];
  return signos[ano % 12];
}

  obtenerImagen(ano: number): string {
    const imagenes = [
      'https://www.clarin.com/img/westernastrology/mono.svg', // Mono
      'https://www.clarin.com/img/westernastrology/gallo.svg', // Gallo
      'https://www.clarin.com/img/westernastrology/perro.svg', // Perro
      'https://www.clarin.com/img/westernastrology/chancho.svg', // Jabalí
      'https://www.clarin.com/img/westernastrology/rata.svg',   // Rata
      'https://www.clarin.com/img/westernastrology/bufalo.svg',   // Buey
      'https://www.clarin.com/img/westernastrology/tigre.svg',  // Tigre
      'https://www.clarin.com/img/westernastrology/conejo.svg', // Conejo
      'https://www.clarin.com/img/westernastrology/dragon.svg', // Dragón
      'https://www.clarin.com/img/westernastrology/serpiente.svg', // Serpiente
      'https://www.clarin.com/img/westernastrology/caballo.svg', // Caballo
      'https://www.clarin.com/img/westernastrology/cabra.svg'  // Cabra
  ];
  return imagenes[ano % 12];
  }
}
