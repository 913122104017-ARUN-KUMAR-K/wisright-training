
let display =document.querySelector('#display');
let expressionvalue='';
function appendToDisplay(value){
    let lastchar = expressionvalue.charAt(expressionvalue.length - 1);
    if(expressionvalue === '' && (value === '/' || value === '*' || value === '+' || value === '-' || value === '.')){
        return;
    }
    if((lastchar === '/'|| lastchar === '*' || lastchar === '+'  || lastchar === '-' || lastchar === '.') && (value === '/' || value === '*' || value === '+' || value === '-' || value === '.')){
        return;
    }
    if(value === '.' && expressionvalue.includes('.')){
        return;
    }
    

    expressionvalue += value;
    display.value = expressionvalue;
}
function clearDisplay(){
    expressionvalue = '';
    display.value = '';
}
function calculate(){
    if(expressionvalue === ''){
        return;
    }
    try{
        let result = eval(expressionvalue);
        display.value = result;
 expressionvalue = result.toString();
       
    }catch(error){
        display.value = 'Error';
        expressionvalue="";
    }   
}
