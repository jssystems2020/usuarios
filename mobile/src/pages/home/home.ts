import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { Usuario } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/usuario.service';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  login:string;
  senha:string;

  constructor(public navCtrl: NavController, public menu: MenuController,
  public alertController: AlertController,
  public usuarioService: UsuarioService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  logar(){

    if(this.login != undefined && this.senha != undefined && this.login.length != 0 && this.senha.length != 0){
      //this.presentAlert("Senha e login definidos");

      let usuario:Usuario = {idPessoa:'', login:this.login, senha:this.senha, tipo:''};
      this.usuarioService.post(usuario).subscribe(
        (resposta:Usuario)=>{
        //  console.log(resposta)
        if(resposta.tipo == 'adm'){
          this.presentAlert("Olá "+resposta.login+" seja bem vindo(a)! Seu perfil é de Administrador!");
          this.navCtrl.setRoot("AdmPage");
        }else{
          this.presentAlert("Olá "+resposta.login+" seja bem vindo(a)! Seu perfil é de Usuário!");
          this.navCtrl.setRoot("ComumPage");
        }
        },
        error=>{
         // console.log(error);
         this.presentAlert("Erro:"+error.error.erro);
        }
      )
      //  this.presentAlert(this.login);
    //  this.presentAlert(this.senha);
    //  console.log(this.login);
  //    console.log(this.senha);
    }else{// Senha ou login não definido
      this.presentAlert("Senha e login não definidos");
    }
  }

  presentAlert(messagem: string){
    let alert = this.alertController.create({
      title: 'Aviso',
      subTitle: messagem,
      buttons: ['ok']
    });
    alert.present();
  }
}
