import { BLOG } from '../core/blog';
import { useRegistry } from '../core/topbar/registry';
import { ShareButton } from '../core/share/ShareButton';
import { Icon } from '../core/icons/Icon';
import { ProjectCard } from './ProjectCard';
import styles from './HomePage.module.scss';

/** Сколько пустых «будущих» слотов показывать после последнего сайта. */
const UPCOMING = 3;

export function HomePage() {
    const registry = useRegistry();
    const projects = (registry.data?.projects ?? []).filter((p) => p.number > 0).sort((a, b) => b.number - a.number);
    const next = (projects[0]?.number ?? 0) + 1;
    const ideaUrl = registry.data?.ideaUrl ?? BLOG.catalogUrl;

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <p className={styles.kicker}>
                    Челлендж блога <span className={styles.brand}>Без маг<span className={styles.accent}>ИИ</span></span>
                </p>
                <h1 className={styles.title}>Сайт через день</h1>
                <p className={styles.lead}>
                    Пишете идею сайта в комментариях — самую залайканную я делаю с ИИ и выкладываю в прод. Без прикрас:
                    сколько часов, сколько денег и где ИИ тупил.
                </p>
                <div className={styles.actions}>
                    <a className={styles.primary} href={ideaUrl} target="_blank" rel="noopener" data-audit="hero-idea">
                        <Icon name="idea" className={styles.actionIcon} />
                        Предложить идею
                    </a>
                    <ShareButton className={styles.secondary} label="Поделиться челленджем" />
                </div>
            </section>

            <section className={styles.section} aria-labelledby="sites-title">
                <h2 id="sites-title" className={styles.sectionTitle}>
                    Сайты
                    {projects.length > 0 && <span className={styles.count}>{projects.length}</span>}
                </h2>
                <ol className={styles.grid} reversed>
                    {Array.from({ length: UPCOMING }, (_, i) => next + UPCOMING - 1 - i).map((n) => (
                        <li key={`upcoming-${n}`} className={styles.upcoming}>
                            <span className={styles.upcomingNumber}>#{n}</span>
                            <span className={styles.upcomingText}>{n === next ? 'Скоро. Идея — ваша?' : 'Идея — ваша'}</span>
                        </li>
                    ))}
                    {projects.map((p) => (
                        <ProjectCard key={p.slug} project={p} />
                    ))}
                </ol>
            </section>

            <section className={styles.section} aria-labelledby="how-title">
                <h2 id="how-title" className={styles.sectionTitle}>
                    Как попасть в челлендж
                </h2>
                <ol className={styles.steps}>
                    <li>Напишите идею сайта в комментариях под последним роликом.</li>
                    <li>Лайкайте идеи, которые хотите увидеть.</li>
                    <li>Через сутки самая залайканная идея с каждой площадки выходит в финал, из финалистов выбирается одна.</li>
                    <li>Победитель — сайт через ролик, с вашим ником в кадре и рабочей ссылкой.</li>
                </ol>
            </section>

            <section className={styles.section} aria-labelledby="rules-title">
                <h2 id="rules-title" className={styles.sectionTitle}>
                    Какие идеи подходят
                </h2>
                <ul className={styles.rules}>
                    <li className={styles.yes}>Один экран или одна функция, без регистрации и оплаты</li>
                    <li className={styles.no}>18+, нелегальное, оскорбительное, копии чужих брендов</li>
                    <li className={styles.no}>«Сделай второй ВКонтакте» — у меня есть право вето</li>
                </ul>
            </section>
        </div>
    );
}
