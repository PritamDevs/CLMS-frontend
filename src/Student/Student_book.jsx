import React, { useState } from 'react';

const bookData = [
    {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        genre: "Computer Science",
        available: true,
    },
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        genre: "Software Engineering",
        available: false,
    },
    {
        title: "Design Patterns",
        author: "Erich Gamma",
        genre: "Programming",
        available: true,
    },
    {
        title: "Digital Logic Design",
        author: "M. Morris Mano",
        genre: "Electronics",
        available: true,
    },
];

export default function Student_book() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(bookData);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const results = bookData.filter(book =>
            book.title.toLowerCase().includes(term) ||
            book.author.toLowerCase().includes(term) ||
            book.genre.toLowerCase().includes(term)
        );
        setFilteredBooks(results);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 font-sans">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-indigo-700">📖 Available Books</h1>
                    <p className="text-gray-600 mt-2">Explore and borrow books from your college library</p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search by title, author, or genre..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Book Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
                                <h2 className="text-lg font-semibold text-indigo-800">{book.title}</h2>
                                <p className="text-gray-700 mt-1">👤 {book.author}</p>
                                <p className="text-gray-600">📚 {book.genre}</p>
                                <p className={`mt-2 font-medium ${book.available ? 'text-green-600' : 'text-red-500'}`}>
                                    {book.available ? 'Available' : 'Checked Out'}
                                </p>
                                <button
                                    disabled={!book.available}
                                    className={`mt-4 w-full py-2 rounded-lg font-medium ${
                                        book.available
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    {book.available ? 'Borrow' : 'Unavailable'}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">No books match your search.</p>
                    )}
                </div>
            </div>
        </div>
    );
}