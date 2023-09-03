// learn about rest and spread operators in array and objcets
// define an object
const demoObj = {
    name : 'Rinkesh',
    Age : 26 ,
    Place : 'Kerala' ,
    demFunction(){
        console.log('Demo function in object');
    }
};

const demoArray = [ 'Pinky', 'Monkey', 'Donkey']

const spreadDemoObject = {...demoObj}; // spread oprator to copy object to another without nested
console.log(spreadDemoObject);

const spreadDemoArray = [...demoArray]; // spread oprator to copy array to another without nested
console.log(spreadDemoArray);


// If we want to pass any arguments to the function then we can use Rest operator as below
const restFunction = (...args) =>{ //pass multiple arguments
    console.log(args);
}

restFunction('1','2','3','4','5','6','7','8','9'); //call the function and pass n no of arguments