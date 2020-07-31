import React from 'react';

export default function Categories({category}){

    return(
        <div>
            <div className="category mb-3 mt-3">
                {category.name}
                <span className="float-right"> <i className='fas fa-search'></i> </span>
            </div>            
        </div>
    );

};