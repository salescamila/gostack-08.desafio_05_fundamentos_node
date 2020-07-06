import Transaction from '../models/Transaction';

interface Balance {
 // id: string;
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income : number = 0;
    let outcome: number = 0;
    let total  : number = 0;

    this.transactions.map(transaction => {
      if (transaction.type == 'income') {
        income += transaction.value;
      } 
      if (transaction.type == 'outcome') {
        outcome += transaction.value;
      } 
    })

    total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
