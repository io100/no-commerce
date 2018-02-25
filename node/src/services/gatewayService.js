import braintree from 'braintree'


const gatewayProvider = process.env.GATEWAY_PROVIDER;

class GatewayService {
    constructor(gatewayProvider) {
        super(gatewayProvider);



        

    }

    authenticate(data){
      
    }

    chargeCustomer(data) {
    
    }

    refundCustomer(data) {
    
    }

    createSubscription(data) {
    
    }

    cancelSubscription(data) {
    }


}  

export default GatewayService;
