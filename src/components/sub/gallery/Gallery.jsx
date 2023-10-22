import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { useState, useEffect, useRef } from 'react';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const refElBtnSet = useRef(null);
	const myID = '197119297@N02';

	const fetchFlickr = async (opt) => {
		console.log('fetching again...');
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = process.env.REACT_APP_FLICKR_KEY;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const num = 40;
		let url = '';
		const url_interest = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		const url_user = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.id}`;

		opt.type === 'user' && (url = url_user);
		opt.type === 'interest' && (url = url_interest);

		const data = await fetch(url);
		const json = await data.json();
		setPics(json.photos.photo);
	};

	const activateBtn = (e) => {
		const btns = refElBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');
	};

	const handleClickInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};

	const handleClickMine = (e) => {
		if (e.target.classList.contains('on')) return;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID });
	};

	useEffect(() => {
		fetchFlickr({ type: 'user', id: myID });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<article className='controls'>
				<nav className='btnSet' ref={refElBtnSet}>
					<button onClick={handleClickInterest}>Interest Gallery</button>
					<button className='on' onClick={handleClickMine}>
						My Gallery
					</button>
				</nav>
			</article>

			<div className='frame'>
				<Masonry
					elementType={'div'}
					options={{ transitionDuration: '0.5s' }}
					disableImagesLoaded={false}
					updateOnEachImageLoad={false}
				>
					{Pics.map((pic, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img
											src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`}
											alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
										/>
									</div>
									<h2>{pic.title}</h2>

									<div className='profile'>
										<img
											src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
											alt={pic.owner}
											onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
										/>
										<span onClick={(e) => fetchFlickr({ type: 'user', id: e.target.innerText })}>{pic.owner}</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}
