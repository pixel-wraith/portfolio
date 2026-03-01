<script lang="ts">
	import { STARTED_WORKING_IN_SOFTWARE } from "$lib/constants/me";
	import dayjs from "dayjs";
	import { onMount } from "svelte";

    let yearsExp: number;
    let daysLeft: number;
    let numDaysBetweenAnniversaries: number;
    let timer: number;

    onMount(() => {
        calcTimes();

        return () => {
            clearTimeout(timer);
        }
    });

    const calcTimes = () => {
        window.clearTimeout(timer);

        const now = dayjs();
        const startDate = new Date(STARTED_WORKING_IN_SOFTWARE);

        let nextAnniversary = dayjs(startDate).set('year', now.year());
        if (nextAnniversary.isBefore(now)) nextAnniversary = nextAnniversary.add(1, 'year');

        yearsExp = now.diff(startDate, 'year');
        daysLeft = nextAnniversary.diff(now, 'day');
        numDaysBetweenAnniversaries = nextAnniversary.diff(dayjs(nextAnniversary).subtract(1, 'year'), 'day');

        // reset all values at midnight
        const tomorrow = dayjs().add(1, 'day').startOf('day');
        const milliSecondsToTomorrow = tomorrow.diff(now);
        timer = window.setTimeout(calcTimes, milliSecondsToTomorrow);
    }
</script>

{#if !!yearsExp && !!numDaysBetweenAnniversaries}
    <div class="career-exp-container">
        <div class="progress-bar">
            <div style="width: {Math.floor(((numDaysBetweenAnniversaries - daysLeft - 1) / numDaysBetweenAnniversaries) * 100)}%">
                <div class="shine"></div>
            </div>
        </div>

        <div class="labels">
            <div>
                <span>{yearsExp}</span> years exp
            </div>
            
            <div>
                {numDaysBetweenAnniversaries - daysLeft - 1} / {numDaysBetweenAnniversaries} days
            </div>
        </div>
    </div>
{/if}

<style>
    .career-exp-container {
        container-type: inline-size;
		container-name: career-exp;
        position: relative;
        width: 100%;

        & .labels {
            position: absolute;
            top: calc(100% + 0.2rem);
            left: 50%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1rem;
            width: 100%;
            max-width: 86rem;
            padding: 0 1rem;
            transform: translateX(-50%);

            & div,
            & span {
                display: flex;
                align-items: center;
                font-size: 0.9rem;
                line-height: 0.9rem;
            }

            & span {
                padding: 0 0.4rem 0 0;
                color: var(--accent3-500);
            }
        }
    }

    .progress-bar {
        width: 100%;
        height: 5px;
        background: var(--neutral-300);

        & div {
            position: relative;
            height: 100%;
            background: var(--primary-300);
            overflow: hidden;
        }

        & .shine {
            position: absolute;
            top: 0;
            width: 50vw;
            max-width: 20rem;
            height: 8px;
            background: linear-gradient(90deg, transparent, var(--primary-500), transparent);
            transform: skew(-45deg);
            animation: shine 28s ease infinite;
        }
    }

    @container career-exp (max-width: 768px) {
        .career-exp-container .labels {
            padding: 0 0.5rem 0.2rem;
        }

        .career-exp-container .labels div,
        .career-exp-container .labels span {
            font-size: 0.8rem;
            line-height: 0.8rem;
        }

        .career-exp-container .progress-bar .shine {
            animation: shine 14s ease infinite;
        }
    }
</style>