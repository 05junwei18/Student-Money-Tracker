const express = require('express');
const app = express();
const port = 3000;
let books = [
{ id: 1, title: 'Book A', author: 'Peter Tan' },
{ id: 2, title: 'Book B', author: 'Mary Lee' },
{ id: 3, title: 'Book C', author: 'Sam Ho' }
];
app.get('/books', (req, res) => {
let list = '';
for (let i = 0; i < books.length; i++) {
list +=
`<li>
${books[i].title} (Author: ${books[i].author})
</li>`;
}
res.send(`<h1>Book List</h1><ul>${list}</ul>`);
});
app.listen(port, () => {
console.log(`Server is running at http://localhost:${port}`);
});