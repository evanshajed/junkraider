<?php
$hero = get_field('hero', 11);
$who_we_are = get_field('who_we_are');
$what_is_valet_trash = get_field('what_is_valet_trash');
$explore_our_work = get_field('explore_our_work');
$why_choose_junk_raider = get_field('why_choose_junk_raider');
$what_sets_us_apart = get_field('what_sets_us_apart');
$how_we_do_it = get_field('how_we_do_it');
$more_than_just_valet_trash = get_field('more_than_just_valet_trash');
$our_mission = get_field('our_mission');
$call_to_action_block = get_field('call_to_action_block');

//external var requests
$responsible_disposal = get_field('responsible_disposal', 126);
$what_our_clients_say = get_field('what_our_clients_say', 11);
?>

<!doctype html>
<html lang="en">

<?php get_template_part('template_parts/head'); ?>

<body class="commercial-services">

<?php get_header(); ?>

<main>
    <section class="page-title page-title--stars">
        <div class="content-wrap">
            <div class="page-title-inner">
                <h1><?php echo get_the_title(); ?></h1>
                <?php the_content(); ?>
                <div class="page-title-flex">
                    <a  href="<?php echo $hero['call_to_action_button_link']; ?>" class="custom-btn">
                        <img src="<?php echo get_template_directory_uri() . '/img/svg/calendar.svg'; ?>" alt="">
                        <span><?php echo $hero['cta_button_name']; ?></span>
                    </a>
                    <a href="tel:<?php echo '+1' . $hero['phone_number']; ?>" class="custom-btn custom-btn--darkblue">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 0.999644C13 0.734427 13.1053 0.480073 13.2929 0.292537C13.4804 0.105001 13.7348 -0.000356157 14 -0.000356157C16.6512 0.00255544 19.1931 1.05706 21.0678 2.93179C22.9425 4.80653 23.997 7.34837 24 9.99965C24 10.2649 23.8946 10.5192 23.7071 10.7068C23.5195 10.8943 23.2652 10.9996 23 10.9996C22.7347 10.9996 22.4804 10.8943 22.2929 10.7068C22.1053 10.5192 22 10.2649 22 9.99965C21.9976 7.87864 21.154 5.8452 19.6542 4.34542C18.1544 2.84565 16.121 2.00203 14 1.99964C13.7348 1.99964 13.4804 1.89429 13.2929 1.70675C13.1053 1.51921 13 1.26486 13 0.999644ZM14 5.99964C15.0608 5.99964 16.0782 6.42107 16.8284 7.17122C17.5785 7.92136 18 8.93878 18 9.99965C18 10.2649 18.1053 10.5192 18.2929 10.7068C18.4804 10.8943 18.7347 10.9996 19 10.9996C19.2652 10.9996 19.5195 10.8943 19.7071 10.7068C19.8946 10.5192 20 10.2649 20 9.99965C19.9984 8.40883 19.3657 6.88363 18.2409 5.75876C17.116 4.63388 15.5908 4.00123 14 3.99964C13.7348 3.99964 13.4804 4.105 13.2929 4.29254C13.1053 4.48007 13 4.73443 13 4.99964C13 5.26486 13.1053 5.51921 13.2929 5.70675C13.4804 5.89429 13.7348 5.99964 14 5.99964ZM23.093 16.7386C23.6725 17.3198 23.9979 18.107 23.9979 18.9276C23.9979 19.7483 23.6725 20.5355 23.093 21.1166L22.183 22.1656C13.993 30.0066 -5.93701 10.0816 1.78298 1.86564L2.93298 0.865644C3.51475 0.302321 4.29491 -0.00930708 5.10468 -0.00182132C5.91445 0.00566445 6.68872 0.331662 7.25998 0.905644C7.29098 0.936644 9.14398 3.34364 9.14398 3.34364C9.6938 3.92127 9.99988 4.68857 9.99858 5.48605C9.99727 6.28352 9.68869 7.04982 9.13698 7.62564L7.97898 9.08165C8.61982 10.6388 9.56204 12.0539 10.7515 13.2457C11.9409 14.4376 13.3542 15.3827 14.91 16.0266L16.375 14.8616C16.9509 14.3104 17.717 14.0021 18.5143 14.001C19.3115 13.9999 20.0785 14.306 20.656 14.8556C20.656 14.8556 23.062 16.7076 23.093 16.7386ZM21.717 18.1926C21.717 18.1926 19.324 16.3516 19.293 16.3206C19.0869 16.1164 18.8086 16.0018 18.5185 16.0018C18.2283 16.0018 17.95 16.1164 17.744 16.3206C17.717 16.3486 15.7 17.9556 15.7 17.9556C15.564 18.0638 15.4023 18.1348 15.2306 18.1614C15.0589 18.1881 14.8833 18.1695 14.721 18.1076C12.7054 17.3572 10.8747 16.1824 9.35281 14.6627C7.83091 13.1431 6.65338 11.3141 5.89998 9.29965C5.83318 9.1351 5.8114 8.95573 5.83688 8.77998C5.86237 8.60423 5.93419 8.43844 6.04498 8.29965C6.04498 8.29965 7.65198 6.28164 7.67898 6.25564C7.88324 6.04963 7.99786 5.77126 7.99786 5.48114C7.99786 5.19103 7.88324 4.91266 7.67898 4.70664C7.64798 4.67664 5.80698 2.28164 5.80698 2.28164C5.59788 2.09415 5.32498 1.99374 5.04423 2.00099C4.76347 2.00824 4.49612 2.12261 4.29698 2.32064L3.14698 3.32064C-2.49501 10.1046 14.776 26.4176 20.721 20.7996L21.632 19.7496C21.8454 19.5519 21.9737 19.2789 21.9895 18.9883C22.0054 18.6978 21.9076 18.4125 21.717 18.1926Z" fill="#FFFFFF"/>
                        </svg>
                        <span><?php echo $hero['phone_number_button_name']; ?></span>
                    </a>
                </div>
            </div>
        </div>
    </section>
    <section class="text-with-img">
        <div class="content-wrap">
            <div class="text-with-img-flex text-with-img-flex--reverse">
                <div class="text-with-img-text">
                    <h2><?php echo $who_we_are['title']; ?></h2>
                    <p><?php echo $who_we_are['description']; ?></p>
                </div>
                <div class="text-with-img-img">
                    <img src="<?php echo $who_we_are['picture']; ?>" alt="">
                </div>
            </div>
        </div>
    </section>
    <section class="text-with-img">
        <div class="content-wrap">
            <div class="text-with-img-flex">
                <div class="text-with-img-text">
                    <h2><?php echo $what_is_valet_trash['title']; ?></h2>
                    <p><?php echo $what_is_valet_trash['description']; ?></p>
                </div>
                <div class="text-with-img-img">
                    <img src="<?php echo $what_is_valet_trash['picture']; ?>" alt="">
                </div>
            </div>
        </div>
    </section>

    <section class="reasons">
        <div class="content-wrap">
            <div class="section-title">
                <h2><?php echo $why_choose_junk_raider['title']; ?></h2>
                <p><?php echo $why_choose_junk_raider['description']; ?></p>
            </div>
            <div class="content-grid content-grid--3">
                <?php
                if( have_rows('why_choose_junk_raider') ):
                    while( have_rows('why_choose_junk_raider') ): the_row();
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

    <section class="advantages">
        <div class="section-title">
            <h2><?php echo $what_sets_us_apart['title']; ?></h2>
            <p><?php echo $what_sets_us_apart['description']; ?></p>
        </div>
        <div class="content-wrap">
            <div class="content-grid content-grid--3">
                <?php
                $number = 0;
                if( have_rows('what_sets_us_apart') ):
                    while( have_rows('what_sets_us_apart') ): the_row();
                        if( have_rows('list') ):
                            while( have_rows('list') ): the_row();
                                $number++;
                                $picture = get_sub_field('picture');
                                $title = get_sub_field('title');
                                $description = get_sub_field('description');
                ?>
                <div class="advantage-item">
                    <div class="advantage-item-img">
                        <div class="img-wrap">
                            <img src="<?php echo $picture; ?>" alt="">
                        </div>
                        <span class="advantage-item-number"><?php echo $number; ?></span>
                    </div>
                    <div class="advantage-item-text">
                        <h3><?php echo $title; ?></h3>
                        <p><?php echo $description; ?></p>
                    </div>
                </div>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </div>
    </section>
	<?php if($explore_our_work['title']): ?>
    <section class="gallery">
        <div class="content-wrap">
            <div class="section-title">
                <h2><?php echo $explore_our_work['title']; ?></h2>
                <p><?php echo $explore_our_work['description']; ?></p>
            </div>
            <div class="gallery-slider" id="gallery-slider">
                <?php
                if( have_rows('explore_our_work') ):
                    while( have_rows('explore_our_work') ): the_row();
                        if( have_rows('pictures') ):
                            while( have_rows('pictures') ): the_row();
                                $image = get_sub_field('image');
                                ?>
                                <a class="gallery-slide" href="<?php echo $image; ?>" data-fancybox="gallery">
                                    <img src="<?php echo $image; ?>" alt="">
                                </a>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </div>
    </section>
	<?php endif; ?>
    <section class="steps">
        <div class="content-wrap">
            <div class="section-title">
                <h2><?php echo $how_we_do_it['title']; ?></h2>
                <p><?php echo $how_we_do_it['description']; ?></p>
            </div>
            <div class="content-grid content-grid--3">
                <?php
                $number = 0;
                if( have_rows('how_we_do_it') ):
                    while( have_rows('how_we_do_it') ): the_row();
                        if( have_rows('list') ):
                            while( have_rows('list') ): the_row();
                                $number++;
                                $title = get_sub_field('title');
                                $description = get_sub_field('description');
                ?>
                <div class="step-item">
                    <span class="step-item-number"><?php echo $number; ?></span>
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
                <h2><?php echo $more_than_just_valet_trash['title']; ?></h2>
                <p><?php echo $more_than_just_valet_trash['description']; ?></p>
                <p><b><?php echo $more_than_just_valet_trash['additional_line']; ?></b></p>
            </div>
            <div class="content-grid content-grid--3">
                <?php
                if( have_rows('more_than_just_valet_trash') ):
                    while( have_rows('more_than_just_valet_trash') ): the_row();
                        if( have_rows('list') ):
                            while( have_rows('list') ): the_row();
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

    <section class="text-with-img">
        <div class="content-wrap">
            <div class="text-with-img-flex">
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
    <section class="responsible">
        <div class="content-wrap">
            <div class="responsible-inner">
                <div class="responsible-text">
                    <h3><?php echo $responsible_disposal['title']; ?></h3>
                    <p><?php echo $responsible_disposal['description']; ?></p>
                </div>
                <div class="responsible-img">
                    <img src="<?php echo $responsible_disposal['picture']; ?>" alt="">
                </div>
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
            <div class="booking-grid">
                <div class="booking-title">
                    <h2><?php echo $call_to_action_block['title']; ?></h2>
                    <p><?php echo $call_to_action_block['description']; ?></p>
                    <div class="section-title-flex">
                        <a  href="<?php echo $call_to_action_block['link']; ?>" target="_blank" class="custom-btn custom-btn--white">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1610_3614)">
                                    <path d="M19 2H18V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0C16.7348 0 16.4804 0.105357 16.2929 0.292893C16.1054 0.48043 16 0.734784 16 1V2H8V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V2H5C3.67441 2.00159 2.40356 2.52888 1.46622 3.46622C0.528882 4.40356 0.00158786 5.67441 0 7L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V7C23.9984 5.67441 23.4711 4.40356 22.5338 3.46622C21.5964 2.52888 20.3256 2.00159 19 2ZM2 7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H19C19.7956 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V8H2V7ZM19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V10H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22Z" fill="#72A53B"/>
                                    <path d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z" fill="#72A53B"/>
                                    <path d="M7 16.5C7.82843 16.5 8.5 15.8284 8.5 15C8.5 14.1716 7.82843 13.5 7 13.5C6.17157 13.5 5.5 14.1716 5.5 15C5.5 15.8284 6.17157 16.5 7 16.5Z" fill="#72A53B"/>
                                    <path d="M17 16.5C17.8284 16.5 18.5 15.8284 18.5 15C18.5 14.1716 17.8284 13.5 17 13.5C16.1716 13.5 15.5 14.1716 15.5 15C15.5 15.8284 16.1716 16.5 17 16.5Z" fill="#72A53B"/>
                                </g>
                            </svg>

                            <span><?php echo $call_to_action_block['button_name']; ?></span>
                        </a>
                        <a href="tel:<?php echo '+1' . $call_to_action_block['phone_number']; ?>" class="main-phone main-phone--big main-phone--white">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 0.999644C13 0.734427 13.1053 0.480073 13.2929 0.292537C13.4804 0.105001 13.7348 -0.000356157 14 -0.000356157C16.6512 0.00255544 19.1931 1.05706 21.0678 2.93179C22.9425 4.80653 23.997 7.34837 24 9.99965C24 10.2649 23.8946 10.5192 23.7071 10.7068C23.5195 10.8943 23.2652 10.9996 23 10.9996C22.7347 10.9996 22.4804 10.8943 22.2929 10.7068C22.1053 10.5192 22 10.2649 22 9.99965C21.9976 7.87864 21.154 5.8452 19.6542 4.34542C18.1544 2.84565 16.121 2.00203 14 1.99964C13.7348 1.99964 13.4804 1.89429 13.2929 1.70675C13.1053 1.51921 13 1.26486 13 0.999644ZM14 5.99964C15.0608 5.99964 16.0782 6.42107 16.8284 7.17122C17.5785 7.92136 18 8.93878 18 9.99965C18 10.2649 18.1053 10.5192 18.2929 10.7068C18.4804 10.8943 18.7347 10.9996 19 10.9996C19.2652 10.9996 19.5195 10.8943 19.7071 10.7068C19.8946 10.5192 20 10.2649 20 9.99965C19.9984 8.40883 19.3657 6.88363 18.2409 5.75876C17.116 4.63388 15.5908 4.00123 14 3.99964C13.7348 3.99964 13.4804 4.105 13.2929 4.29254C13.1053 4.48007 13 4.73443 13 4.99964C13 5.26486 13.1053 5.51921 13.2929 5.70675C13.4804 5.89429 13.7348 5.99964 14 5.99964ZM23.093 16.7386C23.6725 17.3198 23.9979 18.107 23.9979 18.9276C23.9979 19.7483 23.6725 20.5355 23.093 21.1166L22.183 22.1656C13.993 30.0066 -5.93701 10.0816 1.78298 1.86564L2.93298 0.865644C3.51475 0.302321 4.29491 -0.00930708 5.10468 -0.00182132C5.91445 0.00566445 6.68872 0.331662 7.25998 0.905644C7.29098 0.936644 9.14398 3.34364 9.14398 3.34364C9.6938 3.92127 9.99988 4.68857 9.99858 5.48605C9.99727 6.28352 9.68869 7.04982 9.13698 7.62564L7.97898 9.08165C8.61982 10.6388 9.56204 12.0539 10.7515 13.2457C11.9409 14.4376 13.3542 15.3827 14.91 16.0266L16.375 14.8616C16.9509 14.3104 17.717 14.0021 18.5143 14.001C19.3115 13.9999 20.0785 14.306 20.656 14.8556C20.656 14.8556 23.062 16.7076 23.093 16.7386ZM21.717 18.1926C21.717 18.1926 19.324 16.3516 19.293 16.3206C19.0869 16.1164 18.8086 16.0018 18.5185 16.0018C18.2283 16.0018 17.95 16.1164 17.744 16.3206C17.717 16.3486 15.7 17.9556 15.7 17.9556C15.564 18.0638 15.4023 18.1348 15.2306 18.1614C15.0589 18.1881 14.8833 18.1695 14.721 18.1076C12.7054 17.3572 10.8747 16.1824 9.35281 14.6627C7.83091 13.1431 6.65338 11.3141 5.89998 9.29965C5.83318 9.1351 5.8114 8.95573 5.83688 8.77998C5.86237 8.60423 5.93419 8.43844 6.04498 8.29965C6.04498 8.29965 7.65198 6.28164 7.67898 6.25564C7.88324 6.04963 7.99786 5.77126 7.99786 5.48114C7.99786 5.19103 7.88324 4.91266 7.67898 4.70664C7.64798 4.67664 5.80698 2.28164 5.80698 2.28164C5.59788 2.09415 5.32498 1.99374 5.04423 2.00099C4.76347 2.00824 4.49612 2.12261 4.29698 2.32064L3.14698 3.32064C-2.49501 10.1046 14.776 26.4176 20.721 20.7996L21.632 19.7496C21.8454 19.5519 21.9737 19.2789 21.9895 18.9883C22.0054 18.6978 21.9076 18.4125 21.717 18.1926Z" fill="#72A53B"/>
                            </svg>
                            <span><?php echo $call_to_action_block['phone_number']; ?></span>
                        </a>
                    </div>
                </div>
                <div class="booking-img">
                    <img src="<?php echo $call_to_action_block['picture']; ?>" alt="">
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

