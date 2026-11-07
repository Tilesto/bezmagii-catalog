import { NopeStar } from './Mascot';
import styles from './Why.module.scss';

/** «Зачем этот челлендж»: позиция блога в трёх тезисах. */
export function Why() {
    return (
        <section className={styles.why} aria-labelledby="why-title">
            <h2 id="why-title" className={styles.title}>
                Зачем этот челлендж
            </h2>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <NopeStar className={styles.mark} />
                    <h3 className={styles.head}>ИИ не волшебная кнопка</h3>
                    <p className={styles.text}>
                        Сам по себе он не сделает хороший сайт. Без опыта легко получить что-то, что разваливается на
                        телефоне или теряет данные.
                    </p>
                </li>
                <li className={styles.item}>
                    <span className={styles.mark} data-kind="tool" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                            <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
                        </svg>
                    </span>
                    <h3 className={styles.head}>Но в умелых руках он очень сильный</h3>
                    <p className={styles.text}>
                        То, на что раньше уходили недели, теперь можно сделать за вечер. Каждый сайт здесь сделан именно
                        так, и в каждом ролике видно, сколько на него ушло.
                    </p>
                </li>
                <li className={styles.item}>
                    <span className={styles.mark} data-kind="money" aria-hidden="true">
                        ₽
                    </span>
                    <h3 className={styles.head}>Простой сайт не стоит десятки тысяч</h3>
                    <p className={styles.text}>
                        Сейчас его можно сделать быстро и дёшево. Если за такой сайт просят десятки тысяч рублей, скорее
                        всего, на вас просто зарабатывают.
                    </p>
                </li>
            </ul>
        </section>
    );
}
