import axios from "axios";


class TransactionService {
    fetchTransactions = async (user, walletId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/transactions/user/${user.id}/wallet/${walletId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };



    groupTransactionsByDate = (transactions, currentMonthIndex, currentYear) => {
        const groupedTransactions = {};
        if (transactions.length === 0) {
            return [];
        }

        transactions.forEach(transaction => {
            const date = new Date(transaction.transactionDate);
            const transactionMonth = date.getMonth();
            const transactionYear = date.getFullYear();
            if (transactionMonth === currentMonthIndex && transactionYear === currentYear) {
                const dateString = date.toDateString();
                groupedTransactions[dateString] = groupedTransactions[dateString] || [];
                groupedTransactions[dateString].push(transaction);
            }
        });

        return Object.keys(groupedTransactions).map(dateString => ({
            date: new Date(dateString),
            transactions: groupedTransactions[dateString],
        })).sort((a, b) => b.date - a.date);
    };

    handlePrevNextMonths = (currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, increment) => {
        let newMonthIndex = currentMonthIndex + increment;
        let newYear = currentYear;

        if (newMonthIndex === -1) {
            newMonthIndex = 11; // December
            newYear--;
        } else if (newMonthIndex === 12) {
            newMonthIndex = 0; // January
            newYear++;
        }
        setCurrentMonthIndex(newMonthIndex);
        setCurrentYear(newYear);
    };
    handlePrevNextDays = (currentDate, setCurrentDate, increment) => {
        // Tạo một bản sao của ngày hiện tại để không làm thay đổi ngày gốc
        let newDate = new Date(currentDate.getTime());

        // Tăng/giảm số ngày
        newDate.setDate(newDate.getDate() + increment);

        // Cập nhật state với ngày mới
        setCurrentDate(newDate);
    };

    handleCurrentMonth = (setCurrentMonthIndex, setCurrentYear) => {
        setCurrentMonthIndex(new Date().getMonth());
        setCurrentYear(new Date().getFullYear());
    };

    calculateTotalInflow = (transactions) => {
        if (transactions.length === 0) {
            return [];
        }
        return transactions.reduce((total, transaction) => {
            if (transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT') {
                return total + transaction.amount;
            }
            return total;
        }, 0);
    };

    calculateTotalOutflow = (transactions) => {
        if (transactions.length === 0) {
            return [];
        }
        return transactions.reduce((total, transaction) => {
            if (transaction.category.type === 'EXPENSE' || transaction.category.type === 'LOAN') {
                return total + transaction.amount;
            }
            return total;
        }, 0);
    };
}

export default new TransactionService();