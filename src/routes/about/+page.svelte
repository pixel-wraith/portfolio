<script lang="ts">
    import ImgGallery from "$lib/components/ImgGallery.svelte";
    import Intro from "$lib/components/Intro.svelte";
    import IntroContent from "$lib/components/IntroContent.svelte";
    import Item from "$lib/components/Item.svelte";
    import MyFavorites from "$lib/components/MyFavorites.svelte";
    import Section from "$lib/components/Section.svelte";
    import { BIRTHDAY, STARTED_WORKING_IN_SOFTWARE } from "$lib/constants/me";
    import dayjs from "dayjs";

    import type { PageData } from "./$types";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();

    const age = dayjs().diff(dayjs(BIRTHDAY), 'years');
    const yearsExp = dayjs().diff(dayjs(STARTED_WORKING_IN_SOFTWARE), 'years');
</script>

<div class="container">
    <Intro header="A Little About Me">
        <div class="intro-row">
            <div>
                <img
                    src="https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,h_400/v1731074168/me-and-hulk_itxait.jpg"
                    alt="me and a life-size statue of Marvel's Hulk"
                />
            </div>

            <IntroContent>
                <p>
                    I'm a father, husband, and software engineer originally from a tiny farming town in Washington State. I'm
                    {age} years old, and I've been working in software development for over {yearsExp} years.
                </p>

                <p>
                    I consider myself very fortunate to have found my passion in life. I truly love what I do. There's never a
                    shortage of new problems to solve, or new things to learn.
                </p>

                <p>
                    I was the kid who would dismantle my toys to see
                    how they worked, and then <em>try</em> to put them back together again. That curiosity is still with me to
                    this day and has driven me to always be learning and growing.
                </p>

                <p>
                    Today I live in Raleigh, North Carolina with my wife, son and 3 dogs. I'm a big fan of grilling and smoking
                    meats, playing games with my son, and watching bad horror movies with my wife while snuggling up with our pups.
                </p>
            </IntroContent>
        </div>
    </Intro>

    <Section>
        <ImgGallery>
            <img
                src="https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1731074168/korban-and-me-at-falloutboy-concert_gl6tqs.jpg"
                alt="My son and I at a Fall Out Boy concert"
                class="gallery-img"
            />

            <img
                src="https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1731074168/the-fam_egsgvl.jpg"
                alt="The fam in the spot where we all met"
                class="gallery-img"
            />

            <img
                src="https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,h_400/v1731075472/emily-and-me-at-dave-and-busters_busqn6.jpg"
                alt="My wife and I"
                class="gallery-img"
            />
        </ImgGallery>
    </Section>

    <Section>
        <h2>
            On My Desk
        </h2>

        <div class="items">
            <div class="item-container">
                <div class="item venomized-iron-man">
                    <Item
                        id="venomized-iron-man"
                        src="https://res.cloudinary.com/dxpwpno1e/image/upload/v1721223720/venom-ironman-funko-200x200_fdrfyw.png"
                        alt="Venomized Iron Man Funko Pop"
                    />
                </div>
            </div>

            <div class="item-container">
                <div class="item headless-jack-skellington">
                    <Item
                        id="headless-jack-skellington"
                        src="https://res.cloudinary.com/dxpwpno1e/image/upload/v1721223718/headless-jack-skelington-funko-200x200_ulie31.png"
                        alt="Headless Jack Skellington from The Nightmare Before Christmas Funko Pop"
                    />
                </div>
            </div>

            <div class="item-container">
                <div class="item hulk">
                    <Item
                        id="hulk"
                        src="https://res.cloudinary.com/dxpwpno1e/image/upload/v1721223718/hulk-funko-200x200_k9ktsf.png"
                        alt="Hulk Funko Pop"
                    />
                </div>
            </div>

            <div class="item-container">
                <div class="item iron-man">
                    <Item
                        id="iron-man"
                        src="https://res.cloudinary.com/dxpwpno1e/image/upload/v1721223718/ironman-funko-200x200_brjy8y.png"
                        alt="Iron Man Funko Pop"
                    />
                </div>
            </div>

            <div class="item-container">
                <div class="item kevin">
                    <Item
                        id="kevin"
                        src="https://res.cloudinary.com/dxpwpno1e/image/upload/v1721223718/kevin-funko-200x200_srfttr.png"
                        alt="Kevin from The Office dressed up like Captain Dundee Funko Pop"
                    />
                </div>
            </div>

            <div class="item-container">
                <div class="item doc-brown">
                    <Item
                        id="doc-brown"
                        src="https://res.cloudinary.com/dxpwpno1e/image/upload/v1721223718/back-to-the-future-doc-funko-200x200_bcym9p.png"
                        alt="Dr. Emmet Brown from Back to the Future Funko Pop"
                    />
                </div>
            </div>

            <div class="item-container">
                <div class="item pumpkin-king">
                    <Item
                        id="pumpkin-king"
                        src="https://res.cloudinary.com/dxpwpno1e/image/upload/v1721223721/pumpkin-king-funko-200x200_tik8yw.png"
                        alt="Jack Skellington dressed as the Pumpkin King from Tim Burton's The Nightmare Before Christmas Funko Pop"
                    />
                </div>
            </div>
        </div>
    </Section>

    <Section>
        <h2>
            Goals
        </h2>
        <p class="sub-text flex-center">In no particular order...</p>

        <div class="goals gridable">
            {#each data.goals as goal}
                <div class="goal grid-item flex-center">
                    {goal.name}
                </div>
            {/each}
        </div>
    </Section>

    <Section>
        <ImgGallery>
            <img
                src="https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,h_400/v1731035539/hammy-with-his-golfball-768x1024_yqa87g.jpg"
                alt="Our adorable chihuahua, Hammy, posing with his golfball"
                class="gallery-img"
            />

            <img
                src="https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,h_400/v1731035538/olive-and-her-pickle-730x1024_b32gf1.jpg"
                alt="Our other super cute chihuahua, Olive, posing with her favorite toy...her pickle"
                class="gallery-img"
            />

            <img
                src="https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,h_400/v1731075472/molly-being-silly_t8tmqq.jpg"
                alt="Our carolina dog, Molly, playing in the bed sheets"
                class="gallery-img"
            />
        </ImgGallery>
    </Section>

    <Section>
        <h2>
            Hobbies
        </h2>
        <p class="sub-text flex-center">In no particular order...</p>
        <div class="hobbies gridable">
            {#each data.hobbies as hobby}
                <div class="hobby grid-item flex-center">
                    {hobby.name}
                </div>
            {/each}
        </div>
    </Section>

    <div class="quote-container">
        <blockquote>
            I hope everyone can find the same love and passion in their lives that I've found in software development. <br />
        </blockquote>
    </div>

    <Section>
        <div class="favorites">
            <h2>
                Favorites
            </h2>

            <MyFavorites />
        </div>
    </Section>
</div>

<style>
    .container {
		width: 96%;
		margin: 0 auto;
	}

	.sub-text {
		font-size: 0.9rem;
		font-style: italic;
		color: var(--neutral-600);
	}

	.intro-row {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		& img {
			display: block;
			width: 250px;
			border: 5px solid var(--primary-500);
			transform: rotate(-2deg);
		}
	}

	.gallery-img {
		display: block;
		width: 200px;
		aspect-ratio: 1;
		object-fit: cover;
		border: 5px solid var(--primary-500);
	}

	.gridable {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
	}

	.grid-item {
		padding: 0.5rem 1rem;
		background: var(--neutral-100);

		&:nth-child(4n) {
			border: 1px solid var(--accent1-300);
		}

		&:nth-child(4n+1) {
			border: 1px solid var(--accent2-300);
		}

		&:nth-child(4n+2) {
			border: 1px solid var(--accent3-300);
		}

		&:nth-child(4n+3) {
			border: 1px solid var(--primary-300);
		}
	}

	.quote-container {
		margin-bottom: 3rem;
		padding: 1rem 0;
		background: var(--primary-100);

		& blockquote {
			padding: 2rem 1rem;
			font-size: 1.25rem;
			font-weight: 300;
			font-style: italic;
			text-align: center;
		}
	}

	.items {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		row-gap: 1rem;
		padding: 1rem 0;
		overflow: hidden;
	}

	.item-container {
		--item-width: 100px;

		position: relative;
		width: var(--item-width);
		height: var(--item-width);
		line-height: 0;

		&:after {
			content: "";
			position: absolute;
			bottom: -5px;
			left: 50%;
			transform: translateX(-50%);
			display: block;
			width: 100vw;
			height: 5px;
			background: var(--primary-500);
		}
	}

	.item {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1;

		&.venomized-iron-man {
			bottom: -12px;
		}

		&.headless-jack-skellington {
			bottom: -20px;
		}

		&.hulk {
			bottom: -12px;
		}

		&.iron-man {
			bottom: -16px;
		}

		&.kevin {
			bottom: -10px;
		}

		&.doc-brown {
			bottom: -20px;
		}

		&.pumpkin-king {
			bottom: -21px;
		}
	}

	@media (min-width: 768px) {
		.intro-row {
			flex-direction: row;
		}

		.gallery-img {
			width: 300px;
		}
	}
</style>
