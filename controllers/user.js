const User=require('../models/user');

module.exports.renderRegister=(req,res)=>{
    res.render('users/register');

}

module.exports.register=async(req,res)=>{
    try{  const {email,username,password}=req.body;
      const user=new User({email,username});
      const registeredUser=await User.register(user,password);
      // console.log(registeredUser);
      req.login(registeredUser,err=>{
          if(err) return next(err);
        req.flash('success','welcome to yelp camp!');
      res.redirect('/campground');
  })  }
  catch(e)
  {
       req.flash('error',e.message);
       res.redirect('/register')
  }
  
  }

module.exports.renderLogin=(req,res)=>{
    res.render('users/login');
}

module.exports.login=(req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campground'; // update this line to use res.locals.returnTo now
    res.redirect(redirectUrl);
}

module.exports.logout=(req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campground');
    });
}