<?php
$a_message_from_our_founder = get_field('a_message_from_our_founder');
$heres_why_you_should_join_us = get_field('heres_why_you_should_join_us');
$we_want_the_best_and_brightest = get_field('we_want_the_best_and_brightest');
$our_available_positions = get_field('our_available_positions');
$opportunities_we_offer = get_field('opportunities_we_offer')
?>

<!doctype html>
<html lang="en">

<?php get_template_part('template_parts/head'); ?>

<body class="">

<?php get_header(); ?>

<main>
    <section class="page-title page-title--stars">
        <div class="content-wrap">
            <div class="page-title-inner">
                <h1><?php echo get_the_title(); ?></h1>
                <?php the_content(); ?>
            </div>
        </div>
    </section>

    <section class="founder">
        <div class="content-wrap">
            <div class="founder-grid">
                <div class="founder-info">
                    <?php echo $a_message_from_our_founder['text']; ?>
                </div>
                <div class="founder-img">
                    <div class="founder-name"><?php echo $a_message_from_our_founder['name_and_position']; ?></div>
                    <div class="img-wrap">
                        <img src="<?php echo $a_message_from_our_founder['picture']; ?>" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="reasons">
        <div class="content-wrap">
            <div class="section-title">
                <h2><?php echo $heres_why_you_should_join_us['title']; ?></h2>
                <p><?php echo $heres_why_you_should_join_us['description']; ?></p>
            </div>
            <div class="content-grid">
                <?php
                if( have_rows('heres_why_you_should_join_us') ):
                    while( have_rows('heres_why_you_should_join_us') ): the_row();
                        if( have_rows('reasons') ):
                            while( have_rows('reasons') ): the_row();
                                $icon = get_sub_field('icon');
                                $title = get_sub_field('title');
                                $description = get_sub_field('description');
                ?>
                <div class="reasons-item">
                    <div class="reasons-item-icon">
                        <img src="<?php echo $icon; ?>" alt="">
                    </div>
                    <h3><?php echo $title; ?></h3>
                    <p><?php echo $description; ?></p>
                </div>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <section class="reasons">
        <div class="content-wrap">
            <div class="section-title">
                <h2><?php echo $we_want_the_best_and_brightest['title']; ?></h2>
                <p><?php echo $we_want_the_best_and_brightest['description']; ?></p>
            </div>
            <div class="content-grid">
                <?php
                if( have_rows('we_want_the_best_and_brightest') ):
                    while( have_rows('we_want_the_best_and_brightest') ): the_row();
                        if( have_rows('qualities') ):
                            while( have_rows('qualities') ): the_row();
                                $icon = get_sub_field('icon');
                                $title = get_sub_field('title');
                                $description = get_sub_field('description');
                ?>
                <div class="bg-item">
                    <div class="bg-item-icon">
                        <img src="<?php echo $icon; ?>" alt="">
                    </div>
                    <h3><?php echo $title; ?></h3>
                    <p><?php echo $description; ?></p>
                </div>
                                <?php endwhile; ?>
                            <?php endif; ?>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <section class="vacancies">
        <div class="content-wrap">
            <div class="section-title">
                <h2><?php echo $our_available_positions['title']; ?></h2>
                <p><?php echo $our_available_positions['description']; ?></p>
            </div>
            <div class="vacancies-grid">
                <?php
                if( have_rows('our_available_positions') ):
                    while( have_rows('our_available_positions') ): the_row();
                        if( have_rows('positions') ):
                            while( have_rows('positions') ): the_row();
                                $icon = get_sub_field('icon');
                                $title = get_sub_field('title');
                                $description = get_sub_field('description');
                                $number_of_positions = get_sub_field('number_of_positions');
                ?>
                <div class="vacancy">
                    <div class="vacancy-icon">
                        <img src="<?php echo $icon; ?>" alt="">
                    </div>
                    <div class="vacancy-text">
                        <h3><?php echo $title; ?></h3>
                        <p><?php echo $description; ?></p>
                        <a href="<?php echo $our_available_positions['link_for_apply_now_button']; ?>" class="custom-btn custom-btn--small">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1828_16767)">
                                    <path d="M22.3186 4.43101L8.49963 18.249C8.40672 18.3423 8.29631 18.4163 8.17473 18.4668C8.05315 18.5173 7.92279 18.5433 7.79113 18.5433C7.65948 18.5433 7.52912 18.5173 7.40754 18.4668C7.28596 18.4163 7.17554 18.3423 7.08263 18.249L1.73863 12.9C1.64572 12.8067 1.53531 12.7327 1.41373 12.6822C1.29214 12.6317 1.16179 12.6057 1.03013 12.6057C0.898479 12.6057 0.768121 12.6317 0.646539 12.6822C0.524956 12.7327 0.414542 12.8067 0.321633 12.9C0.228356 12.9929 0.154344 13.1033 0.103842 13.2249C0.0533404 13.3465 0.0273437 13.4769 0.0273438 13.6085C0.0273437 13.7402 0.0533404 13.8705 0.103842 13.9921C0.154344 14.1137 0.228356 14.2241 0.321633 14.317L5.66763 19.662C6.23158 20.2249 6.99583 20.5411 7.79263 20.5411C8.58944 20.5411 9.35369 20.2249 9.91763 19.662L23.7356 5.84701C23.8288 5.75412 23.9026 5.64377 23.9531 5.52228C24.0035 5.40079 24.0294 5.27054 24.0294 5.13901C24.0294 5.00747 24.0035 4.87723 23.9531 4.75574C23.9026 4.63425 23.8288 4.5239 23.7356 4.43101C23.6427 4.33773 23.5323 4.26372 23.4107 4.21322C23.2891 4.16272 23.1588 4.13672 23.0271 4.13672C22.8955 4.13672 22.7651 4.16272 22.6435 4.21322C22.522 4.26372 22.4115 4.33773 22.3186 4.43101Z" fill="white"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_1828_16767">
                                        <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <span>Apply Now</span>
                        </a>
                    </div>
                    <div class="vacancy-number"><?php echo $number_of_positions; ?></div>
                </div>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
            <div class="vacancies-text"><?php echo $our_available_positions['additional_text']; ?></div>
        </div>
    </section>

    <section class="text-with-img">
        <div class="content-wrap">
            <div class="section-title">
                <h2><?php echo $opportunities_we_offer['title']; ?></h2>
                <p><?php echo $opportunities_we_offer['description']; ?></p>
            </div>
            <div class="text-with-img-wrap">
                <?php
                if( have_rows('opportunities_we_offer') ):
                    while( have_rows('opportunities_we_offer') ): the_row();
                        if( have_rows('opportunities') ):
                            while( have_rows('opportunities') ): the_row();
                                $image = get_sub_field('image');
                                $title = get_sub_field('title');
                                $description = get_sub_field('description');
                ?>
                <div class="text-with-img-flex">
                    <div class="text-with-img-text">
                        <h3><?php echo $title; ?></h3>
                        <p><?php echo $description; ?></p>
                    </div>
                    <div class="text-with-img-img">
                        <img src="<?php echo $image; ?>" alt="">
                    </div>
                </div>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>

        </div>
    </section>
</main>

<?php get_footer(); ?>

<?php wp_footer(); ?>

<?php get_template_part('template_parts/scripts'); ?>

</body>
</html>

