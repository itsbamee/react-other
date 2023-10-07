import Layout from '../../common/layout/Layout';

export default function Department() {
	return (
		<Layout title={'Department'}>
			<p>멤버소개 상세페이지</p>
		</Layout>
	);
}

/*
	리액트의 대표적인 hook 3대장
	useState
	- 화면렌더링을 담당하는 중요 데이터를 관리해주는 그릇
	- 화면의 모든 변경사항은 State에 담아서 관리 및 렌더링
	- state값이 변경되면 리액트는 무조건 컴포넌트를 재호출해서 화면을 다시 랜더링

	useEffect
	- 컴포넌트의 생명주기 관리 (Life Cycle)
	- 컴포넌트의 생성 (Mount)
	- 컴포넌트의 변경 (State Change)
	- 컴포넌트의 소멸 (UnMount)
	- 컴포넌트의 생성 변경, 소멸시 특정 이벤트 호출해야될때 주로 사용

	useRef
	- 컴포넌트가 재호출되더라도 사라지면 안되는 값을 담는 그릇
	- 메모리상에만 존재하는 최신 가상돔을 선택해야될때 담는 용도
*/
