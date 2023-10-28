import './Modal.scss';
import { useEffect, useState } from 'react';

export default function Modal({ IsOpen, setIsOpen }) {
	return (
		<>
			{IsOpen && (
				<aside className='modal'>
					<div className='con'></div>
					<span>close</span>
				</aside>
			)}
		</>
	);
}
