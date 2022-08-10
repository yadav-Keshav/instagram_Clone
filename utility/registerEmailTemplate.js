
const registerEmailTemplate=(name,link)=>{
   return {
    subject:"Verify Your Email",
    html:`<h1>Welcome ${name}<h1>
    <p>Click below link to confirm email</p>
    <p>${link}</p>`
   }
}

module.exports=registerEmailTemplate;