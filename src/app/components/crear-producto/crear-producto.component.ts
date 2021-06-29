import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  agregarProducto() {
    if (this.productoForm.valid) {
      const producto: Producto = {
        producto: this.productoForm.get('producto')?.value,
        categoria: this.productoForm.get('categoria')?.value,
        ubicacion: this.productoForm.get('ubicacion')?.value,
        precio: this.productoForm.get('precio')?.value,
      };
      console.log(producto);
      console.log(this.productoForm.valid);
      this.toastr.success(
        'El producto fue registrado con exito!',
        'Producto Registrado!'
      );
      this.router.navigate(['']);
    } else {
      Object.keys(this.productoForm.controls).forEach(field => { // {1}
        const control = this.productoForm.get(field) as any;            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
  }
}
