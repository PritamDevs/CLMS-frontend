
import React, { useState, useEffect } from "react";
import axios from "axios";
import Librarian_nav from "../component/Librarian_nav";
import { BACKEND_URL } from "../config";

export default function LibrarianBookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    publisher: "",
    publishedyear: "",
    price: "",
    stock: "",
    isbn: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/book/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(response.data.books || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setMessage("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ✅ Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm)
  );

  // ✅ Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Open modal for Add or Edit
  const openModal = (book = null) => {
    if (book) {
      setSelectedBook(book);
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        description: book.description,
        publisher: book.publisher,
        publishedyear: book.publishedyear,
        price: book.price,
        stock: book.stock,
        isbn: book.isbn,
      });
    } else {
      setSelectedBook(null);
      setFormData({
        title: "",
        author: "",
        category: "",
        description: "",
        publisher: "",
        publishedyear: "",
        price: "",
        stock: "",
        isbn: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  // ✅ Add or Update Book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedBook) {
        // Update book
        await axios.put(
          `${BACKEND_URL}/api/book/update/${selectedBook._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Book updated successfully!");
      } else {
        // Create book
        await axios.post(
          `${BACKEND_URL}/api/book/create`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("New book added successfully!");
      }
      fetchBooks();
      closeModal();
    } catch (error) {
      console.error("Error saving book:", error);
      setMessage(error.response?.data?.message || "Operation failed");
    }
  };

  // ✅ Delete book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://${BACKEND_URL}/api/book/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      setMessage(error.response?.data?.message || "Delete failed");
    }
  };

  return (
  <div className="flex">
    <Librarian_nav/>
    <div className="flex-1 relative min-h-screen bg-gray-100 p-6 font-sans ml-64">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-teal-700">
            📚 Librarian Book Management
          </h1>
          <p className="text-gray-600 mt-2">
            Search, add, update, or delete books from the library
          </p>
        </div>

        {/* Search + Add Book */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by title, author, or genre..."
            className="w-full sm:w-2/3 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            onClick={() => openModal()}
            className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition"
          >
            ➕ Add New Book
          </button>
        </div>

        {/* Book Grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading books...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition relative"
                >
                  <h2 className="text-lg font-semibold text-teal-800">
                    {book.title}
                  </h2>
                  <p className="text-gray-700 mt-1">👤 {book.author}</p>
                  <p className="text-gray-600">📚 {book.category}</p>
                  <p
                    className={`mt-2 font-medium ${
                      book.stock > 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {book.stock > 0 ? "Available" : "Out of Stock"}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => openModal(book)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                    >
                      ✏️ Update
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No books match your search.
              </p>
            )}
          </div>
        )}

        {/* Success/Error Message */}
        {message && (
          <div className="text-center mt-6 text-sm text-green-600 font-medium">
            {message}
          </div>
        )}

        {/* Modal for Add/Edit Book */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-teal-700">
                {selectedBook ? "✏️ Update Book" : "➕ Add New Book"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="author"
                  placeholder="Author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="publisher"
                  placeholder="Publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  name="publishedyear"
                  placeholder="Published Year"
                  value={formData.publishedyear}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="isbn"
                  placeholder="ISBN"
                  value={formData.isbn}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  >
                    {selectedBook ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}
