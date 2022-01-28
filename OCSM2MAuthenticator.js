let OCSM2MAuthenticator = function () {

    this.evaluate = (context) => {

        const http_request = new NetworkHTTPRequest();
        http_request.requestUrl = this.cognitourl
        http_request.requestMethod = "POST"
        http_request.requestTimeout = 3600000
        http_request.requestBody = JSON.stringify(
            {
                ClientId: this.clientid,
                AuthParameters: {
                    USERNAME: this.username,
                    PASSWORD: this.password
                },
                AuthFlow: "USER_PASSWORD_AUTH"
            }
        )
        http_request.setRequestHeader("Content-Type", "application/x-amz-json-1.1")
        http_request.setRequestHeader("X-Amz-Target", "AWSCognitoIdentityProviderService.InitiateAuth")
        console.log("Request OCS M2M token for ClientId " + this.clientid)
        console.log("Request OCS M2M token for Username " + this.username)
        http_request.send()
        let statusCode = http_request.responseStatusCode;
        if (statusCode !== 200) {
            return "get token returned " + statusCode
        }
        let response =  JSON.parse(http_request.responseBody)
        return response.AuthenticationResult.TokenType + " " + response.AuthenticationResult.IdToken
    }

};

OCSM2MAuthenticator.identifier = "com.sothawo.PawExtensions.OCSM2MAuthenticator";
OCSM2MAuthenticator.title = "OnlineCarSales M2M Authenticator";

OCSM2MAuthenticator.inputs = [
    InputField("cognitourl", "Cognito-Url", "String"),
    InputField("clientid", "ClientId", "String"),
    InputField("username", "Username", "String"),
    InputField("password", "Password", "String"),
]
registerDynamicValueClass(OCSM2MAuthenticator)
