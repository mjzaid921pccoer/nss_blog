
const {Builder,By,Key,util} = require('selenium-webdriver');
var driver = new Builder().forBrowser('chrome').build();
var assert = require('assert');

var LINK = 'https://nss-pccoer-blog.herokuapp.com/blog/home';
var imagepath1 = __dirname + '\\dog.jpg';
var imagepath2 = __dirname + '\\rose.jpg';
var NAME = "Akash";
var PASSWORD = "akash123";
var EMAIL = "akash@gmail.com";



async function testLogin(driver){

    console.log("************* TESTING LOGIN FEATURE  **********")
    await driver.get(LINK);
    await driver.findElement(By.linkText('Login')).click();
    console.log("-> Entering admin credentials...")
    await driver.findElement(By.name('email')).sendKeys(EMAIL);
    //console.log("Email entered....");
    await driver.findElement(By.name('password')).sendKeys(PASSWORD);
    //console.log("Password entered....");
    await driver.findElement(By.className('btn btn-success btn-lg')).click();
    console.log("-> Admin logged in....");
    
    // setTimeout(function(){
    //             driver.quit();
    //         },5000);
    
}

async function testInvalidLogin1(driver){

    console.log("************* TESTING INVALID LOGIN (invalid email) **********")
    var INVALID_EMAIL = "INVALIDEMAIL";
    await driver.get(LINK);
    await driver.findElement(By.linkText('Login')).click();
    console.log("-> Entering admin credentials...")
    await driver.findElement(By.name('email')).sendKeys(INVALID_EMAIL);
    //console.log("Email entered....");
    await driver.findElement(By.name('password')).sendKeys(PASSWORD);
    //console.log("Password entered....");
    await driver.findElement(By.className('btn btn-success btn-lg')).click();
    var alertMsg = await driver.findElement(By.className('alert alert-danger alert-dismissible fade show')).getText();
    
    if(alertMsg.includes("enter valid email")){
        console.log("Test passed...");
    }
    else{
        console.log("Test failed...");
    }
    console.log("Done......");
}

async function testInvalidLogin2(driver){

    console.log("************* TESTING INVALID LOGIN (invalid password) **********")
    var INVALID_PASSWORD = "INVALIDPASSWORD";
    await driver.get(LINK);
    await driver.findElement(By.linkText('Login')).click();
    console.log("-> Entering admin credentials...")
    await driver.findElement(By.name('email')).sendKeys(EMAIL);
    //console.log("Email entered....");
    await driver.findElement(By.name('password')).sendKeys("INVALIDPASSWORD");
    //console.log("Password entered....");
    await driver.findElement(By.className('btn btn-success btn-lg')).click();
    var alertMsg = await driver.findElement(By.className('alert alert-danger alert-dismissible fade show')).getText();
    if(alertMsg.includes("password didnt match")){
        console.log("Test passed...");
    }
    else{
        console.log("Test failed...");
    }
    console.log("Done......");
}


async function testLogOut(driver){

    console.log("******  TESTING LOGOUT FEATURE  ********");

    await testLogin(driver);

    await driver.findElement(By.linkText('Logout')).click();
    console.log("-> Logged out successfully............!!!!");
    console.log("-> Going to home page...");
    await driver.findElement(By.linkText('Home')).click();
}

async function testRegister(driver){

    console.log("*********** TESTING REGISTER FEATURE  ************");
    
    await driver.get(LINK);
    await driver.findElement(By.linkText('Register')).click();
    console.log("-> Entering user credentials....");
    await driver.findElement(By.name('name')).sendKeys(NAME);
    //console.log("Entered name.....");
    await driver.findElement(By.name('email')).sendKeys(EMAIL);
    //console.log("Email entered....");
    await driver.findElement(By.name('password')).sendKeys(PASSWORD);
    //console.log("Password entered....");
    await driver.findElement(By.className('btn btn-success btn-lg')).click();
    console.log("-> New User registered....");

}

async function testInvalidRegistration(driver){
    console.log("*********** TESTING INVALID REGISTRATION (invalid Name)  ************");
    var INVALID_NAME = "abc";
    await driver.get(LINK);
    await driver.findElement(By.linkText('Register')).click();
    console.log("-> Entering user credentials....");
    await driver.findElement(By.name('name')).sendKeys(INVALID_NAME);
    //console.log("Entered name.....");
    await driver.findElement(By.name('email')).sendKeys(EMAIL);
    //console.log("Email entered....");
    await driver.findElement(By.name('password')).sendKeys(PASSWORD);
    //console.log("Password entered....");
    await driver.findElement(By.className('btn btn-success btn-lg')).click();
    var alertMsg = await driver.findElement(By.className('alert alert-danger alert-dismissible fade show')).getText();
    if(alertMsg.includes("name should be 5 character long")){
        console.log("Test passed...");
    }
    else{
        console.log("Test failed...");
    }
}


async function testAddBlog(driver){

    let BLOG_TITLE = "Tree plantation at PCCOER";
    let BLOG_CONTENT = "Trees were planted at PCCOER campus on World Environment Day...";
    let TAG = "Some tag1";

    console.log("Testing feature to add a blog.....");
    
    await testLogin(driver);
    
    await driver.findElement(By.linkText('AddArticle')).click();
    console.log("Adding new blog...");
    await driver.findElement(By.name('title')).sendKeys(BLOG_TITLE);
    console.log("Title entered....");

    await driver.findElement(By.name('file')).sendKeys(imagepath1);
    console.log("Image added...");

    await driver.findElement(By.name('content')).sendKeys(BLOG_CONTENT);
    console.log("Content entered....");

    await driver.findElement(By.name('tag')).sendKeys(TAG);
    console.log("Tags entered....");

    await driver.findElement(By.className('btn btn-success btn-lg')).click();
    console.log("New blog added....");

}

async function testEditBlog(driver){
    console.log("Testing feature to edit a blog.....");
    await testLogin(driver);
    await driver.findElement(By.className('btn')).click();
    await driver.findElement(By.name('file')).sendKeys(imagepath2);
    console.log("Image updated...");
    await driver.findElement(By.className('btn btn-success btn-lg')).click();
    console.log("Blog edited.........");
}


async function testDeleteBlog(driver){

    console.log("Testing feature to delete a blog...");
    await testLogin(driver);
    var buttons = await driver.findElements(By.linkText("delete"));
    //console.log(buttons.length);
    if(buttons.length>0)
    await buttons[0].click();
    else console.log("No blogs to delete...");
    console.log("Blog deleted........");
}


async function openInstagram(driver){
    await driver.get(LINK);
    await driver.findElement(By.className('fa fa-instagram')).click()
    
    console.log(driver.getWindowHandle());
    var windows = await driver.getAllWindowHandles();
    console.log(windows);
    await driver.switchTo().window(windows[1]);
    var title = await driver.getTitle();
    console.log(title);
    if(title=="NSS PCCOER (@nss_pccoer) • Instagram photos and videos"){
        console.log("Test passed successfully...");
    }else{
        console.log("Test failed...");
    }
    console.log("Done........"); 
}

async function openFacebook(driver){
    await driver.get(LINK);
    await driver.findElement(By.className('fa fa-facebook')).click()
    
    console.log(driver.getWindowHandle());
    var windows = await driver.getAllWindowHandles();
    console.log(windows);
    await driver.switchTo().window(windows[1]);
    var title = await driver.getTitle();
    console.log(title);
    if(title=="Pimpri Chinchwad College of Engineering & Research - Pccoer - Home | Facebook"){
        console.log("Test passed successfully...");
    }else{
        console.log("Test failed...");
    }
    console.log("Done........"); 
}


async function openNSSPage(driver){
    await driver.get(LINK);
    await driver.findElement(By.linkText("NSS PCCOE&R")).click()
    
    console.log(driver.getWindowHandle());
    var windows = await driver.getAllWindowHandles();
    console.log(windows);
    await driver.switchTo().window(windows[1]);
    var title = await driver.getTitle();
    console.log(title);
    if(title=="NSS Unit at Pimpri Chinchwad College of Engineering and Research | PCCOER - PCMC, Pune"){
        console.log("Test passed successfully...");
    }else{
        console.log("Test failed...");
    }
    console.log("Done........"); 
}


//testLogin(driver);
//testInvalidLogin1(driver);
//testInvalidLogin2(driver);
//testInvalidRegistration(driver);
//testLogOut(driver);
//testRegister(driver);
//testAddBlog(driver);
//testEditBlog(driver);
//testDeleteBlog(driver);
//openInstagram(driver);
//openFacebook(driver);
//openNSSPage(driver);