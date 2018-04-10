class Account {

  constructor(username){
    this.username = username;
    this.transactions = [];
  }

  addTransaction(transaction){
    this.transactions.push(transaction);
  }

  get balance (){
    let balance = 0;
    this.transactions.forEach((transaction) => {
      balance += transaction.value;
    })
    return balance;
  }
}

class Transaction {

  constructor(amount, account){
    this.amount = amount;
    this.account = account;
  }

  commit(){
    if(this.isAllowed()){
      this.account.addTransaction(this);
    }
  }
}

class Deposit extends Transaction {
  get value(){
    return this.amount;
  }

  isAllowed(){
    return true;
  }
}

class Withdrawal extends Transaction {
  get value(){
    return this.amount * -1;
  }

  isAllowed(){
    return (this.account.balance - this.amount >= 0)
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

t1 = new Withdrawal(50.25, myAccount);
t1.commit();


t2 = new Withdrawal(9.99, myAccount);
t2.commit();


t3 = new Deposit(120.00, myAccount);
t3.commit();


t4 = new Withdrawal(120.00, myAccount);
t4.commit();

console.log('Balance:', myAccount.balance);
console.log('Transactionss: ', myAccount.transactions);
