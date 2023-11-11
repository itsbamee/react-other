import { useRef, useEffect } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const { kakao } = window;
	const mapFrame = useRef(null);

	const mapOption = {
		center: new kakao.maps.LatLng(37.512759, 127.060858),
		level: 3,
	};
	const marker = new kakao.maps.Marker({
		position: mapOption.center,
	});

	useEffect(() => {
		const map = new kakao.maps.Map(mapFrame.current, mapOption);
		marker.setMap(map);
	}, []);

	return (
		<Layout title={'Contact us'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
