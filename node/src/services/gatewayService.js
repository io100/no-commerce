import braintree from 'braintree'


const gatewayProvider = process.env.GATEWAY_PROVIDER;

class GatewayService {
    constructor(gatewayProvider) {
        super(gatewayProvider);


        this.gatewayProvider = gatewayProvider.bind(this);
        this.gatewayMode = gatewayMode.bind(this);
        this.gateway = gateway.bind(this);

        const merchantId = process.env.MERCHANT_ID;
        const publicKey  = process.env.PUBLIC_KEY;
        const privateKey = process.env.PRIVATE_KEY;



        this.gateway = braintree.connect({
            environment: braintree.Environment.Production,
            merchantId:  merchantId,
            publicKey:   publicKey,
            privateKey:  privateKey
        });

        




        

    }

    authenticate(data){
        if('Authorize.Net' === gatewayProvider) {

        }

        if('Braintree' === gatewayProvider) {

        }

        if('Stripe' === gatewayProvider) {

        }

    }

    chargeCustomer(data) {
        if('Authorize.Net' === gatewayProvider) {

        }

        if('Braintree' === gatewayProvider) {

        }

        if('Stripe' === gatewayProvider) {

        }

    }

    refundCustomer(data) {
        if('Authorize.Net' === gatewayProvider) {

        }

        if('Braintree' === gatewayProvider) {

        }

        if('Stripe' === gatewayProvider) {

        }

    }

    createSubscription(data) {
        if('Authorize.Net' === gatewayProvider) {

        }

        if('Braintree' === gatewayProvider) {

        }

        if('Stripe' === gatewayProvider) {

        }

    }

    cancelSubscription(data) {
        if('Authorize.Net' === gatewayProvider) {

        }

        if('Braintree' === gatewayProvider) {

        }

        if('Stripe' === gatewayProvider) {

        }

    }


}  

export default GatewayService;
