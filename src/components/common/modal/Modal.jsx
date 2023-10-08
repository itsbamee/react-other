import './Modal.scss';
import { useEffect, useState } from 'react';

export default function Modal() {
	const [Num, setNum] = useState(0);

	useEffect(() => {
		console.log('컴포넌트 마운트시 한번만 호출');
		document.body.style.overflow = 'hidden';

		return () => {
			console.log('컴포넌트 언마운트시 호출');
			document.body.style.overflow = 'auto';
		};
	}, []);

	useEffect(() => {
		console.log('Num State변경될떄마다 호출');
	}, [Num]);

	return (
		<aside className='modal'>
			<button onClick={() => setNum(Num - 1)}>minus</button>
			<button onClick={() => setNum(Num + 1)}>plus</button>

			<h1>{Num}</h1>
		</aside>
	);
}
/*
  useEffect
  - 특정 컴포넌트의 생명주기마다 특정 이벤트를 발생시켜야될때
  - 컴포넌트의 생성 (Mount)
  -- useEffect의 의존성배열을 비운상태에서 함수호출
  -실사례1 : 팝업생성시 스크롤바 제거
  -실사례2 : DOM이아닌 window같이 BOM객체에 이벤트 연결해야 될떄
  -실사례3 : 무거운 서버사이드 데이터를 fetching 처리할때

  - 컴포넌트의 변경 (State Changed)
  -- useEffect의 의존성배열에 특정 State를 등록한 상태에서 함수호출
  -실사례1 : 특정 이벤트 발생시마다 서로 다른 서버데이터를 가져오면서 로딩바를 보여줘야 될때

  - 컴포넌트의 소멸 (UnMount)
  -- useEffect의 의존성배열을 비운상태에서 함수를 리턴
  -실사례1 : 팝업제거시 스크롤바 다시 생성
  -실사례2 : 윈도우 전역객체에 이벤트를 제거해야 될떄

  React의 스크립트 파일은 2가지의 종류
  - component
  --- JSX리턴

  - hook
  --- 자주쓰는 특정 값이나 함수를 리턴

  - custom hook
  --- 사용자 목적에 맞게 모든 컴포넌트가 재활용할 수 있는 기능 모음

  - hook의 필수조건
  -- 함수이름이 무조건 use키워드로 시작
  -- hook안에서는 다른 hook을 내부에서 호출불가
  -- 핸들러함수 안쪽에서도 hook을 호출 불가
  -- 컴포넌트함수 루트경로에서만 호출 가능

*/
