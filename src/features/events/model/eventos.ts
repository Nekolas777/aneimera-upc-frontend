export interface Eventos {
    content:Evento[],
    last:boolean,
    totalElements:number,
}
export interface Evento {
    titulo:string,
    aforo:number,
    modalidad:string,
    tipo:string,
    enlace:string,
    fecha:Date,
    hora:string,
    visitaTecninaId?:number,
    tallerId?:number,
    ponenciaId?:number,
    estado:number
}