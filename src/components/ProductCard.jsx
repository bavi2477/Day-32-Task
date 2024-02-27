import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveAllBlogs, increaseCart, decreaseCart, removeCart } from '../features/Slice';


const ProductCard = ({data}) => {
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blogs)

    useEffect(() => {
        dispatch(saveAllBlogs(data));
    }, [dispatch, data])

    const handleIncrease = (id, quantity) => {
        if (quantity < 10) {
            dispatch(increaseCart({ id }))
        }
    }

    const handleDecrease = (id, quantity) => {
        if (quantity > 1) {
            dispatch(decreaseCart({ id }));
        }
    };

    const handleDelete = (id) => {
        dispatch(removeCart({ id }))
    }

    const totalQuantity = useSelector((state) =>
    state.blogs.reduce((total, product) => total + (product.quantity || 1), 0)
);

const totalAmount = useSelector((state) =>
    state.blogs.reduce((total, product) => total + product.price * (product.quantity || 1), 0)
);
    return (
        <div className="container">
            <div className="bg-dark text-white py-3 "> 
                <div className="row justify-content-center"> 
                    <div className="col-md-8 text-center"> 
                        <p className="fs-1 fw-bold mb-0">Total Quantity: {totalQuantity}</p>
                        <p className="fs-4 fw-light mt-2">Total Amount: ${totalAmount}</p> 
                    </div>
                </div>
            </div>    
            <div className="row pt-5 ">
                {blog.map(product => (
                    <div key={product.id} className="col-md-6 mb-3">
                        <div className="card h-100 card-shadow">
                            <div id={`carousel-${product.id}`} className="carousel slide" data-bs-ride="carousel" style={{ height: "400px" }}>
                                <div className="carousel-inner" style={{ height: "400px" }}>
                                    {product.images.map((image, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} style={{ height: "400px" }}>
                                            <img src={image} className="d-block w-100" alt={`Slide ${index}`} style={{ objectFit: "cover", height: "400px" }} />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${product.id}`} data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${product.id}`} data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">Price: ${product.price}</p>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Quantity</span>
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => handleDecrease(product.id, product.quantity || 1)}>-</button>
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => handleIncrease(product.id, product.quantity || 1)}>+</button>
                                </div>
                                <div className='text-center'>
                                <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(product.id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCard;