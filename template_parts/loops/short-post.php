

<?php if ( have_posts() ) : ?>
    <?php while ( have_posts() ) : the_post(); ?>
        <!-- do stuff ... -->
    <?php endwhile; ?>
<?php endif; ?>