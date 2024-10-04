class APIUtils
{

    constructor(apiContext, loginPayLoad)
    {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    //Login API
    async getToken()
    {
            const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            {
                data: this.loginPayLoad
            })

            const loginJSONResponse = await loginResponse.json();
            const token = loginJSONResponse.token;
            console.log(token);
            return token;
    }

    //Place order API
    async createOrder(orderPayload)
    {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
            {
             data: orderPayload,
             headers: {
                    'Authorization': response.token,
                    'Content-Type': "application/json"
                }
            });
            const orderResponseJSON = await orderResponse.json();
            const OrderNum = orderResponseJSON.orders[0];
            response.OrderNum = OrderNum;
            return response;
    }



}

module.exports = {APIUtils};