import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect } from 'react';
import { useFetch } from '../../../hooks/useFetch';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const fetchData = useFetch();
	//console.log(Pics);

	useEffect(() => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = '2a1a0aebb34012a99c23e13b49175343';
		const method_interest = 'flickr.interestingness.getList';
		const num = 40;
		const url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		fetchData(url, setPics);
	}, []);

	return (
		<Layout title={'Gallery'}>
			<p>갤러리 상세페이지</p>
		</Layout>
	);
}
