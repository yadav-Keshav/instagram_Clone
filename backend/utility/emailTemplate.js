
exports.registerEmailTemplate = (name, link) => {
   return {
      subject: "Verify Your Email",
      html:
         `<h3>Welcome ${name}<h3>
          <h5>Click below link to confirm email</h5>
          <a href=${link}>Click here</a>`
   }
}

exports.forgotEmailTemplate = (link) => {
   return {
      subject: "password reset",
      html: `
      <p>You requested for password reset</p>
      <h5>click in this <a href=${link}>link</a> to reset password</h5>`
   }
}
