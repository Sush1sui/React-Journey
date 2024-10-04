import { Link } from "react-router-dom";
import { TYPE_CITY } from "../CityType";
import styles from "./CityItem.module.css";

export const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));
};

export default function CityItem({ city }: { city: TYPE_CITY }) {
    const { cityName, emoji, date, id, position } = city;
    const { lat, lng } = position;

    return (
        <li>
            <Link
                to={`${id}?lat=${lat}&lng=${lng}`}
                className={styles.cityItem}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}
