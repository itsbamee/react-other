export function useFetch() {
	return (url, setValue, setKey) => {
		fetch(url)
			.then((data) => data.json())
			.then((json) => {
				//json객체의 property가 여러개일떄 value값만 반복돌면 value의 값이 배열인것만 리턴
				let arr = Object.values(json).filter((data) => Array.isArray(data));
				//혹시 리턴된 배열안에 또 배열이 있다면 해당 값을 다시 뽑아냄
				if (Array.isArray(arr)) arr = arr[0];
				//배열값을 state변경함수로 등록
				setValue(arr);
				setKey && setKey(Object.keys(json)[0]);
			});
	};
}
