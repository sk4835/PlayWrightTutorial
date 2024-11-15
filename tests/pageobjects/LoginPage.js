class LoginPage {

        constructor(page) 
        {
            this.logInButton = page.locator("#login");
            this.userName = page.locator("#userEmail");
            this.passField = page.locator("#userPassword");

        }


        validLogin = async (email, password) => 
        {
            await this.userName.fill(email);
            await this.passField.fill(password);
            await this.logInButton.click();
        }


}

module.exports = { LoginPage };