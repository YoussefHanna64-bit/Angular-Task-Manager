import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authlayout',
  imports: [RouterOutlet , RouterLink],
  templateUrl: './authLayout.html',
  styleUrl: './authLayout.css',
})
export class AuthLayout {}
