<?php
$a_few_reasons_why_junk_raider = get_field('a_few_reasons_why_junk_raider', 11);
$what_our_clients_say = get_field('what_our_clients_say', 11);
$meet_our_team = get_field('meet_our_team');
$our_mission = get_field('our_mission');
$our_values = get_field('our_values');
$join_our_team = get_field('join_our_team');
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
                <?php echo the_excerpt(); ?>
            </div>
        </div>
    </section>
    <section class="text-with-img">
        <div class="content-wrap">
            <div class="text-with-img-flex">
                <div class="text-with-img-text">
                    <p><?php the_content(); ?></p>
                </div>
                <div class="text-with-img-img">
                    <img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="">
                </div>
            </div>
        </div>
    </section>
	<?php if($meet_our_team['title']): ?>
    <section class="team">
        <div class="content-wrap">
            <div class="section-title">
                <h2><?php echo $meet_our_team['title']; ?></h2>
                <p><?php echo $meet_our_team['description']; ?></p>
            </div>
            <div class="team-grid">
                <?php
                if( have_rows('meet_our_team') ):
                    while( have_rows('meet_our_team') ): the_row();
                        if( have_rows('team') ):
                            while( have_rows('team') ): the_row();
                                $picture = get_sub_field('picture');
                                $full_name = get_sub_field('full_name');
                                $position = get_sub_field('position');
                ?>
                <div class="team-item">
                    <div class="team-item_img">
                        <img src="<?php echo $picture; ?>" alt="">
                    </div>
                    <h4><?php echo $full_name; ?></h4>
                    <span><?php echo $position; ?></span>
                </div>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </div>
    </section>
	<?php endif; ?>
    <section class="text-with-img">
        <div class="content-wrap">
            <div class="text-with-img-flex text-with-img-flex--reverse">
                <div class="text-with-img-text">
                    <h2><?php echo $our_mission['title']; ?></h2>
                    <p><?php echo $our_mission['description']; ?></p>
                </div>
                <div class="text-with-img-img">
                    <img src="<?php echo $our_mission['picture']; ?>" alt="">
                </div>
            </div>
        </div>
    </section>
    <section class="text-with-img">
        <div class="content-wrap">
            <div class="text-with-img-flex">
                <div class="text-with-img-text">
                    <h2><?php echo $our_values['title']; ?></h2>
                    <ol>
                        <?php
                        if( have_rows('our_values') ):
                            while( have_rows('our_values') ): the_row();
                                if( have_rows('values') ):
                                    while( have_rows('values') ): the_row();
                                        $title = get_sub_field('title');
                                        $description = get_sub_field('description');
                        ?>
                        <li>
                            <h4><?php echo $title; ?></h4>
                            <p><?php echo $description; ?></p>
                        </li>
                                    <?php endwhile; ?>
                                <?php endif; ?>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    </ol>
                </div>
                <div class="text-with-img-img">
                    <img src="<?php echo $our_values['picture']; ?>" alt="">
                </div>
            </div>
        </div>
    </section>
    <section class="reasons">
        <div class="content-wrap">
            <div class="section-title">
                <?php echo $a_few_reasons_why_junk_raider['title']; ?>
            </div>
            <div class="content-grid">
                <?php
                if( have_rows('a_few_reasons_why_junk_raider', 11) ):
                    while( have_rows('a_few_reasons_why_junk_raider', 11) ): the_row();
                        if( have_rows('reasons', 11) ):
                            while( have_rows('reasons', 11) ): the_row();
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
    <section class="reviews">
        <div class="content-wrap">
            <div class="section-title">
                <img src="<?php echo get_template_directory_uri(). '/img/svg/google-logo.svg'; ?>" alt="">
                <h2><?php echo $what_our_clients_say['title']; ?></h2>
            </div>
            <div class="reviews-slider" id="reviews-slider">
                <?php
                if( have_rows('what_our_clients_say', 11) ):
                    while( have_rows('what_our_clients_say', 11) ): the_row();
                        if( have_rows('testimonials', 11) ):
                            while( have_rows('testimonials', 11) ): the_row();
                                $client_name = get_sub_field('client_name');
                                $testimonial = get_sub_field('testimonial');
                                $location = get_sub_field('location');
                                $link = get_sub_field('link');
                                ?>
                                <div class="reviews-slide">
                                    <div class="reviews-slide-top">
                                        <h3><?php echo $client_name; ?></h3>
                                        <div class="reviews-slide-rating">
                                            <img src="<?php echo get_template_directory_uri() . '/img/svg/rating.svg'; ?>" alt="">
                                        </div>
                                    </div>
                                    <div class="reviews-slide-text">
                                        <p><?php echo $testimonial; ?></p>
                                    </div>
                                    <div class="reviews-slide-bottom">
                                        <div class="location">
                                            <img src="<?php echo get_template_directory_uri() . '/img/svg/green-marker.svg'; ?>" alt="">
                                            <span><?php echo $location; ?></span>
                                        </div>
                                        <a href="/">
                                            <img src="<?php echo get_template_directory_uri() . '/img/svg/link.svg'; ?>" alt="">
                                        </a>
                                    </div>
                                </div>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <section class="booking">
        <div class="content-wrap">
            <div class="booking-flex">
                <div class="booking-title">
                    <h2><?php echo $join_our_team['title']; ?></h2>
                    <p><?php echo $join_our_team['description']; ?></p>
                    <a href="<?php echo $join_our_team['link']; ?>" target="_blank" class="custom-btn custom-btn--white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1610_3614)">
                                <path d="M19 2H18V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0C16.7348 0 16.4804 0.105357 16.2929 0.292893C16.1054 0.48043 16 0.734784 16 1V2H8V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V2H5C3.67441 2.00159 2.40356 2.52888 1.46622 3.46622C0.528882 4.40356 0.00158786 5.67441 0 7L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V7C23.9984 5.67441 23.4711 4.40356 22.5338 3.46622C21.5964 2.52888 20.3256 2.00159 19 2ZM2 7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H19C19.7956 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V8H2V7ZM19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V10H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22Z" fill="#72A53B"/>
                                <path d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z" fill="#72A53B"/>
                                <path d="M7 16.5C7.82843 16.5 8.5 15.8284 8.5 15C8.5 14.1716 7.82843 13.5 7 13.5C6.17157 13.5 5.5 14.1716 5.5 15C5.5 15.8284 6.17157 16.5 7 16.5Z" fill="#72A53B"/>
                                <path d="M17 16.5C17.8284 16.5 18.5 15.8284 18.5 15C18.5 14.1716 17.8284 13.5 17 13.5C16.1716 13.5 15.5 14.1716 15.5 15C15.5 15.8284 16.1716 16.5 17 16.5Z" fill="#72A53B"/>
                            </g>
                        </svg>
                        <span><?php echo $join_our_team['button_name']; ?></span>
                    </a>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>

<?php wp_footer(); ?>

<?php get_template_part('template_parts/scripts'); ?>

</body>
</html>

