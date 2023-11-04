import './Community.scss';
import Layout from '../../common/layout/Layout';
import { TfiWrite } from 'react-icons/tfi';
import { RxReset } from 'react-icons/rx';
import { useRef, useState, useEffect } from 'react';

function Comunity() {
	const getLocalData = () => {
		const data = localStorage.getItem('posts');
		if (data) return JSON.parse(data);
		else return [];
	};
	const refInput = useRef(null);
	const refTextarea = useRef(null);
	const [Posts, setPosts] = useState(getLocalData());
	console.log(Posts);

	const resetPost = () => {
		refInput.current.value = '';
		refTextarea.current.value = '';
	};

	const createPost = () => {
		if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요.');
		}

		//현재 전세계 표준 시간값에서 getTime()을 호출하면 표준 시간값을 밀리세컨드단위의 숫자값으로 반환
		//표준시값에 한국시간에 9시간 빠르므로 9시간에 대한 밀리세컨드값을 더해줌 (korTime)
		//korTime : 한국시간대를 밀리세컨드로 반환한값
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;

		//new Date(한국밀리세컨드시간값) --> 한국 시간값을 기준으로해서 시간객체값 반환

		setPosts([
			{ title: refInput.current.value, content: refTextarea.current.value, date: new Date(korTime) },
			...Posts,
		]);
		resetPost();
	};

	const deletePost = (delIndex) => {
		setPosts(Posts.filter((_, idx) => delIndex !== idx));
	};

	useEffect(() => {
		localStorage.setItem('posts', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<input type='text' placeholder='Write Title' ref={refInput} />
					<textarea cols='30' rows='5' placeholder='Write Content Message' ref={refTextarea}></textarea>

					<nav>
						<button onClick={resetPost}>
							<RxReset fontSize={20} color={'#555'} />
						</button>
						<button onClick={createPost}>
							<TfiWrite fontSize={20} color={'#555'} />
						</button>
					</nav>
				</div>

				<div className='showBox'>
					{Posts.map((post, idx) => (
						<article key={idx}>
							<div className='txt'>
								<h2>{post.title}</h2>
								<p>{post.content}</p>
								<span>{post.date.split('T')[0].split('-').join('.')} </span>
							</div>
							<nav>
								<button>Edit</button>
								<button onClick={() => deletePost(idx)}>Delete</button>
							</nav>
						</article>
					))}
				</div>
			</div>
		</Layout>
	);
}

export default Comunity;

/*
	Create (글작성) "POST"
	Read (글 불러오기) "GET"
	Update (글 수정) "PUT"
	Delete (글 삭제) "DELETE"

	RESTful API : DB의 구조적으로 변경하기위한 개발 방법론

	로컬저장소: LocalStorage
	- 모든 브라우저가 내장하고 있는 경량의 저장공간
	- 문자값만 저장가능 (5MB)
	- 객체값을 문자화시켜서 저장
	- 로컬저장소 값을 불러올때는 반대로 문자형태를 JSON형태로 객체로 parsing해서 가져옴

	localStorage 메서드
	localStorage.setItem('키',문자화된 데이터) :로컬저장소에 데이터 저장
	localStorage.getItem('키') : 해당 데이터는 문자값으로 리턴되기 때문에 다시 객체형태로 parsing처리 필요
*/
