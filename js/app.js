const billField=document.querySelector(".bill-field");
const tipButtons=document.querySelectorAll(".tip-button");
const tipField=document.querySelector(".tip-field");
const personField=document.querySelector(".person-field");
const resetBtn=document.querySelector(".reset-btn");
const tipAmountPerPerson=document.querySelector(".tip-amount");
const totalPerPerson=document.querySelector(".total");
const alerts=document.querySelectorAll(".alert");
const inputs=document.querySelectorAll("input")
// this part of code when tip input changed unactive all tip buttons

// this part of code select one of tip and unselect another one
tipButtons.forEach(e=>{
    e.addEventListener("click",()=>{
        if(e.classList.contains("active")){
            tipButtons.forEach(item=>{
                item.classList.remove("active")
            })
        }else{
            tipButtons.forEach(item=>{
                item.classList.remove("active")
            })
            e.classList.add("active");
            tipField.value="";
        }
        checkInputs()
    })
})
billField.addEventListener("input",(e)=>{
    checkInputs(e.target)
});
personField.addEventListener("input",(e)=>{
    checkInputs(e.target)
});
tipField.addEventListener("input",(e)=>{
    checkInputs(e.target)
});
resetBtn.addEventListener("click",resetCalculate);

tipField.addEventListener("input",()=>{
    tipButtons.forEach(item=>{
        item.classList.remove("active")
    })
})
// checkInputs function check all inputs and if all of them have right value call calculate function
function checkInputs(){
    const checkBill=checkNumber(billField.value,billField);
    const checkPerson=checkNumber(personField.value,personField);
    const checkTip=getTip();
    resetBtn.disabled=false;
    if(checkBill && checkPerson && checkTip){
        calculateTip(checkBill,checkPerson,checkTip)
    }
}
function checkNumber(value,field,acceptZero=false){
    const number=Number(value);
    const parent=field.parentElement.parentElement;
    const nodes=Array.from(parent.childNodes);
    const alert=nodes.find(e=>{
        if(e.classList){
            if(e.classList.contains("alert")){
                return e
            }
        }
    });
    // check for input be a number
    if(isNaN(number)){
        alert.style.opacity=1;
        alert.textContent="enter a number";
        field.classList.add("invalid")
      return false
    //   check for input not zero
    }else if(!acceptZero && number===0){
        alert.style.opacity=1;
        field.classList.add("invalid")
        return false
        // check for input not less down zero
    }else if(number<0){
        alert.style.opacity=1;
        alert.textContent="enter number greater than 0";
        field.classList.add("invalid")
        return false
    }else{
        field.classList.remove("invalid")
        alert.textContent="can't be zero";
        alert.style.opacity=0;
        return number
    }
}
// getTip function get the tip from tip-buttons or tip input and return it
function getTip(){
    const activeTip=Array.prototype.find.call(tipButtons,(item)=>{
       return item.classList.contains("active")
    })
    if(activeTip){
        const text=activeTip.textContent;
        const tipBtnVal=Number(text.split("%")[0])
        return tipBtnVal
    }else{
        const tipFieldVal=Number(tipField.value)
        const result=checkNumber(tipFieldVal,tipField,true);
        return result===0? true : result;
        }
    
}
// calculateTip function calculate result and show them 
function calculateTip(bill,person,tip) {
    let tipAmount;
    let total;
    if (tip===true){
        tip=0
    }
    if(tip===0){
         tipAmount=(0).toFixed(2);
         total=withTwoDesimals(bill/person);
    }else{
        tipAmount=withTwoDesimals((bill*(tip/100))/person);
        total=withTwoDesimals(((bill*(tip/100)+bill))/person);
    }
    tipAmountPerPerson.textContent=tipAmount;
    totalPerPerson.textContent=total;
}
function resetCalculate(){
    tipAmountPerPerson.textContent="0.00";
    totalPerPerson.textContent="0.00";
    billField.value="";
    tipField.value="";
    personField.value=""
    tipButtons.forEach(e=>{
        e.classList.remove("active")
    })
    alerts.forEach(e=>{
        e.style.opacity=0;
    })
    resetBtn.disabled=true;
    inputs.forEach(item=>{
        item.classList.remove("invalid")
    })
}

// the function to return number with 2 desimal number
function withTwoDesimals(number){
    return number.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
}