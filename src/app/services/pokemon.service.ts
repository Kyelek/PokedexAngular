import { Injectable } from '@angular/core';
import { Resultado } from '../interfaces/pokeapi';
import { Pokemon } from '../interfaces/pokemon';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  async getByPage(page:number,size:number = 25):Promise<Resultado[]>{
    if(page > 6)return []; // you`re trash 
    const offset = size*(page-1);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${size}&offset=${offset}`); //cuantos pokemon quieres y desde donde quieres que empiece
    const resJson = await res.json();
    if(resJson.results.length > 0) {
      return resJson.results;
    }
    return [];
  }

  async getById(id:string):Promise<Pokemon>{ // los datos los tengo en la interfaz de pokemon 
    //https://pokeapi.co/api/v2/ability/
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) ;
    const resJson = await res.json();

    return resJson;
  }

  async getDescription(id:string | number):Promise<string>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`) ;
    const resJson = await res.json();

    const texto = resJson.flavor_text_entries.find((texto:any)=> texto.language.name === 'es')

    return texto.flavor_text;
  }

}
