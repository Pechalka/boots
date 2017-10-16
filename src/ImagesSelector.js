import React, { Component } from 'react';

import './ImagesSelector.css';

const ImagesSelector = ({
  open,
  images,
  onSelect
}) => {
	const css = `ImagesSelector ${open ? 'ImagesSelector--open' : ''}`; 
	return (
	  <div className={css}>
	  	<div className='ImagesSelector__backdrop'>
	  	</div>
	  	<div className='ImagesSelector__content'>
		    {images.map(image => (
		      <img
		        src={image}
		        width={100}
		        onClick={() => onSelect(image)}
		      />
		    ))}
	    </div>
	  </div>
	);
}

export default ImagesSelector;