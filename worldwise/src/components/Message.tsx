import styles from "./Message.module.css";

function Message({ message }: { message: any }) {
    return (
        <p className={styles.message}>
            <span role="img">👋</span> {message}
        </p>
    );
}

export default Message;
