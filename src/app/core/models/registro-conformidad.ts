import { ObservacionRegistro } from "./observacion-registro";

export class RegistroConformidad {
observations:ObservacionRegistro[]=[];
constructor(
    public id?:string,
    public e?:string,
    public ws?:string,
    public hora_de_ingreso?:string,
    public hora_de_salida?:string,
    public estado_tracking?:string,
    public hora_de_llegada_cliente?:string,
    public hora_de_descarga_cliente?:string,
    public sel?:string,
    public guias_de_remision?:string,
    public instrucciones_de_carga?:string,
    public orden_de_transporte?:string,
    public cliente?:string,
    public destino?:string,
    public placa_tracto?:string,
    public sap_transportista?:string,
    public transportista?:string,
    public chofer?:string,
    public entrega?:string,
    public tipo_material?:string,
    public inconsistencias?:string,
    public detalle?:string,
    public peso_teorico?:string,
    public peso_tara?:string,
    public peso_bruto?:string,
    public peso_balanza?:string,
    public diferencia_peso?:string,
    public diferencia?:string,
    public tolerancia?:string,
    public pedido?:string,
    public sede?:string,
    public pdf_guia_transportista?:string,
    public pdf_guia_cobranza?:string,
){

}
}
