const gatewayProvider = process.env.GATEWAY_PROVIDER;

class GatewayService {
    constructor(gatewayProvider) {
        super(gatewayProvider);
        this.gatewayProvider = gatewayProvider.bind(this);
    }




}  

export default GatewayService;
