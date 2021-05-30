import '../theme';
import getAllProducts from '../graphql/collection-starter-code';

import React from 'react';
import ReactDOM from 'react-dom';
import Collection from '../components/Collection';

// getAllProducts('test-collection') => returns a Promise, which resolves to an Array of Product Objects

// Your Code Here

const productData = async () => getAllProducts('test-collection');

ReactDOM.render(
    <Collection product={productData} />,
    document.getElementById('collection-react')
)
