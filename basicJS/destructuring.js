// define an object
const demoObj = {
    name : 'Rinkesh',
    Age : 26 ,
    Place : 'Kerala' ,
    Work : 'Techies' ,
    demFunction(){
        console.log('Demo function in object');
    }
};

const demoArray = [ 'Pinky', 'Monkey', 'Donkey'];

// Destructuring is pulled out the properties from the array or an object

const destrFunction = ({name, Age}) => { //Destructuring function to get the name and age properties from object
    console.log(name, Age);
};

destrFunction(demoObj);

const{Work, Place} = demoObj; //Destructuring Work and Place properties from object
console.log(Work, Place);

const[arg1, arg2] = demoArray; //Destructuring array properties\
console.log(arg1, arg2);
