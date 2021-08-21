import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/client';
import { useRouter } from 'next/router';

export const USER_STATES = {
	NOT_LOGGED: null,
	NOT_KNOWN: undefined,
};

export default function useUser() {
	const [user, setUser] = useState(USER_STATES.NOT_KNOWN);
	const router = useRouter();

	useEffect(() => {
		onAuthStateChanged(setUser); //Se actualiza el estado luego del logueo.
	}, []);

	useEffect(() => {
		user === USER_STATES.NOT_LOGGED && router.push('/'); //Si el usuario no esta logeado, lo redirigimos a /.
	}, [user]);

	return user;
}
