const books = [
    {
        id: '1',
        name: 'Book 1',
        description: 'Lorem Ipsum, Lorem Ipsum dolor sit amet, consectet',
        authors: ['1']
    },
    {
        id: '2',
        name: 'Book 2',
        description: 'Lorem Ipsum, Lorem Ipsum dolor sit amet, consectet',
        authors: ['1']
    },
    {
        id: '3',
        name: 'Book 3',
        description: 'Lorem Ipsum, Lorem Ipsum dolor sit amet, consectet',
        authors: ['3']
    },
    {
        id: '4',
        name: 'Book 4',
        description: 'Lorem Ipsum, Lorem Ipsum dolor sit amet, consectet',
        authors: ['4']
    },
]


const authors = [
    {
        id: '1',
        name: 'Author 1',
        description: 'Lorem Ipsum, Lorem Ipsum dolor sit amet, consectet',
        books: ['1', '2']
    },
    {
        id: '2',
        name: 'Author 2',
        description: 'Lorem Ipsum, Lorem Ipsum dolor sit amet, consectet',
        books: []
    },
    {
        id: '3',
        name: 'Author 3',
        description: 'Lorem Ipsum, Lorem Ipsum dolor sit amet, consectet',
        books: ['3']
    },
    {
        id: '4',
        name: 'Author 4',
        description: 'Lorem Ipsum, Lorem Ipsum dolor sit amet, consectet',
        books: ['4']
    },
]


module.exports = {
    books,
    authors
}