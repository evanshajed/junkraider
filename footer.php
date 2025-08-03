<?php
$hero = get_field('hero', 11);
$extra = get_field('extra', 11);
?>

<?php get_template_part('template_parts/modal_windows'); ?>
<?php get_template_part('template_parts/get_quote'); ?>

<footer class="footer">
    <div class="footer-top">
        <div class="content-wrap">
            <div class="footer-top-flex">
                <a href="/" class="logo">
                    <img src="<?php echo get_template_directory_uri() . '/img/svg/logo.svg'; ?>" alt="">
                </a>
                <div class="footer-form">
                    <div class="footer-form-text">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="fi-rr-marker" clip-path="url(#clip0_1611_516)">
                                <path id="Vector" d="M12 6C11.2089 6 10.4355 6.2346 9.77772 6.67412C9.11993 7.11365 8.60723 7.73836 8.30448 8.46927C8.00173 9.20017 7.92252 10.0044 8.07686 10.7804C8.2312 11.5563 8.61216 12.269 9.17157 12.8284C9.73098 13.3878 10.4437 13.7688 11.2196 13.9231C11.9956 14.0775 12.7998 13.9983 13.5307 13.6955C14.2616 13.3928 14.8864 12.8801 15.3259 12.2223C15.7654 11.5645 16 10.7911 16 10C16 8.93913 15.5786 7.92172 14.8284 7.17157C14.0783 6.42143 13.0609 6 12 6ZM12 12C11.6044 12 11.2178 11.8827 10.8889 11.6629C10.56 11.4432 10.3036 11.1308 10.1522 10.7654C10.0009 10.3999 9.96126 9.99778 10.0384 9.60982C10.1156 9.22186 10.3061 8.86549 10.5858 8.58579C10.8655 8.30608 11.2219 8.1156 11.6098 8.03843C11.9978 7.96126 12.3999 8.00087 12.7654 8.15224C13.1308 8.30362 13.4432 8.55996 13.6629 8.88886C13.8827 9.21776 14 9.60444 14 10C14 10.5304 13.7893 11.0391 13.4142 11.4142C13.0391 11.7893 12.5304 12 12 12Z" fill="#72A53B"/>
                                <path id="Vector_2" d="M12.0003 24.0001C11.1583 24.0044 10.3274 23.8069 9.57738 23.4241C8.82733 23.0413 8.17991 22.4844 7.68931 21.8C3.87831 16.543 1.94531 12.591 1.94531 10.053C1.94531 7.3863 3.00468 4.82877 4.89035 2.94309C6.77603 1.05741 9.33356 -0.00195312 12.0003 -0.00195312C14.6671 -0.00195312 17.2246 1.05741 19.1103 2.94309C20.9959 4.82877 22.0553 7.3863 22.0553 10.053C22.0553 12.591 20.1223 16.543 16.3113 21.8C15.8207 22.4844 15.1733 23.0413 14.4232 23.4241C13.6732 23.8069 12.8424 24.0044 12.0003 24.0001ZM12.0003 2.18105C9.91273 2.18343 7.91133 3.01377 6.43518 4.48992C4.95904 5.96606 4.12869 7.96746 4.12631 10.055C4.12631 12.065 6.01931 15.782 9.45531 20.521C9.74701 20.9228 10.1297 21.2498 10.572 21.4753C11.0144 21.7008 11.5038 21.8183 12.0003 21.8183C12.4968 21.8183 12.9863 21.7008 13.4286 21.4753C13.8709 21.2498 14.2536 20.9228 14.5453 20.521C17.9813 15.782 19.8743 12.065 19.8743 10.055C19.8719 7.96746 19.0416 5.96606 17.5654 4.48992C16.0893 3.01377 14.0879 2.18343 12.0003 2.18105Z" fill="#72A53B"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_1611_516">
                                    <rect width="24" height="24" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <span class="js_form-text"><?php echo $hero['title_for_search_bar']; ?></span>
                    </div>
                    <form class="footer-form-input js_find-zip-form">
                        <input type="text" placeholder="Enter your ZIP code">
                        <button class="custom-btn custom-btn--small js_find-zip-btn">Locate</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-nav">
        <div class="content-wrap">
            <div class="nav-grid">
                <div>
                    <?php
                    if( have_rows('footer', 'option') ):
                        while( have_rows('footer', 'option') ): the_row();
                        if( have_rows('section_1', 'option') ):
                            while( have_rows('section_1', 'option') ): the_row();
                                $title = get_sub_field('title');
                    ?>
                    <p><?php echo $title; ?></p>
                    <ul>
                        <?php
                        if( have_rows('links', 'option') ):
                            while( have_rows('links', 'option') ): the_row();
                                $link = get_sub_field('link');
                        ?>
                        <li><a href="<?php echo $link['url']; ?>"><?php echo $link['title']; ?></a></li>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    </ul>
                            <?php endwhile; ?>
                        <?php endif; ?>
                        <?php endwhile; ?>
                    <?php endif; ?>
                </div>
                <div>
                    <?php
                    if( have_rows('footer', 'option') ):
                        while( have_rows('footer', 'option') ): the_row();
                            if( have_rows('section_2', 'option') ):
                                while( have_rows('section_2', 'option') ): the_row();
                                    $title = get_sub_field('title');
                    ?>
                    <p><?php echo $title; ?></p>
                    <ul>
                        <?php
                        if( have_rows('links', 'option') ):
                            while( have_rows('links', 'option') ): the_row();
                                $link = get_sub_field('link');
                        ?>
                        <li><a href="<?php echo $link['url']; ?>"><?php echo $link['title']; ?></a></li>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    </ul>
                                <?php endwhile; ?>
                            <?php endif; ?>
                        <?php endwhile; ?>
                    <?php endif; ?>
                </div>
                <div>
                    <div>
                        <?php
                        if( have_rows('footer', 'option') ):
                            while( have_rows('footer', 'option') ): the_row();
                                if( have_rows('section_3', 'option') ):
                                    while( have_rows('section_3', 'option') ): the_row();
                                        $title = get_sub_field('title');
                        ?>
                        <p><?php echo $title; ?></p>
                        <ul>
                            <?php
                            if( have_rows('links', 'option') ):
                                while( have_rows('links', 'option') ): the_row();
                                    $link = get_sub_field('link');
                            ?>
                            <li><a href="<?php echo $link['url']; ?>"><?php echo $link['title']; ?></a></li>
                                <?php endwhile; ?>
                            <?php endif; ?>
                        </ul>
                                    <?php endwhile; ?>
                                <?php endif; ?>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    </div>
                    <div>
                        <p>Our Contacts</p>
                        <div class="contacts">
                            <a class="contact" href="tel:<?php echo '+1' . $hero['phone_number']; ?>">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 0.999644C13 0.734427 13.1053 0.480073 13.2929 0.292537C13.4804 0.105001 13.7348 -0.000356157 14 -0.000356157C16.6512 0.00255544 19.1931 1.05706 21.0678 2.93179C22.9425 4.80653 23.997 7.34837 24 9.99965C24 10.2649 23.8946 10.5192 23.7071 10.7068C23.5195 10.8943 23.2652 10.9996 23 10.9996C22.7347 10.9996 22.4804 10.8943 22.2929 10.7068C22.1053 10.5192 22 10.2649 22 9.99965C21.9976 7.87864 21.154 5.8452 19.6542 4.34542C18.1544 2.84565 16.121 2.00203 14 1.99964C13.7348 1.99964 13.4804 1.89429 13.2929 1.70675C13.1053 1.51921 13 1.26486 13 0.999644ZM14 5.99964C15.0608 5.99964 16.0782 6.42107 16.8284 7.17122C17.5785 7.92136 18 8.93878 18 9.99965C18 10.2649 18.1053 10.5192 18.2929 10.7068C18.4804 10.8943 18.7347 10.9996 19 10.9996C19.2652 10.9996 19.5195 10.8943 19.7071 10.7068C19.8946 10.5192 20 10.2649 20 9.99965C19.9984 8.40883 19.3657 6.88363 18.2409 5.75876C17.116 4.63388 15.5908 4.00123 14 3.99964C13.7348 3.99964 13.4804 4.105 13.2929 4.29254C13.1053 4.48007 13 4.73443 13 4.99964C13 5.26486 13.1053 5.51921 13.2929 5.70675C13.4804 5.89429 13.7348 5.99964 14 5.99964ZM23.093 16.7386C23.6725 17.3198 23.9979 18.107 23.9979 18.9276C23.9979 19.7483 23.6725 20.5355 23.093 21.1166L22.183 22.1656C13.993 30.0066 -5.93701 10.0816 1.78298 1.86564L2.93298 0.865644C3.51475 0.302321 4.29491 -0.00930708 5.10468 -0.00182132C5.91445 0.00566445 6.68872 0.331662 7.25998 0.905644C7.29098 0.936644 9.14398 3.34364 9.14398 3.34364C9.6938 3.92127 9.99988 4.68857 9.99858 5.48605C9.99727 6.28352 9.68869 7.04982 9.13698 7.62564L7.97898 9.08165C8.61982 10.6388 9.56204 12.0539 10.7515 13.2457C11.9409 14.4376 13.3542 15.3827 14.91 16.0266L16.375 14.8616C16.9509 14.3104 17.717 14.0021 18.5143 14.001C19.3115 13.9999 20.0785 14.306 20.656 14.8556C20.656 14.8556 23.062 16.7076 23.093 16.7386ZM21.717 18.1926C21.717 18.1926 19.324 16.3516 19.293 16.3206C19.0869 16.1164 18.8086 16.0018 18.5185 16.0018C18.2283 16.0018 17.95 16.1164 17.744 16.3206C17.717 16.3486 15.7 17.9556 15.7 17.9556C15.564 18.0638 15.4023 18.1348 15.2306 18.1614C15.0589 18.1881 14.8833 18.1695 14.721 18.1076C12.7054 17.3572 10.8747 16.1824 9.35281 14.6627C7.83091 13.1431 6.65338 11.3141 5.89998 9.29965C5.83318 9.1351 5.8114 8.95573 5.83688 8.77998C5.86237 8.60423 5.93419 8.43844 6.04498 8.29965C6.04498 8.29965 7.65198 6.28164 7.67898 6.25564C7.88324 6.04963 7.99786 5.77126 7.99786 5.48114C7.99786 5.19103 7.88324 4.91266 7.67898 4.70664C7.64798 4.67664 5.80698 2.28164 5.80698 2.28164C5.59788 2.09415 5.32498 1.99374 5.04423 2.00099C4.76347 2.00824 4.49612 2.12261 4.29698 2.32064L3.14698 3.32064C-2.49501 10.1046 14.776 26.4176 20.721 20.7996L21.632 19.7496C21.8454 19.5519 21.9737 19.2789 21.9895 18.9883C22.0054 18.6978 21.9076 18.4125 21.717 18.1926Z" fill="#72A53B"/>
                                </svg>
                                <span><?php echo $hero['phone_number']; ?></span>
                            </a>
                            <span class="contact">
                                <img src="<?php echo get_template_directory_uri() . '/img/svg/marker-green.svg'; ?>" alt="">
                                <span><?php echo $extra['address_line']; ?></span>
                            </span>
							<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d52066.974868105775!2d-80.8190125!3d35.3510318!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856a882fbf955dd%3A0xd5bb950c21bad385!2sJunk%20Raider%20-%20Junk%20Removal%20and%20Hauling%20of%20Charlotte%2C%20NC!5e0!3m2!1sen!2sin!4v1717744557813!5m2!1sen!2sin" width="400" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <div class="content-wrap">
            <div class="footer-bottom-wrap">
                <p>2023 © Junk Raider LLC</p>
                <div class="footer-bottom-links">
                    <a href="/privacy-policy">Privacy Policy</a>
                </div>
            </div>
        </div>
    </div>
</footer>