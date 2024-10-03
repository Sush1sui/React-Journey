import styles from "./CountryList.module.css";
import { TYPE_CITY } from "../CityType";
import Message from "./Message";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";

export default function CountryList({
    cities,
    isLoading,
}: {
    cities: TYPE_CITY[];
    isLoading: boolean;
}) {
    if (isLoading) return <Spinner />;

    if (!cities.length)
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        );

    const countries = cities.reduce((arr, city) => {
        // Check if the country is already in the array
        if (!arr.some((el) => el.country === city.country)) {
            return [...arr, { country: city.country, emoji: city.emoji }];
        }
        return arr;
    }, [] as { country: string; emoji: string }[]);

    console.log(countries);

    return (
        <ul className={styles.countryList}>
            {countries.map((country, i) => (
                <CountryItem key={i} country={country} />
            ))}
        </ul>
    );
}
