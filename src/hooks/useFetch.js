export function useFetch() {
	return (url, setValue, setKey) => {
		fetch(url)
			.then((data) => data.json())
			.then((json) => {
				console.log(json);
				console.log(Object.values(json));
				let values = Object.values(json);
				if (values.length >= 2)
					values = values.filter((data) => {
						console.log(data);
						return Array.isArray(Object.values(data));
					});
				console.log(values);
				//let arr = Object.values(json).filter((data) => Array.isArray(data));

				//if (Array.isArray(arr)) arr = arr[0];

				//setValue(arr);
				//setKey && setKey(Object.keys(json)[0]);
			});
	};
}
