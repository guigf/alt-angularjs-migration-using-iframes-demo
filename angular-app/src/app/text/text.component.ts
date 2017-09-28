import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  texto: string;

  constructor() { }

  ngOnInit() {
    this.texto = localStorage.getItem("texto") || '';

    window.addEventListener('storage', (e) => {
      if (e.key == "texto") {
        this.texto = e.newValue;
        console.log("'texto' key updated to " + this.texto);
      }
    });
  }

  reset() {
    this.texto = '';
    localStorage.setItem("texto", this.texto)
  }

  input() {
    localStorage.setItem("texto", this.texto)
  }

}
