import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../../utils/api';
import ProductForm from './ProductForm';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await fetchProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError('Failed to load products. Please try again.');
            console.error('Error loading products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            await deleteProduct(id);
            setProducts(products.filter(product => product.id !== id));
        } catch (err) {
            console.error('Error deleting product:', err);
            alert('Failed to delete product. Please try again.');
        }
    };

    const handleFormSubmit = () => {
        setShowForm(false);
        loadProducts();
    };

    const handleFormCancel = () => {
        setShowForm(false);
    };

    if (loading) return <div className="text-center py-10">Loading products...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div>
            {showForm ? (
                <ProductForm
                    product={editingProduct}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Manage Products</h2>
                        <button
                            onClick={handleAddNew}
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                        >
                            Add New Product
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 border text-left">ID</th>
                                    <th className="py-2 px-4 border text-left">Image</th>
                                    <th className="py-2 px-4 border text-left">Name</th>
                                    <th className="py-2 px-4 border text-left">Category</th>
                                    <th className="py-2 px-4 border text-left">Price</th>
                                    <th className="py-2 px-4 border text-left">In Stock</th>
                                    <th className="py-2 px-4 border text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border">{product.id}</td>
                                        <td className="py-2 px-4 border">
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border">{product.name}</td>
                                        <td className="py-2 px-4 border">{product.category}</td>
                                        <td className="py-2 px-4 border">Rs. {product.price.toLocaleString()}</td>
                                        <td className="py-2 px-4 border">
                                            <span className={`px-2 py-1 rounded text-xs ${product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {product.in_stock ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminProducts;