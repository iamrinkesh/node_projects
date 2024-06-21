// const http = require('http'); //don't require here as we are using the express listen function
const express = require('express'); //get the express dependencies
const path = require('path');
const app = express(); //is the function from express dependencies
//app contains many useful functions
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars'); 
const errorController = require('./controllers/error');
const sequelize = require('./helper/database');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const {adminRoutes} = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product');
// const rootDir = require('./helper/path');

app.use(bodyParser.urlencoded({extended: false})); //to parse the body passing json or through form etc.

app.use((req, res, next)=>{
  User.findByPk(1)
    .then(user=>{
      req.user = user;
      next();
    })
    .catch(err=>console.log(err))
})

app.use(shopRoutes);
app.use('/admin',adminRoutes); //filtering that the routes with /admin can entertain

//using express handlebars 
// app.engine('hbs', expressHbs());

//using pug template
// app.set('view engine', 'pug'); //set is the functionality available in express to set any values globally.
app.set('view engine', 'ejs'); //For ejs we can directly define in the view engine
app.set('views', 'views'); 

app.use(express.static(path.join(__dirname,'/public'))); //to define the public folder as static and readable

app.use(errorController.get404)


//to add constraints relationship between the User and Product
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem })

// const server = http.createServer(app); 

sequelize
  // .sync({force: true})
  .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if(!user){
      return User.create({name: 'Rinkesh', email: 'test@test.com'})
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
  })
  .then(cart =>{
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
