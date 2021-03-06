import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import ProductCard from './components/ProductCard';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';
import './styles.scss';


const Catalog = () => {

    const [productResponse, setProductResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    console.log(productResponse);

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 12
        }

        setIsLoading(true);
        makeRequest({ url: '/products', params })
          .then(response => setProductResponse(response.data))
          .finally(() => {
              setIsLoading(false);
          })
    }, [activePage])

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálago de produtos
            </h1>
                <div className="catalog-products">
                    {isLoading ? <ProductCardLoader /> : (
                        productResponse?.content.map(product => (
                            <Link to={`/products/${product.id}`}>
                                <ProductCard product={product}/>
                            </Link>
                        ))
                    )}  
                </div>
                {productResponse && (
                    <Pagination 
                        totalPages={productResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />
                )}
        </div> 
        
    )
};

export default Catalog;