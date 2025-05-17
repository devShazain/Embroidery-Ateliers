import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../../utils/api';

const ProductForm = ({ product, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category: 'Unstitched',
        color: '',
        fabric_details: '',
        care_instructions: '',
        additional_images: [''],
        in_stock: true
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // If editing an existing product, populate the form
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                image_url: product.image_url || '',
                category: product.category || 'Unstitched',
                color: product.color || '',
                fabric_details: product.fabric_details || '',
                care_instructions: product.care_instructions || '',
                additional_images: product.additional_images?.length
                    ? product.additional_images
                    : [''],
                in_stock: product.in_stock !== undefined ? product.in_stock : true
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAdditionalImageChange = (index, value) => {
        const updatedImages = [...formData.additional_images];
        updatedImages[index] = value;
        setFormData(prev => ({
            ...prev,
            additional_images: updatedImages
        }));
    };

    const addImageField = () => {
        setFormData(prev => ({
            ...prev,
            additional_images: [...prev.additional_images, '']
        }));
    };

    const removeImageField = (index) => {
        const updatedImages = [...formData.additional_images];
        updatedImages.splice(index, 1);
        setFormData(prev => ({
            ...prev,
            additional_images: updatedImages.length ? updatedImages : ['']
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Format the data for API
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                // Filter out empty additional image URLs
                additional_images: formData.additional_images.filter(url => url.trim() !== '')
            };

            if (product) {
                // Update existing product
                await updateProduct(product.id, productData);
            } else {
                // Create new product
                await createProduct(productData);
            }

            onSubmit();
        } catch (err) {
            console.error('Error saving product:', err);
            setError('Failed to save product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">
                {product ? 'Edit Product' : 'Add New Product'}
            </h2>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Product Name*
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Price (Rs.)*
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Category*
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="Unstitched">Unstitched</option>
                            <option value="Ready to Wear">Ready to Wear</option>
                            <option value="Bridal">Bridal</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Color
                        </label>
                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">
                            Main Image URL*
                        </label>
                        <input
                            type="url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">
                            Description*
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">
                            Fabric Details
                        </label>
                        <textarea
                            name="fabric_details"
                            value={formData.fabric_details}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            rows="2"
                        ></textarea>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">
                            Care Instructions
                        </label>
                        <textarea
                            name="care_instructions"
                            value={formData.care_instructions}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            rows="2"
                        ></textarea>
                    </div>

                    <div className="md:col-span-2">
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium">
                                Additional Images
                            </label>
                            <button
                                type="button"
                                onClick={addImageField}
                                className="text-primary hover:text-primary-dark text-sm"
                            >
                                + Add Another Image
                            </button>
                        </div>

                        {formData.additional_images.map((url, index) => (
                            <div key={index} className="flex mb-2">
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => handleAdditionalImageChange(index, e.target.value)}
                                    className="w-full p-2 border rounded mr-2"
                                    placeholder="Image URL"
                                />
                                {formData.additional_images.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeImageField(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="in_stock"
                                id="in_stock"
                                checked={formData.in_stock}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="in_stock" className="text-sm font-medium">
                                In Stock
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;