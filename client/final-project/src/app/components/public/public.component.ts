import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FacebookService, InitParams} from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';



@Component({
  selector: 'app-public',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css'
})
export class PublicComponent implements OnInit{
  mensaje: string = "";

  constructor(private fb: FacebookService) {
    this.iniciarFb();
  }

  ngOnInit(): void {
  }

  postFb(){
    const apiMethod: ApiMethod = "post";
      try{
        this.fb.api('/385122418012698/feed', apiMethod, {
          "message": this.mensaje,
          "access_token": "EAAOGQdAXZCq8BO58ZBzB37iZCOfbvFEj5nt2ZCYvh5x2XlJE44nYqmVJ2m0cZBoke7VFPDGB4rCMZCEhZBWptMfOUuq6qWGyPuvG5oiBFH9clDVY3A4aHnnhVhZA98UL69qUwjyKpdGOwjQ2U6S9UOAIkJXpMm0ZAbHXJYkG2JxOUU2csfwphpP9D0znKiM7GN4YUmXmq2SPkhicFZB20blOq57AZDZD"
        });
        alert('Publicación exitosa en Facebook');
      } catch{
        console.error('Error al publicar en Facebook:');
        // Muestra un mensaje de error al usuario
        alert('Ocurrió un error al publicar en Facebook. Por favor, inténtalo de nuevo más tarde.');
      }
  }

  iniciarFb(){
    const initParams: InitParams = {
      appId: '992042152361647',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v20.0'
    };
    this.fb.init(initParams);
    console.log('Hola mundo');
  }

}
