import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { useState, useEffect, useRef } from 'react';
import { LuSearch } from 'react-icons/lu';
import Modal from '../../common/modal/Modal';
import { useFlickrQuery } from '../../../hooks/useFlickrQuery';

export default function Gallery() {
	const myID = '197119297@N02';
	const [Opt, setOpt] = useState({ type: 'user', id: myID });
	const { isSuccess, data: Pics } = useFlickrQuery(Opt);
	let [IsUser, setIsUser] = useState(myID);
	let [CurrentType, setCurrentType] = useState('mine');
	let [IsOpen, setIsOpen] = useState(false);
	const [Index, setIndex] = useState(0);
	const refElBtnSet = useRef(null);
	const refElInput = useRef(null);

	const activateBtn = (e) => {
		const btns = refElBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		if (e.target.nodeName === 'BUTTON') e.target.classList.add('on');
	};

	const handleClickInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		setIsUser('');
		activateBtn(e);
		setOpt({ type: 'interest' });
		setCurrentType('interest');
	};

	const handleClickMine = (e) => {
		//마이갤러리 함수 호출시에는 IsUser의 문자값이 담겨있더라도 내아이디값이랑 똑같지 않으면 핸들러 호출함
		//다른 사용자 갤러리를 갔다가 My Gallery 함수 호출시 이미 IsUser값이 담겨있기 때문에 해당 함수가 호출되지 않는 문제 해결위함
		if (e.target.classList.contains('on') || IsUser === myID) return;
		setIsUser(myID);
		activateBtn(e);
		setOpt({ type: 'user', id: myID });
		setCurrentType('mine');
	};

	const handleClickUser = (e) => {
		//IsUser값이 있기만 하면 핸들러함수 호출 중지
		if (IsUser) return;
		setIsUser(e.target.innerText);
		activateBtn(e);
		setOpt({ type: 'user', id: e.target.innerText });
		setCurrentType('user');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const tags = refElInput.current.value;
		refElInput.current.value = '';
		if (!tags.trim()) return;
		setIsUser('');
		activateBtn(e);
		setOpt({ type: 'search', keyword: tags });
		setCurrentType('search');
	};

	const handleModal = (idx) => {
		//Modal안의 컨텐츠를 출력하기 위한 State
		setIsOpen(true);
		//클릭한 썸네일의 순번값을 전달하기 위한 State
		setIndex(idx);
	};

	return (
		<>
			<Layout title={'Gallery'}>
				<article className='controls'>
					<nav className='btnSet' ref={refElBtnSet}>
						<button onClick={handleClickInterest}>Interest Gallery</button>
						<button className='on' onClick={handleClickMine}>
							My Gallery
						</button>
					</nav>

					<form onSubmit={handleSubmit}>
						<input type='text' placeholder='Search' ref={refElInput} />
						<button className='btnSearch'>
							<LuSearch fontSize={20} color={'#bbb'} />
						</button>
					</form>
				</article>

				<div className='frame'>
					<Masonry
						elementType={'div'}
						options={{ transitionDuration: '0.5s' }}
						disableImagesLoaded={false}
						updateOnEachImageLoad={false}
					>
						{isSuccess &&
							Pics.map((pic, idx) => {
								return (
									<article key={idx}>
										<div className='inner'>
											<div className='pic' onClick={() => handleModal(idx)}>
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
													onError={(e) =>
														e.target.setAttribute(
															'src',
															'https://www.flickr.com/images/buddyicon.gif'
														)
													}
												/>
												<span onClick={handleClickUser}>{pic.owner}</span>
											</div>
										</div>
									</article>
								);
							})}
					</Masonry>
				</div>
			</Layout>

			<Modal IsOpen={IsOpen} setIsOpen={setIsOpen}>
				{isSuccess && Pics[Index] && (
					<img
						src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
						alt='pic'
					/>
				)}
			</Modal>
		</>
	);
}
