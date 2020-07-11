import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    if (type.toLowerCase() === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      const valueIsValid = balance.total - value;

      if (valueIsValid < 0) {
        throw Error('Not enough balance to make the transaction');
      }
    }

    const transaction = this.transactionsRepository.create(title, value, type);

    return transaction;
  }
}

export default CreateTransactionService;
