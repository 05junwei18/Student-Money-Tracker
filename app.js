const express = require('express');
const app = express();
const port = 3000;

// Setup EJS as the view engine
app.set('view engine', 'ejs');
// Middleware to process form data
app.use(express.urlencoded({ extended: true }));

// Data storage (in-memory)
let transactions = [];

// Route: Home Page
app.get('/', (req, res) => {
    let totalIncome = 0;
    let totalExpense = 0;
    let totalOverall = 0;

    // Calculate totals based on transaction type
    for (let i = 0; i < transactions.length; i++) {
        let t = transactions[i];
        if (t.type === 'income') {
            totalIncome += t.amount;
        } else if (t.type === 'expense') {
            totalExpense += t.amount;
        }
    }

    res.render('index', { 
        transactions: transactions, 
        totalIncome: totalIncome.toFixed(2), 
        totalExpense: totalExpense.toFixed(2) 
    });
});

// Route: Add Transaction
app.post('/addTransaction', (req, res) => {
    const newTransaction = {
        id: Date.now().toString(),
        type: req.body.type,
        description: req.body.description,
        amount: parseFloat(req.body.amount),
        date: req.body.date
    };
    transactions.push(newTransaction);
    res.redirect('/');
});

// Route: Delete Transaction
app.post('/deleteTransaction/:id', (req, res) => {
    const idToDelete = req.params.id;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id === idToDelete) {
            transactions.splice(i, 1);
            break;
        }
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});