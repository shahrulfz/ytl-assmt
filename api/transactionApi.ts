export const processTransaction = async (amount: number) => {
    // Simulate a delay and transaction processing
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (amount <= 0) {
          reject('Invalid transaction amount');
        } else {
          resolve('Transaction successful');
        }
      }, 1000);
    });
  };
  