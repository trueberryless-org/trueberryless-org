import styles from "./styles.module.css";

export default function Home() {
    return (
        <div
            className={`${styles.body} antialiased w-screen h-screen bg-[#e8f6f3] dark:bg-[#1a332e] text-[#2c3e50] dark:text-[#e0f2f1]`}
        >
            <h1>trueberryless-org</h1>
        </div>
    );
}
