import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

import 'swiper/css';
import 'swiper/css/navigation';
import AddBookForm from "./components/books/bookForm/AddBookForm.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BooksList from "./components/books/BooksList.jsx";
import NotFound from "./components/notFound/NotFound.jsx";
import Main from "./components/main/Main.jsx";
import Book from "./components/books/Book.jsx";
import Login from "./components/login/Login.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import AuthorsList from "./components/authors/AuthorsList.jsx";
import Author from "./components/authors/Author.jsx";
import AddAuthorForm from "./components/authors/authorForm/AddAuthorForm.jsx";
import ChangeBookForm from "./components/books/bookForm/ChangeBookForm.jsx";
import ChangeAuthorForm from "./components/authors/authorForm/ChangeAuthorForm.jsx";
import TodoList from "./components/todoList/TodoList.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
        <Header title="The library. Enjoy" />
        <div className="mainContainer">
            <div className="cardsContainer">
                {/*<TodoList />*/}
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/login" element={<Login />} />

                        <Route
                            path="/books"
                            element={
                                <ProtectedRoute>
                                    <BooksList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/authors"
                            element={
                                <ProtectedRoute>
                                    <AuthorsList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/books/add"
                            element={
                                <ProtectedRoute>
                                    <AddBookForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/books/update/:id"
                            element={
                                <ProtectedRoute>
                                    <ChangeBookForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/books/:id"
                            element={
                                <ProtectedRoute>
                                    <Book />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/authors/add"
                            element={
                                <ProtectedRoute>
                                    <AddAuthorForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/authors/update/:id"
                            element={
                                <ProtectedRoute>
                                    <ChangeAuthorForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/authors/:id"
                            element={
                                <ProtectedRoute>
                                    <Author />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
            </div>
        </div>
        <Footer content="Made by Mykyta" />
        </Router>
    </StrictMode>
);
