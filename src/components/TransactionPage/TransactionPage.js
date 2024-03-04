import React, {useState} from 'react';
import PinnedSubheaderList from "./SubHeaderList/PinnedSubheaderList";
import OutlinedCard from "./OutlinedCard/OutlinedCard";

const TransactionPage = () => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleTransactionClick = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handleCloseCard = () => {
        setSelectedTransaction(null);
    };

    return (
        <div>
            {!selectedTransaction && <PinnedSubheaderList onTransactionClick={handleTransactionClick} />}
            {selectedTransaction && (
                <>
                    <PinnedSubheaderList onTransactionClick={handleTransactionClick} />
                    <OutlinedCard transaction={selectedTransaction} onClose={handleCloseCard} />
                </>
            )}
        </div>
    );
};

export default TransactionPage;