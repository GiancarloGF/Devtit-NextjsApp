import { useEffect, useState } from 'react';
import { formatDate } from './useDateTimeFormat';

//Para verificar si el dispositivo acepta el metodo Intl -> Mejora progresiva.
const isRelativeTimeFormatSupported =
  typeof Intl !== 'undefined' && Intl.RelativeTimeFormat;

const DATE_UNITS = [
	['day', 86400],
	['hour', 3600],
	['minute', 60],
	['second', 1],
];

const getDateDiffs = (timestamp) => {
	const now = Date.now();
	const elapsed = (timestamp - now) / 1000;

	for (const [unit, secondsInUnit] of DATE_UNITS) {
		if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
			const value = Math.round(elapsed / secondsInUnit);
			return { value, unit };
		}
	}
};

export default function useTimeAgo(timestamp) {
	const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp)); //Es mejor pasar una funcion para inicializar el estado y no la ejecucion de la funcion directamente.
        
	{/**Este useEffect se usa para actualizar el tiempo cada segundo. */}
	useEffect(() => {
		if (isRelativeTimeFormatSupported) {
			const interval = setInterval(() => {
			  const newTimeAgo = getDateDiffs(timestamp);
			  setTimeago(newTimeAgo);
			}, 5000);
	  
			return () => clearInterval(interval);
		  }
	}, [timestamp]);

	if (!isRelativeTimeFormatSupported) {
		return formatDate(timestamp);
	  }

	const rtf = new Intl.RelativeTimeFormat('es', { style: 'short' }); //Intl.RelativeTimeFormat. no tiene soporte en safari, podriamos instalar un polyfill.

	const { value, unit } = timeago;

	return rtf.format(value, unit);
}