// import Layout from 'components/layout/index.js';
import Devit from 'components/Devit';
import { firestore } from 'firebase/admin';
import { useRouter } from 'next/router';

export default function DevitPage(props) {
	const router = useRouter();

	//.isFallback te dice si la pagina esta en modo fallback. Se muestra el loading hasta que se cree la pagina bajo demanda. (No se creo en build mode)
	if (router.isFallback) return <h1>Cargando...</h1>; 

	return (
		<>
			<Devit {...props} />
			<style jsx>{''}</style>
		</>
	);
}

export async function getStaticPaths() {
	return {
		paths: [{ params: { id: '1cKgiz4m3lEjwwaEctB7' } }], //Lista de todas las urls que se tiene que generar. Podemos ponerla a mano o algun helper.
		fallback: true, //Si no esta creado el archivo, se intenta crear el archivo con los datos que crearon los anteriores archivos estaticos.
	};
}

export async function getStaticProps(context) {
	const { params } = context;
	const { id } = params;  //Se llama id por que es nombre del archivo [id]

	//Podemos hacer solicitudes a una api aqui cuando se esta creando la pagina, 
	// al igual que cuando se hace con el servidor.
	return firestore
		.collection('devits')
		.doc(id)
		.get()
		.then((doc) => {
			const data = doc.data();
			const id = doc.id;
			const { createdAt } = data;

			const props = {
				...data,
				id,
				createdAt: +createdAt.toDate(),
			};
			return { props };
		})
		.catch(() => {
			return { props: {} };
		});
}


// Hay forma de que una pagina static se regenere cada cierto tiempo o por cada evento.