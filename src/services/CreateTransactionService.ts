import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  // id: string;
   income: number;
   outcome: number;
   total: number;
 }

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    // Check type of transaction
    if ( type != 'income' && type != 'outcome'){
      throw new Error('Wrong type of transaction!');
    }
    
    // Check total available in acount
    if (type == 'outcome'){
      const balance = this.transactionsRepository.getBalance();
      if ( value > balance.total ){
        throw new Error('Insufficient funds!');
      }
    }

    // Create transaction
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
