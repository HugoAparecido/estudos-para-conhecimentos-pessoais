function Logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        FindTransactions(user)
    }
})
function NewTransaction() {
    window.location.href = "./transactions.html";
}
function FindTransactions(user) {
    ShowLoading();
    firebase.firestore()
        .collection('transactions')
        .where('user.uid', '==', user.uid)
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            HideLoading();
            const transactions = snapshot.docs.map(doc => doc.data());
            AddTransactionsToScreen(transactions);
        }).catch(error => {
            HideLoading();
            console.log(error);
            alert('Erro ao recuperar transações');
        })
}
function AddTransactionsToScreen(transactions) {
    const orderedList = document.getElementById('transactions');
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        const date = document.createElement('p');
        date.innerHTML = FormatData(transaction.date);
        li.appendChild(date);
        const money = document.createElement('p');
        money.innerHTML = FormatMoney(transaction.money);
        li.appendChild(money);
        const type = document.createElement('p');
        type.innerHTML = transaction.transactionType;
        li.appendChild(type);
        if (transaction.description) {
            const description = document.createElement('p');
            description.innerHTML = transaction.description;
            li.appendChild(description);
        }
        orderedList.appendChild(li);
    });
}
function FormatData(date) {
    return new Date(date).toLocaleDateString('pt-br');
}
function FormatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`
}