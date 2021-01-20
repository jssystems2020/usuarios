import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APICONFIG } from "../config/api.config";
import { Usuario } from "../models/usuario.dto";



@Injectable()
export class UsuarioService{

    constructor(public httpClient: HttpClient){}

    post(usuario: Usuario){
        var url = APICONFIG.urlBase+"webservice.php";
        return this.httpClient.post<Usuario>(url,usuario);
    }

}