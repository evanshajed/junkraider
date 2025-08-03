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
            </div>
        </div>
    </section>
    <section class="blog-page">
        <div class="content-wrap">
            <div class="blog-page-text">
                <?php echo the_content(); ?>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>

<?php wp_footer(); ?>

<?php get_template_part('template_parts/scripts'); ?>

</body>
</html>

