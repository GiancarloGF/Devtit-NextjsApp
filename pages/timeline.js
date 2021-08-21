import Link from 'next/link';
import Layout from '../components/Layout';

export default function Timeline ({ name }) {
	return (
		<>
			<Layout>
				<h1>This is the timeline of {name}</h1>
				<Link href='/'>
					<a>
            Go home
					</a>
				</Link>
			</Layout>
			<style jsx>{`
        h1 {
          font-size: 36px;
          color: red;
        }
      `}</style>
		</>
	);
}

//To fetch data that will be inyected to the page through props.
Timeline.getInitialProps = () => {
	return fetch('http://localhost:3000/api/hello')
		.then(res => res.json());
      
};