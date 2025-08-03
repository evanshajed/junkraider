<?php
foreach( ( get_the_category() ) as $category ) {
    $category = $category -> cat_name . ' ';
}
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
                <h1><?php echo the_title(); ?></h1>
                <!--<div class="blog-page-info">
                    <span><?php # echo get_the_date('M ') . get_the_date('j, ') . get_the_date(' Y'); ?></span>
                </div>-->
            </div>
        </div>
    </section>
    <section class="blog-page">
        <div class="content-wrap">
            <div class="blog-page-img">
                <img src="<?php echo the_post_thumbnail_url(); ?>" alt="">
            </div>

            <div class="blog-page-text">
                <?php echo the_content(); ?>
                <div class="post-tags"><?php echo postTags(); ?></div>
                <div class="blog-page-socials">
                    <span>Share it in</span>
                    <div class="blog-page-socials-wrap">
                        <a href=""></a><a href=""></a><a href=""></a>
                    </div>
                </div>

            </div>
            <div class="blog-title">
                <h2>Related Posts</h2>
            </div>
            <div class="blog-page-grid">
                <?php related_post() ?>

            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>

<?php wp_footer(); ?>

<?php get_template_part('template_parts/scripts'); ?>

</body>
</html>

