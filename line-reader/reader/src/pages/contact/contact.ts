import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var cordova: any;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  codeType: string;
  codeText: string;

  constructor(public navCtrl: NavController) {

  }

  readBarCode(){
  	this.codeType = "UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR";
  	this.readCode();
  }

  readQRCode(){
  	this.codeType = "QRCODE";
  	this.readCode();
  }

  readCode(){
  	var self = this;

  	cordova.plugins.barcodeScanner.scan(
	      function (result) {
	          self.codeType = result.format;
	          self.codeText = result.text;
	      },
	      function (error) {
	          alert("Scanning failed: " + error);
	      },
	      {
	          preferFrontCamera : false, // iOS and Android
	          showFlipCameraButton : false, // iOS and Android
	          showTorchButton : true, // iOS and Android
	          torchOn: false, // Android, launch with the torch switched on (if available)
	          prompt : "Place a barcode inside the scan area", // Android
	          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
	          //formats : this.codeType, // default: all but PDF_417 and RSS_EXPANDED
	          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
	          disableAnimations : true, // iOS
	          disableSuccessBeep: false // iOS
	      }
	   );
  }
  	

}
