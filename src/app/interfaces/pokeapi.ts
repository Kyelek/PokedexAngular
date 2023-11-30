export interface Data{
    count: number,
    name: string,
    previous:string,
    results: Resultado[]
}

export interface Resultado{
    name:string,
    url:string
}