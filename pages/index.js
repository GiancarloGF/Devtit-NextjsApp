import {useEffect,
	//  useState
} from 'react';
import Head from 'next/head';
import { colors } from 'stylesjs/theme';
import Button from 'components/Button';
import GitHub from 'components/Icons/GitHub';
import Logo from 'components/Icons/Logo';
import router from 'next/router';
import useUser from 'hooks/useUser';
import Image from 'next/image';

import {loginWithGitHub,} from 'firebase/client';



export default function Home() {
	const user = useUser();
	

	//Cuando se cambia el usuario, validamos que este logeado, si lo esta, nos reenvia al home.
	useEffect(()=>{
		user && router.replace('/home');
	},[user]);

	const handleClick = () => { // (1)
		loginWithGitHub().catch(err => {
			console.log(err);
		});
	};

	return (
		<>
			<Head>
				<title>devter 🐦</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			
			<section>
				<Logo width='100'/>
				<h1>Devter</h1>
				<h2>Talk about development<br />with developers 👩‍💻👨‍💻</h2>


				<div>
					{
						user === null &&
						<Button onClick={handleClick}>
							<GitHub fill='#fff' width={24} height={24} />
							Login with GitHub
						</Button>
					}
					{
						// Si esta cargando y aun no tenemos datos, me muestra un loader en home.
						user ===undefined && <Image alt="" src='spinner.gif'/>
					}
				</div>
          
			</section>
			

			<style jsx>{`
        img {
          width: 120px;
        }
        div {
          margin-top: 16px;
        }
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1 {
          color: ${colors.primary};
          font-weight: 800;
		  font-size: 32px;
          margin-bottom: 16px;
        }
        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
		</>
	);
}

/* 1
Codigo inicial:
const handleClick = () => { // (1)
		loginWithGitHub().then((user)=>setUser(user)).catch(err => {
			console.log(err);
		});
	};

- Se elimino el metodo then() debido a que ya se hace el setUser en el onAuthStateChanged en un useEffect.
 */