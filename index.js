
/**
 * Linkedin Adapter 
 * usando npm install node-linkedin
 * La documentación es pobre se debe ver directamente la librería
 * @class
 */
class Adapter{
  constructor(client){
    this.client  = client;
    this.linkedin = require('node-linkedin')(client.options.clientId, client.options.clientSecret);
    this.linkedin = this.linkedin.init(client.options.accessToken);
  }

  post(post){
    return new Promise((resolve,reject)=>{
      let message =  post.message + (post.link)? ` ${post.link}`: '';
      this.linkedin.people.share({
        content:{ "submitted-url":post.link}, 
        comment:post.message, 
        visibility:{code:"anyone"}
      },function(err, resp) {
          if(err){
            reject(err);
            return;
          }
          resolve(resp);
      });
    })
  }
}

module.exports = Adapter;