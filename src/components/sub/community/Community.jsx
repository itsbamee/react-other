import './Community.scss';
import Layout from '../../common/layout/Layout';
import { TfiWrite } from 'react-icons/tfi';
import { RxReset } from 'react-icons/rx';
import { useRef, useState } from 'react';

function Comunity() {
	const refInput = useRef(null);
	const refTextarea = useRef(null);
	const [Posts, setPosts] = useState([]);
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
		setPosts([{ title: refInput.current.value, content: refTextarea.current.value }, ...Posts]);
		resetPost();
	};

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
							<h2>{post.title}</h2>
							<p>{post.content}</p>
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
*/
