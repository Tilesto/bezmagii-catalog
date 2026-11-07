import { useEffect, useState } from 'react';
import { useRegistry } from '../core/topbar/registry';
import { ShareButton } from '../core/share/ShareButton';
import { Icon } from '../core/icons/Icon';
import { ProjectCard } from './ProjectCard';
import { Mascot, NopeStar } from './home/Mascot';
import { IdeaDialog } from './home/IdeaDialog';
import { Receipt, type ProjectWithHonest } from './home/Receipt';
import { Why } from './home/Why';
import styles from './HomePage.module.scss';

const STEPS = [
    { title: 'Идея', text: 'Напишите идею сайта в комментариях под последним роликом.' },
    { title: 'Лайки', text: 'Лайкайте идеи, которые хотите увидеть.' },
    { title: 'Финал', text: 'Через сутки самая залайканная идея с каждой площадки выходит в финал, из финалистов выбирается одна.' },
    { title: 'Сайт', text: 'Победившую идею я делаю через ролик. В кадре будет ваш ник и рабочая ссылка.' },
];

export function HomePage() {
    const registry = useRegistry();
    const projects = ((registry.data?.projects ?? []) as ProjectWithHonest[])
        .filter((p) => p.number > 0)
        .sort((a, b) => b.number - a.number);
    const next = (projects[0]?.number ?? 0) + 1;
    const [ideaOpen, setIdeaOpen] = useState(false);

    // Пришли по ссылке «Все сайты челленджа» с другого сайта (…/#sites): браузер прокручивает к якорю
    // до того, как React нарисовал страницу, поэтому докручиваем сами.
    useEffect(() => {
        if (location.hash === '#sites') document.getElementById('sites')?.scrollIntoView();
    }, []);

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroText}>
                    <p className={styles.kicker}>
                        <NopeStar className={styles.kickerMark} />
                        <span>
                            Челлендж блога{' '}
                            <span className={styles.brand}>
                                Без маг<span className={styles.accent}>ИИ</span>
                            </span>
                        </span>
                    </p>
                    <h1 className={styles.title}>
                        Сайт <span className={styles.marker}>через день</span>
                    </h1>
                    <p className={styles.lead}>
                        Вы предлагаете идеи в комментариях. Самую залайканную я делаю вместе с ИИ и выкладываю в прод, а в
                        ролике показываю, сколько на это ушло времени и денег.
                    </p>
                    <div className={styles.actions}>
                        <button type="button" className={styles.primary} onClick={() => setIdeaOpen(true)} data-audit="hero-idea">
                            <Icon name="idea" className={styles.actionIcon} />
                            Предложить идею
                        </button>
                        <ShareButton className={styles.secondary} label="Поделиться челленджем" />
                    </div>
                </div>

                <div className={styles.heroCat}>
                    <p className={styles.bubble}>
                        Жду идею для сайта <span className={styles.bubbleNumber}>#{next}</span>
                    </p>
                    <Mascot className={styles.cat} />
                </div>
            </section>

            <Why />

            <section id="sites" className={styles.section} aria-labelledby="sites-title">
                <h2 id="sites-title" className={styles.sectionTitle}>
                    Сайты
                    <span className={styles.count}>{projects.length}</span>
                </h2>
                {/* от свежего к старым: сначала слот следующего сайта, потом сделанные по убыванию номера */}
                <ol className={styles.grid} reversed>
                    <li>
                        <button type="button" className={styles.upcoming} onClick={() => setIdeaOpen(true)} data-audit="sites-next-idea">
                            <span className={styles.upcomingNumber}>#{next}</span>
                            <span className={styles.upcomingText}>Ждёт идею</span>
                        </button>
                    </li>
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
                    {STEPS.map((s, i) => (
                        <li key={s.title} className={styles.step}>
                            <span className={styles.stepNumber} aria-hidden="true">
                                {i + 1}
                            </span>
                            <span className={styles.stepTitle}>{s.title}</span>
                            <span className={styles.stepText}>{s.text}</span>
                        </li>
                    ))}
                </ol>
            </section>

            <div className={styles.split}>
                <section className={styles.section} aria-labelledby="rules-title">
                    <h2 id="rules-title" className={styles.sectionTitle}>
                        Какие идеи не подходят
                    </h2>
                    <ul className={styles.rules}>
                        <li>
                            <span className={styles.ruleIcon} aria-hidden="true" />
                            18+, нелегальное, оскорбительное, копии чужих брендов
                        </li>
                    </ul>
                </section>

                <section className={styles.section} aria-labelledby="receipt-title">
                    <h2 id="receipt-title" className={styles.sectionTitle}>
                        Сколько ушло
                    </h2>
                    <Receipt projects={projects} />
                </section>
            </div>

            <IdeaDialog open={ideaOpen} onClose={() => setIdeaOpen(false)} />
        </div>
    );
}
