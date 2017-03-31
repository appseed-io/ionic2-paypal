import { Component } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from 'ionic-native';
import { Config } from '../../config';

@Component({
	templateUrl: 'paypal.html'
})

export class PayPalPage {
	payment: PayPalPayment = new PayPalPayment('10.10', 'USD', 'TV', 'sale');
	currencies = ['EUR', 'USD']

	makePayment() {
		PayPal.init({
			PayPalEnvironmentProduction: Config.payPalEnvironmentProduction,
			PayPalEnvironmentSandbox: Config.payPalEnvironmentSandbox
		}).then(() => {
			PayPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({})).then(() => {
				PayPal.renderSinglePaymentUI(this.payment).then((response) => {
					alert(`Successfully paid. Status = ${response.response.state}`);
					console.log(response);
				}, () => {
					console.error('Error or render dialog closed without being successful');
				});
			}, () => {
				console.error('Error in configuration');
			});
		}, () => {
			console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
		});
	}
}
