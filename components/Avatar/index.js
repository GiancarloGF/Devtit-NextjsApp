import styles from './styles.module.css';
import Image from 'next/image';
export default function Avatar({ alt, src, text }) {
	return (
		<div className={styles.container}>
			<Image className={styles.avatar} alt={alt} src={src} title={alt} />
			{text && <strong>{text}</strong>}
		</div>
	);
}