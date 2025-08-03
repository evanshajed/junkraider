<?php

$hero = get_field('hero');
$junk_raider_in_numbers = get_field('junk_raider_in_numbers');
$a_few_reasons_why_junk_raider = get_field('a_few_reasons_why_junk_raider');
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

<main>
    <section class="page-title page-title--stars">
        <div class="content-wrap">
            <div class="page-title-inner">
                <h1>Blog</h1>
                <p>Simplify your life with our Residential Junk Removal Services. We clear away the clutter, transforming your home into a clean and organized haven.</p>
            </div>
        </div>
    </section>
    <section class="blog">
        <div class="content-wrap">
            <div class="blog-grid">
                <?php $query = new WP_Query( array( 'posts_per_page' => 2, ) ); ?>
                <?php if ( $query -> have_posts() ) : while ( $query -> have_posts() ) : $query -> the_post(); ?>
                    <a href="<?php echo get_permalink(); ?>" class="article">
                    <span class="article-img">
                        <img src="<?php echo the_post_thumbnail_url(); ?>" alt="">
                    </span>
                        <div class="article-text">
                            <span class="tag">Featured</span>
                            <h3><?php echo the_title(); ?></h3>
                            <!--<span class="date"><?php # echo get_the_date('M ') . get_the_date('j, ') . get_the_date(' Y'); ?></span>-->
                        </div>
                    </a>
                <?php endwhile;
                    wp_reset_postdata();
                else : ?>
                    <p><?php esc_html_e( 'Sorry, no posts matched your criteria.' ); ?></p>
                <?php endif; ?>
            </div>
            <div class="blog-title">
                <h2>Latest Posts</h2>
            </div>
            <div class="blog-posts">
                <?php $query = new WP_Query( array( 'posts_per_page' => 50, ) ); ?>
                <?php if ( $query -> have_posts() ) : while ( $query -> have_posts() ) : $query -> the_post(); ?>
                    <a href="<?php echo get_permalink(); ?>" class="post">
                        <span class="post-img">
                            <img src="<?php the_post_thumbnail_url(); ?>" alt="">
                        </span>
                        <div class="post-text">
                            <h3><?php the_title(); ?></h3>
                            <!--<span class="more" href="">
                                <span class="date"><?php # echo get_the_date('M ') . get_the_date('j, ') . get_the_date(' Y'); ?></span>
                            </span>-->
                        </div>
                    </a>
                <?php endwhile;
                    wp_reset_postdata();
                else : ?>
                    <p><?php esc_html_e( 'Sorry, no posts matched your criteria.' ); ?></p>
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

