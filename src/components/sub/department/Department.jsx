import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';
import './Department.scss';
import { useFecth } from '../../../hooks/useFecth';

const path = process.env.PUBLIC_URL;

export default function Department() {
	const [Title, setTitle] = useState('');
	const [Department, setDepartment] = useState([]);
	const fetchData = useFecth();

	useEffect(() => {
		fetchData(`${path}/DB/department.json`, setDepartment, setTitle);
	}, []);

	return (
		<Layout title={'Department'}>
			<section id='historyBox'>
				{/* <h2>Histroy</h2>
				<article>
					<h3>2016</h3>
					<ul>
						<li>This company was established.</li>
						<li>Launch First Prototype Project</li>
					</ul>
				</article> */}
			</section>

			<section id='memberBox'>
				<h2>{Title.charAt(0).toUpperCase() + Title.slice(1)}</h2>

				{Department.map((member, idx) => {
					return (
						<article key={idx}>
							<div className='pic'>
								<img
									src={`${path}/img/${member.pic}`}
									alt={member.name}
								/>
							</div>
							<h3>{member.name}</h3>
							<p>{member.position}</p>
						</article>
					);
				})}
			</section>
		</Layout>
	);
}
