let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE-HUNDRED', 100]
  ];
  
  let currencyValue = [
    ['PENNY', 0.01],
    ['NICKEL', 0.05],
    ['DIME', 0.1],
    ['QUARTER', 0.25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]
  ];
  
  let price;
  document.addEventListener("DOMContentLoaded",()=>{
  
  const cashInput = document.getElementById("cash");
  const purchaseBtn = document.getElementById("purchase-btn");
  const priceInput= document.getElementById("price");
  const resultDiv= document.getElementById("change-due");
  let cash = (cashInput.value||0);
  
  
  purchaseBtn.addEventListener("click",()=>{
    
   cash = cashInput.value;
  
    if (!priceInput.value) {
      alert("Please provide a price")
      return;
    }
    
    price = priceInput.value;
    
    
    resultDiv.className = '';
    
    let changeDue = cash - price;
    if (changeDue < 0) {
      alert("Customer does not have enough money to purchase the item")
      resultDiv.innerHTML = `<strong><img src="https://www.svgrepo.com/show/207565/error.svg" width="20px"> Status:  INSUFFICIENT_FUNDS</strong><br>(Customer provided less cash than the price)`;
      resultDiv.className ="status-insufficient-funds";
      return;
    }
  
    const totalCid = Math.round(cid.reduce((accumatator,item) => {return item[1]+accumatator},0) * 100) / 100; //math rounding error
    if (totalCid < changeDue) {
      resultDiv.innerHTML = `<strong><img src="https://www.svgrepo.com/show/207565/error.svg" width="20px"> Status:  INSUFFICIENT_FUNDS</strong><br>(Cash in drawer is less than change due)`;
      resultDiv.classList.add("status-insufficient-funds");
      return;
    }
  
    if (totalCid === changeDue) {
      resultDiv.innerHTML = `<strong><img src="https://www.svgrepo.com/show/179105/closed-sign.svg" width="30px"> Status: CLOSED</strong> <br>(Cash in drawer is equal to change due)`;
      resultDiv.classList.add("status-closed");
      const changeList = document.createElement("ul");
      cid.forEach((changeItem, index) => {
          if (changeItem[1] > 0) {
              const listItem = document.createElement("li");
              listItem.textContent = `${changeItem[0]}: $${parseFloat(changeItem[1].toFixed(2))}`;
              changeList.appendChild(listItem);
              // Updating the register table
              cid[index][1] = 0;
              const td = document.getElementById(changeItem[0]);
              td.classList.add('updated');
              td.textContent = "$0.00";
              setTimeout(() => td.classList.remove('updated'), 1000);
          }
      });
      resultDiv.appendChild(changeList);
      return;
    }
    
    
     if (changeDue === 0) {
      resultDiv.innerHTML= `<strong><img src="https://www.svgrepo.com/show/496405/money-change.svg" width="40px"> No change due - customer paid with exact cash</strong>`;
      resultDiv.classList.add("status-no-change");
      return;
    }
  
     let changeArray = [];
    console.log(totalCid);
    for(let i=currencyValue.length-1;i>=0;i--){
      let currencyName = currencyValue[i][0];
      let currencyVal = currencyValue[i][1];
      let currencyAmount = 0;
        while(changeDue>=currencyVal && currencyVal<=cid[i][1]){
            changeDue -= currencyVal;
            currencyAmount += 1;
            cid[i][1] -= currencyVal;
            cid[i][1] = Math.round(cid[i][1] * 100) / 100;
            const td = document.getElementById(cid[i][0]);
            td.classList.add('updated');
            changeDue = Math.round(changeDue * 100) / 100; //math rounding error
        }
      if (currencyAmount > 0) {
        const currencyReturned = currencyAmount * currencyVal;
          changeArray.push([currencyName, Math.round(currencyReturned * 100) / 100]);
      }
      if(changeDue ==0){
        break;
      }
    }
  
  
    if (changeDue > 0) {
        resultDiv.innerHTML = `<strong><img src="https://www.svgrepo.com/show/207565/error.svg" width="20px"> Status:  INSUFFICIENT_FUNDS</strong><br>(Cannot return exact change)`;
        resultDiv.classList.add("status-insufficient-funds");
        cid.forEach(item => document.getElementById(item[0]).classList.remove('updated'));
        return;
      }
  
       resultDiv.innerHTML = `<strong><img src="https://www.svgrepo.com/show/179107/open-sign.svg" width="45px"> Status: OPEN</strong><br>(Change returned)`;
       resultDiv.classList.add("status-open");
  
      const changeList = document.createElement("ul");
      for (let changeItem of changeArray) {
        const listItem = document.createElement("li");
        listItem.textContent = `${changeItem[0]}: $${changeItem[1].toFixed(2)}`;
        changeList.appendChild(listItem);
      }
      resultDiv.appendChild(changeList);
    
    
    cid.forEach((item)=>{
        console.log(item[0],item[1]);
      });
    
      cid.forEach((item)=>{
        const td = document.getElementById(item[0]);
        //td.classList.add('updated');
        td.textContent = "$" + parseFloat(item[1]).toFixed(2);
        setTimeout(() => td.classList.remove('updated'), 1000);
      });
      
  });
    
  document.addEventListener("keydown",(event)=>{
    if(event.key==="Enter"){
      purchaseBtn.click();
    }
  })
  
  
  })
  
  
  
  
  