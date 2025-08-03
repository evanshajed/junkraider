<?php
$hero = get_field('hero');
$junk_raider_in_numbers = get_field('junk_raider_in_numbers');
$a_few_reasons_why_junk_raider = get_field('a_few_reasons_why_junk_raider');
$main_locations = get_field('main_locations');
$our_services = get_field('our_services');
$call_to_action_block = get_field('call_to_action_block');
$our_junk_removal_process = get_field('our_junk_removal_process');
$covered_territories = get_field('covered_territories');
$franchise = get_field('franchise');
$what_our_clients_say = get_field('what_our_clients_say');
$items_we_take = get_field('items_we_take');
$a_message_from_our_founder = get_field('a_message_from_our_founder');
?>

<!doctype html>
<html lang="en">

<?php get_template_part('template_parts/head'); ?>

<body class="">

<?php get_header(); ?>

<main class="main">
    <section class="fs">
        <div class="content-wrap">
            <div class="fs-wrap">
                <div class="fs-title">
                    <h1><?php echo $hero['title']; ?></h1>
                    <p><?php echo $hero['description']; ?></p>
                    <div class="fs-title-flex">
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
                <div class="fs-imgs">
                    <div class="fs-img">
                        <img class="instant" src="<?php echo $hero['image_2']; ?>" alt="">
                    </div>
                    <div class="fs-img--text">
                        <img class="instant" src="<?php echo $hero['image_1']; ?>" alt="">
                    </div>
					<a href="<?php echo $hero['link_for_3_image']; ?>" target="_blank">
						<div class="fs-img--logo">
							<img class="instant" src="<?php echo $hero['image_3']; ?>" alt="">
						</div>
					</a>
                </div>
            </div>
            <div class="fs-form">
                <div class="fs-form-text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M12 6C11.2089 6 10.4355 6.2346 9.77772 6.67412C9.11993 7.11365 8.60723 7.73836 8.30448 8.46927C8.00173 9.20017 7.92252 10.0044 8.07686 10.7804C8.2312 11.5563 8.61216 12.269 9.17157 12.8284C9.73098 13.3878 10.4437 13.7688 11.2196 13.9231C11.9956 14.0775 12.7998 13.9983 13.5307 13.6955C14.2616 13.3928 14.8864 12.8801 15.3259 12.2223C15.7654 11.5645 16 10.7911 16 10C16 8.93913 15.5786 7.92172 14.8284 7.17157C14.0783 6.42143 13.0609 6 12 6ZM12 12C11.6044 12 11.2178 11.8827 10.8889 11.6629C10.56 11.4432 10.3036 11.1308 10.1522 10.7654C10.0009 10.3999 9.96126 9.99778 10.0384 9.60982C10.1156 9.22186 10.3061 8.86549 10.5858 8.58579C10.8655 8.30608 11.2219 8.1156 11.6098 8.03843C11.9978 7.96126 12.3999 8.00087 12.7654 8.15224C13.1308 8.30362 13.4432 8.55996 13.6629 8.88886C13.8827 9.21776 14 9.60444 14 10C14 10.5304 13.7893 11.0391 13.4142 11.4142C13.0391 11.7893 12.5304 12 12 12Z" fill="white"/>
                        <path id="Vector_2" d="M12.0003 24.0001C11.1583 24.0044 10.3274 23.8069 9.57738 23.4241C8.82733 23.0413 8.17991 22.4844 7.68931 21.8C3.87831 16.543 1.94531 12.591 1.94531 10.053C1.94531 7.3863 3.00468 4.82877 4.89035 2.94309C6.77603 1.05741 9.33356 -0.00195312 12.0003 -0.00195312C14.6671 -0.00195312 17.2246 1.05741 19.1103 2.94309C20.9959 4.82877 22.0553 7.3863 22.0553 10.053C22.0553 12.591 20.1223 16.543 16.3113 21.8C15.8207 22.4844 15.1733 23.0413 14.4232 23.4241C13.6732 23.8069 12.8424 24.0044 12.0003 24.0001ZM12.0003 2.18105C9.91273 2.18343 7.91133 3.01377 6.43518 4.48992C4.95904 5.96606 4.12869 7.96746 4.12631 10.055C4.12631 12.065 6.01931 15.782 9.45531 20.521C9.74701 20.9228 10.1297 21.2498 10.572 21.4753C11.0144 21.7008 11.5038 21.8183 12.0003 21.8183C12.4968 21.8183 12.9863 21.7008 13.4286 21.4753C13.8709 21.2498 14.2536 20.9228 14.5453 20.521C17.9813 15.782 19.8743 12.065 19.8743 10.055C19.8719 7.96746 19.0416 5.96606 17.5654 4.48992C16.0893 3.01377 14.0879 2.18343 12.0003 2.18105Z" fill="white"/>
                    </svg>
                    <span class="js_form-text"><?php echo $hero['title_for_search_bar']; ?></span>
                </div>
                <form class="fs-form-input js_find-zip-form">
                    <input type="text" placeholder="Enter your ZIP code">
                    <button class="js_find-zip-btn">
                        <img src="<?php echo get_template_directory_uri() . '/img/svg/search.svg'; ?>" alt="">
                    </button>
                </form>
            </div>
        </div>
    </section>
    <section class="info">
        <div class="content-wrap">
            <div class="content-grid">
                <?php
                    if( have_rows('junk_raider_in_numbers') ):
                        while( have_rows('junk_raider_in_numbers') ): the_row();
                    $icon = get_sub_field('icon');
                    $title = get_sub_field('title');
                    $description = get_sub_field('description');
                ?>
                        <div class="info-item">
                            <div class="info-item-top">
                                <div class="info-item-icon">
                                    <img class="instant" src="<?php echo $icon; ?>" alt="<?php echo $description; ?>">
                                </div>
                                <span><?php echo $title; ?></span>
                            </div>
                            <p><?php echo $description; ?></p>
                        </div>
                    <?php endwhile; ?>
                <?php endif; ?>
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
                if( have_rows('a_few_reasons_why_junk_raider') ):
                    while( have_rows('a_few_reasons_why_junk_raider') ): the_row();
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
    <section class="services">
        <div class="content-wrap">
            <div class="services-grid">
                <div class="section-title section-title--left">
                    <h2><?php echo $our_services['title']; ?></h2>
                    <p><?php echo $our_services['description']; ?></p>
                    <div class="section-title-flex">
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
                <div class="services-items">
                    <?php
                    if( have_rows('our_services') ):
                        while( have_rows('our_services') ): the_row();
                            if( have_rows('services') ):
                                while( have_rows('services') ): the_row();
                                    $icon = get_sub_field('icon');
                                    $title = get_sub_field('title');
                                    $description = get_sub_field('description');
                                    $link = get_sub_field('link');
                    ?>
                    <div class="service-item">
                        <div class="service-item-icon">
                            <img src="<?php echo $icon; ?>" alt="">
                        </div>
                        <div class="service-item-text">
                            <h3><?php echo $title; ?></h3>
                            <p><?php echo $description; ?></p>
                            <a class="more" href="<?php echo $link; ?>">
                                <span>Learn More</span>
                                <img src="<?php echo get_template_directory_uri() . '/img/svg/arrow.svg'; ?>" alt="">
                            </a>
                        </div>
                    </div>
                                <?php endwhile; ?>
                            <?php endif; ?>
                        <?php endwhile; ?>
                    <?php endif; ?>
                </div>
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
                        <a href="<?php echo $hero['call_to_action_button_link']; ?>" class="custom-btn custom-btn--white">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1610_3614)">
                                    <path d="M19 2H18V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0C16.7348 0 16.4804 0.105357 16.2929 0.292893C16.1054 0.48043 16 0.734784 16 1V2H8V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V2H5C3.67441 2.00159 2.40356 2.52888 1.46622 3.46622C0.528882 4.40356 0.00158786 5.67441 0 7L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V7C23.9984 5.67441 23.4711 4.40356 22.5338 3.46622C21.5964 2.52888 20.3256 2.00159 19 2ZM2 7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H19C19.7956 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V8H2V7ZM19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V10H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22Z" fill="#72A53B"/>
                                    <path d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z" fill="#72A53B"/>
                                    <path d="M7 16.5C7.82843 16.5 8.5 15.8284 8.5 15C8.5 14.1716 7.82843 13.5 7 13.5C6.17157 13.5 5.5 14.1716 5.5 15C5.5 15.8284 6.17157 16.5 7 16.5Z" fill="#72A53B"/>
                                    <path d="M17 16.5C17.8284 16.5 18.5 15.8284 18.5 15C18.5 14.1716 17.8284 13.5 17 13.5C16.1716 13.5 15.5 14.1716 15.5 15C15.5 15.8284 16.1716 16.5 17 16.5Z" fill="#72A53B"/>
                                </g>
                            </svg>

                            <span><?php echo $hero['cta_button_name']; ?></span>
                        </a>
                        <a href="tel:<?php echo '+1' . $hero['phone_number']; ?>" class="main-phone main-phone--big main-phone--white">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 0.999644C13 0.734427 13.1053 0.480073 13.2929 0.292537C13.4804 0.105001 13.7348 -0.000356157 14 -0.000356157C16.6512 0.00255544 19.1931 1.05706 21.0678 2.93179C22.9425 4.80653 23.997 7.34837 24 9.99965C24 10.2649 23.8946 10.5192 23.7071 10.7068C23.5195 10.8943 23.2652 10.9996 23 10.9996C22.7347 10.9996 22.4804 10.8943 22.2929 10.7068C22.1053 10.5192 22 10.2649 22 9.99965C21.9976 7.87864 21.154 5.8452 19.6542 4.34542C18.1544 2.84565 16.121 2.00203 14 1.99964C13.7348 1.99964 13.4804 1.89429 13.2929 1.70675C13.1053 1.51921 13 1.26486 13 0.999644ZM14 5.99964C15.0608 5.99964 16.0782 6.42107 16.8284 7.17122C17.5785 7.92136 18 8.93878 18 9.99965C18 10.2649 18.1053 10.5192 18.2929 10.7068C18.4804 10.8943 18.7347 10.9996 19 10.9996C19.2652 10.9996 19.5195 10.8943 19.7071 10.7068C19.8946 10.5192 20 10.2649 20 9.99965C19.9984 8.40883 19.3657 6.88363 18.2409 5.75876C17.116 4.63388 15.5908 4.00123 14 3.99964C13.7348 3.99964 13.4804 4.105 13.2929 4.29254C13.1053 4.48007 13 4.73443 13 4.99964C13 5.26486 13.1053 5.51921 13.2929 5.70675C13.4804 5.89429 13.7348 5.99964 14 5.99964ZM23.093 16.7386C23.6725 17.3198 23.9979 18.107 23.9979 18.9276C23.9979 19.7483 23.6725 20.5355 23.093 21.1166L22.183 22.1656C13.993 30.0066 -5.93701 10.0816 1.78298 1.86564L2.93298 0.865644C3.51475 0.302321 4.29491 -0.00930708 5.10468 -0.00182132C5.91445 0.00566445 6.68872 0.331662 7.25998 0.905644C7.29098 0.936644 9.14398 3.34364 9.14398 3.34364C9.6938 3.92127 9.99988 4.68857 9.99858 5.48605C9.99727 6.28352 9.68869 7.04982 9.13698 7.62564L7.97898 9.08165C8.61982 10.6388 9.56204 12.0539 10.7515 13.2457C11.9409 14.4376 13.3542 15.3827 14.91 16.0266L16.375 14.8616C16.9509 14.3104 17.717 14.0021 18.5143 14.001C19.3115 13.9999 20.0785 14.306 20.656 14.8556C20.656 14.8556 23.062 16.7076 23.093 16.7386ZM21.717 18.1926C21.717 18.1926 19.324 16.3516 19.293 16.3206C19.0869 16.1164 18.8086 16.0018 18.5185 16.0018C18.2283 16.0018 17.95 16.1164 17.744 16.3206C17.717 16.3486 15.7 17.9556 15.7 17.9556C15.564 18.0638 15.4023 18.1348 15.2306 18.1614C15.0589 18.1881 14.8833 18.1695 14.721 18.1076C12.7054 17.3572 10.8747 16.1824 9.35281 14.6627C7.83091 13.1431 6.65338 11.3141 5.89998 9.29965C5.83318 9.1351 5.8114 8.95573 5.83688 8.77998C5.86237 8.60423 5.93419 8.43844 6.04498 8.29965C6.04498 8.29965 7.65198 6.28164 7.67898 6.25564C7.88324 6.04963 7.99786 5.77126 7.99786 5.48114C7.99786 5.19103 7.88324 4.91266 7.67898 4.70664C7.64798 4.67664 5.80698 2.28164 5.80698 2.28164C5.59788 2.09415 5.32498 1.99374 5.04423 2.00099C4.76347 2.00824 4.49612 2.12261 4.29698 2.32064L3.14698 3.32064C-2.49501 10.1046 14.776 26.4176 20.721 20.7996L21.632 19.7496C21.8454 19.5519 21.9737 19.2789 21.9895 18.9883C22.0054 18.6978 21.9076 18.4125 21.717 18.1926Z" fill="#72A53B"/>
                            </svg>
                            <span><?php echo $hero['phone_number_button_name']; ?></span>
                        </a>
                    </div>
                </div>
                <div class="booking-img">
                    <img src="<?php echo $call_to_action_block['picture']; ?>" alt="">
                </div>
            </div>
        </div>
    </section>
    <section class="process">
        <div class="content-wrap">
            <div class="section-title">
                <h2><?php echo $our_junk_removal_process['title']; ?></h2>
                <p><?php echo $our_junk_removal_process['description']; ?></p>
            </div>
            <div class="content-grid">
                <?php
                $counter = 0;
                if( have_rows('our_junk_removal_process') ):
                    while( have_rows('our_junk_removal_process') ): the_row();
                        if( have_rows('process') ):
                            while( have_rows('process') ): the_row();
                                $counter++;
                            $icon = get_sub_field('icon');
                            $title = get_sub_field('title');
                ?>
                <div class="process-item">
                    <div class="process-item-top">
                        <div class="process-item-icon">
                            <img src="<?php echo $icon; ?>" alt="">
                        </div>
                        <span><?php echo $counter; ?></span>
                    </div>
                    <h3><?php echo $title; ?></h3>
                </div>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <section class="map">
        <div class="content-wrap">
            <div class="map-grid">
                <div class="section-title section-title--left">
                    <h2><?php echo $covered_territories['title']; ?></h2>
                    <p><?php echo $covered_territories['description']; ?></p>
                    <div class="section-title-flex">
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
                <div class="map-img">
                    <img src="<?php echo $covered_territories['picture']; ?>" alt="">
                </div>
            </div>
        </div>
    </section>
	<section class="reasons">
        <div class="content-wrap">
            <div class="section-title">
                <?php echo $main_locations['title']; ?>
				<p><?php echo $main_locations['description']; ?></p>
            </div>
            <div class="content-grid">
                <?php
                if( have_rows('main_locations') ):
                    while( have_rows('main_locations') ): the_row();
                        if( have_rows('reasons') ):
                            while( have_rows('reasons') ): the_row();
                                $icon = get_sub_field('icon');
                                $title = get_sub_field('title');
                                $description = get_sub_field('description');
                ?>
                <div class="process-item">
                    <div class="reasons-item-icon">
                        <img src="<?php echo $icon; ?>" alt="">
                    </div>
                    <h3><?php echo $title; ?></h3>
                </div>
                                <?php endwhile; ?>
                            <?php endif; ?>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <section class="franchise">
        <div class="content-wrap">
            <div class="franchise-grid">
                <div class="franchise-title">
                    <span class="franchise-title-tag"><?php echo $franchise['chip']; ?></span>
                    <h2><?php echo $franchise['title']; ?></h2>
                    <p><?php echo $franchise['description']; ?></p>
                </div>
                <a href="<?php echo $franchise['link']; ?>" class="custom-btn">
                    <img src="<?php echo get_template_directory_uri() . '/img/svg/rocket.svg'; ?>" alt="">
                    <span><?php echo $franchise['button_name']; ?></span>
                </a>
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
                if( have_rows('what_our_clients_say') ):
                    while( have_rows('what_our_clients_say') ): the_row();
                        if( have_rows('testimonials') ):
                            while( have_rows('testimonials') ): the_row();
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
                        <p onclick="$('.reviews').toggleClass('expanded')" title="Click to expand"><?php echo $testimonial; ?></p>
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
	<style>
		.reviews-slide-text p {
		    overflow: hidden;
		    text-overflow: ellipsis;
		    display: -webkit-box;
			line-clamp: 4;
		    -webkit-line-clamp: 4;
		    -webkit-box-orient: vertical;
		}
		.reviews.expanded .reviews-slide-text p {
			line-clamp: initial;
			-webkit-line-clamp: initial;
		}
	</style>
    <section class="items">
        <div class="content-wrap">
            <div class="items-wrap">
                <div class="section-title">
                    <h2><?php echo $items_we_take['title']; ?></h2>
                </div>
                <div class="tabs">
                        <?php
                        if( have_rows('items_we_take') ):
                            while( have_rows('items_we_take') ): the_row();
                                if( have_rows('tabs') ):
                                    while( have_rows('tabs') ): the_row();
                                        $tab_title = get_sub_field('tab_title');
                        ?>
                                        <div style="padding-bottom: 40px;" data-tab="#<?php echo $tab_title; ?>"><?php echo $tab_title; ?></div>
                                    <?php endwhile; ?>
                                <?php endif; ?>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    <div class="tabs-content js_tabs-content">
                        <?php
                        if( have_rows('items_we_take') ):
                            while( have_rows('items_we_take') ): the_row();
                                if( have_rows('tabs') ):
                                    while( have_rows('tabs') ): the_row();
                                        $tab_title = get_sub_field('tab_title');
                        ?>
                                        <div class="tab" id="<?php echo $tab_title; ?>">
                                            <ul class="tab-list">
                                                <?php
                                                if( have_rows('item_name') ):
                                                    while( have_rows('item_name') ): the_row();
														$link = get_sub_field('link');
                                                        $title = get_sub_field('title');
                                                ?>
												<?php
												$itemLink = ($link) ? '<li><a class="item-link" href="' . $link . '">' . $title . '</a></li>' : '<li>' . $title . '</li>';
												echo $itemLink;
												?>
                                                    <?php endwhile; ?>
                                                <?php endif; ?>
                                            </ul>
                                        </div>
                                    <?php endwhile; ?>
                                <?php endif; ?>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    </div>
                    <div class="what-we-dont-take">
                        <h2>What We Don’t Take</h2>
                        <p>Paint, chemicals, or anything toxic/hazardous, such as used needles, or anything with blood or bodily fluids/human waste.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="founder">
        <div class="content-wrap">
            <div class="section-title">
                <h2><?php echo $a_message_from_our_founder['title']; ?></h2>
            </div>
            <div class="founder-grid">
                <div class="founder-info">
                    <p><?php echo $a_message_from_our_founder['text']; ?></p>
                    <div class="img">
                        <img src="<?php echo $a_message_from_our_founder['sign']; ?>" alt="">
                    </div>
                    <p>
                        <span style="font-size: 20px; font-weight: 700;"><?php echo $a_message_from_our_founder['full_name_&_position']; ?></span>
                    </p>
                </div>
                <div class="founder-img">
                    <img src="<?php echo $a_message_from_our_founder['photo']; ?>" alt="">
                </div>
            </div>
        </div>
    </section>
	
	<section class="questions" style=" margin-bottom: 0px;">
        <div class="content-wrap">
            <div class="section-title" style="margin-bottom: 0px;">
                <h2>Frequently Asked Questions</h2>
                <p>Get instant answers to your questions about our services, franchising opportunities, or anything else about Junk Raider.</p>
            </div>
<div style="display: flex; justify-content: center;">
<iframe src="https://www.infaq.ai/chat/65c694e0126da4e999b71e17" title="AI FAQ" height="590" width="800" frameborder="0"></iframe>
</div>
        </div>
    </section>

</main>


<?php get_footer(); ?>

<?php wp_footer(); ?>

<?php get_template_part('template_parts/scripts'); ?>

</body>
</html>

