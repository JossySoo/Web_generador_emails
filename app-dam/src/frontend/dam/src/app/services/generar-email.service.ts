import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GenerarEmailService {
  uri = 'http://localhost:8000'
  datos_email = {titulo1:'',titulo2:'',fraseinicial:'',parrafo:'' , haveTasa:false ,
                  segmentoCliente:'', tasa:0.0 , legal_tasa:'' ,html:''}
  prueba="pasa la voz"
  ultimo_emailId=0
  constructor(private _http: HttpClient, private _router: Router) { }

  generarEmail (titulo1:string,titulo2:string,fraseinicial:string,parrafo:string ,haveTasa:boolean ,
                segmentoCliente:string, tasa:number =0.0, legal_tasa:string ='' ) {
    this.datos_email.titulo1=titulo1
    this.datos_email.titulo2=titulo2
    this.datos_email.fraseinicial=fraseinicial
    this.datos_email.parrafo=parrafo
    this.datos_email.haveTasa=haveTasa
    this.datos_email.segmentoCliente=segmentoCliente
    this.datos_email.tasa=tasa
    this.datos_email.legal_tasa=legal_tasa
    
    this.datos_email.html=`<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="format-detection" content="telephone=no">
        <style type="text/css">
        body {background:#FFFFFF; margin: 0; padding: 0; !important;
        }
        img {height: auto;
        }
        u + #body a {
        color: inherit;
        cursor: default;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;}
        .ExternalClass *{line-height:100%;}
        </style>
</head>
<body id="body" yahoo bgcolor="#ffffff" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
	<table width="86%" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width: 600px; ">
    <tr><td valign="top" align="center"><img style="display: block" src="img/CABECERA_B.png" width="600"/></td></tr><tr><td bgcolor="#001F76" valign="top" style="-webkit-text-size-adjust:none; font-family: Arial, Tahoma, Helvetica;  font-size:20px; line-height:20px; color:#FF6300; text-align:center;">
                  <table width="600" cellpadding="0" cellspacing="0px" border="0" align="center">
                    <tr><td valign="top" width="261" style="-webkit-text-size-adjust:none; text-align:left; vertical-align: middle;">
                        <p style="font-size:35px; margin:0px 0px 0px 15px;line-height: 40px ;"><strong>${titulo1}</strong></p>
                        <p style="font-size:25px; margin:0px 0px 0px 15px;line-height: 30px ;color:#ffffff;">${titulo2}</strong></p>
                    </td><td valign="top" width="261" style="-webkit-text-size-adjust:none; color:#ffffff; text-align:rightt; margin-left: 0px; margin-right: 0px; "><img style="margin:0px; width:100%; height:auto;" src="img/visa-signature.png"/></td></tr></table></td></tr><tr>
			<td bgcolor="#ffffff" valign="top" style="-webkit-text-size-adjust:none; font-family: Arial, Tahoma, Helvetica;  font-size:16px; line-height:24px; color:#ffffff; text-align:left;">
				<p style="margin: 48px 24px 0px 24px; color: #202E44; font-size:16px; line-height:24px;"><strong>Hola &lt;Nombre&gt;,</strong></p>
                  <p style="margin: 24px 24px 0px 24px; color: #002A8D; font-size:24px; line-height:32px;"><strong>${fraseinicial}</strong></p>
                  <p style="margin: 16px 24px 24px 24px; color: #202E44; font-size:16px; line-height:24px;">${parrafo}</p></td></tr><tr>
            <td bgcolor="#001F5A" valign="top" style="-webkit-text-size-adjust:none; font-family: Arial, Tahoma, Helvetica;  font-size:14px; line-height:20px; color:#ffffff; text-align:left;">
                <img src="img/lg_dark.png" style="height:24px; margin:40px 0px 0px 24px;">
                <p style="margin:24px 30px 0px 24px; font-size:14px; line-height:20px; text-align:left">Para cualquier consulta no dudes en comunicarte con tu Ejecutivo de la Banca Exclusiva Digital al 20-50-500: <strong>&lt;Nombre y Apellidos&gt;</strong></p>
                <table width="552" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto; margin-top: 26px; margin-bottom: 32px">
                    <tr>
                        <td valign="top" width="32" style="-webkit-text-size-adjust:none; color:#ffffff; text-align:left; ">
                            <img style="margin:0px 0px 0px 0px;" src="img/icon-bex-1.png" width="32" alt="bullet1"/> 
                        </td>  	  
                        <td valign="top" width="0" style="-webkit-text-size-adjust:none; color:#ffffff; text-align:center; margin-left: 15px; margin-right: 10px; ">
                            <p style="margin:8px 0px 0px 10px; color: #ffffff; font-size:14px; line-height:16px; text-align:left"><strong>&lt;mailbcp1@bcp.com.pe&gt;</strong></p>
                        </td> 
                    </tr>
                    <tr>
                        <td valign="top" width="32" style="-webkit-text-size-adjust:none; color:#ffffff; text-align:left; ">
                            <img style="margin:0px 0px 0px 0px;" src="img/icon-bex-2.png" width="32" alt="bullet1"/> 
                        </td>  	  
                        <td valign="top" width="0" style="-webkit-text-size-adjust:none; color:#ffffff; text-align:center; margin-left: 15px; margin-right: 10px; ">
                            <p style="margin:8px 0px 0px 10px; color: #ffffff; font-size:14px; line-height:16px; text-align:left"><strong>&lt;XXX XXX XXX&gt;</strong></p>
                        </td> 
                    </tr>
                </table>
            </td>
        </tr> 
        <tr>
			<td bgcolor="#FFFFFF" align="center" colspan="2" style="border-top:24px solid #ffffff">
				<table width="552" cellpadding="0" cellspacing="0" border="0">
					<tbody>
					<tr>
						<td valign="top" style="font-family:Arial,Tahoma,Helvetica;font-size:9px;line-height:12px;color:#57595b;text-align:center">

							<table width="552" align="center" cellpadding="0" cellspacing="0" border="0">
							<tbody>
								<tr>
									<td>
										<div style="margin:15px 0px 0px 0px;border-top:1px solid #000000;line-height:10px">
										</div>
									</td>
								</tr>
        <tr>
            <td style="font-family:Arial,Tahoma,Helvetica;font-size:9px;line-height:16px;color:#202e44;text-align:justify">
                <table align="left" width="285" height="105" border="0" cellpadding="0" cellspacing="0" style="margin:5px 5px 5px 0px">
                    <tbody><tr>
                        <td width="88" height="88" rowspan="3" style="line-height:1px">
                            <img style="display:block" src="img/sello.png" width="77" height="69" class="CToWUd" data-bit="iit">
                        </td>
                        <td width="93" height="105" rowspan="3" style="line-height:1px">
                            <img style="display:block" src="img/TCEA_1.jpg" width="93" height="105" class="CToWUd" data-bit="iit">
                        </td>
                        <td colspan="2" style="line-height:1px">
                            <img style="display:block" src="img/TCEA_superior.jpg" width="103" height="53" class="CToWUd" data-bit="iit">
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" width="83" height="21" style="font-size:18px;font-family:Helvetica,Tahoma,Arial;color:#414042;line-height:14px;text-align:left">
                            <strong><em>${(this.datos_email.tasa*100).toString+"%"}</em></strong>
                        </td>
                        <td width="20" style="line-height:1px" rowspan="2">
                            <img style="display:block" src="img/derecha.jpg" width="20" height="52" class="CToWUd" data-bit="iit">
                        </td>
                    </tr>
                    <tr>
                        <td style="line-height:1px">
                            <img style="display:block" src="img/inferior.jpg" width="83" height="31" class="CToWUd" data-bit="iit">
                        </td>
                    </tr>
                </tbody></table><br>
                <b>${legal_tasa}</b>
            </td>
        </tr> 
							</tbody></table>
						</td>
					</tr>
				</tbody></table>
                <table width="552" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                    <tr>
                    <td valign="top" style="font-family:Arial,Tahoma,Helvetica;font-size:10px;line-height:12px;color:#57595b;text-align:center">
                    <p style="color:#002a8d;line-height:16px;text-align:justify;margin-top:15px"><b>Juntos somos más seguros</b><br>El BCP nunca te solicitará datos confidenciales por correo, tales como tu clave secreta de cajero de 4 dígitos, clave de internet de 6 dígitos, número de tu tarjeta de débito o crédito, fecha de vencimiento, código CVV, código de validación OTP o clave Token, para resolver supuestos problemas con tus cuentas o para participar en sorteos o promociones. <br>Nuestros correos personalizados con botón o link, únicamente te dirigirán a 
                    www<span style="line-height:1px;font-size:1px">&nbsp;</span>.<span style="line-height:1px;font-size:1px">&nbsp;</span>viabcp<span style="line-height:1px;font-size:1px">&nbsp;</span>.<span style="line-height:1px;font-size:1px">&nbsp;</span>com o sus páginas internas, es decir, que contengan .<span style="line-height:1px;font-size:1px">&nbsp;</span>viabcp<span style="line-height:1px;font-size:1px">&nbsp;</span>.<span style="line-height:1px;font-size:1px">&nbsp;</span>com en la dirección web. En caso tengas dudas sobre alguna comunicación del 
                    BCP puedes comunicarte con nosotros a través de nuestras redes sociales, al grupo de Facebook Alerta Fraude o llamando al (01) 311 – 9898. Nuestros e-mails no incluirán archivos adjuntos (a excepción del envío de los estados de cuenta u otros documentos solicitados y/o coordinados previamente con nosotros). Para conocer más sobre las principales modalidades de fraude, aprender a reconocerlas y cómo protegerte, ingresa a https<span style="line-height:1px;font-size:1px">&nbsp;</span>:<span style="line-height:1px;font-size:1px">&nbsp;
                    </span>//<span style="line-height:1px;font-size:1px">&nbsp;</span>viabcp<span style="line-height:1px;font-size:1px">&nbsp;</span>.<span style="line-height:1px;font-size:1px">&nbsp;</span>com<span style="line-height:1px;font-size:1px">&nbsp;</span>/<span style="line-height:1px;font-size:1px">&nbsp;</span>segu<wbr>ridad y mantente atento a las publicaciones periódicas que realizamos en nuestras redes sociales.</p>
                    <p style="color:#202e44;line-height:16px;text-align:justify;margin-top:15px;margin-bottom:40px">Si no deseas recibir publicidad ni información del BCP en tu correo o has recibido este mensaje por error, responde a este email indicando en el asunto la palabra REMOVER. Si tuvieras alguna consulta, por favor comunícate con nuestra Banca por Teléfono al 311-9898, no lo envíes a través de este correo electrónico. Si este correo omite vocales, tildes, letras ñ o éstas son cambiadas por otros caracteres, no se debe a errores ortográficos del Banco 
                    de Crédito BCP. Esto puede originarse por la configuración del servidor de tu correo o la versión de tu navegador. El sistema de correo electrónico del BCP está destinado únicamente para fines de negocio, cualquier otro uso contraviene las políticas del Banco. Toda la información del negocio contenida en este mensaje es confidencial y de uso exclusivo del BCP. Su divulgación, copia y/o adulteración están prohibidas y solo debe ser conocida por la persona a quien se dirige este mensaje. Esta información se envía de acuerdo a la legislación 
                    correo electrónico comercial no solicitado – SPAM según Leyes 28493 y 29246. Banco de Crédito del Perú S.A. – RUC: 20100047218.</p>
                    <table width="552" align="center" cellpadding="0" cellspacing="0" border="0"></table>
                    </td>
                    </tr>
                    </tbody>
                </table>
			</td>
		</tr>
        
</table></body></html>`

    console.log("Se generó el email")
    console.log(this.datos_email.html)

    this.guardarEmail()

  }
//   localStorage.getItem('token')

  guardarEmail() {
    this._http.post(this.uri+ '/emails', this.datos_email, { headers: { 'Content-Type': 'application/json' } }).subscribe({
      next: (response: any) => {
        console.log('Success:', response);
        this.ultimo_emailId=response.id;
        console.log(response.id)
        this._router.navigate(['/emailprev/'+response.id])
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });

    }

    ultimoEmail(){
        return this.ultimo_emailId
    }

}
