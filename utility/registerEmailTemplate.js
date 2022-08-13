
const registerEmailTemplate=(name,link)=>{
   return {
    subject:"Verify Your Email",
    html:`<h3>Welcome ${name}<h3>
    <h5>Click below link to confirm email</h5>
    <a href=${link}>Click here</a>`
   }
}

module.exports=registerEmailTemplate;