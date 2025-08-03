<?php

add_action('init', function () {
    remove_action('wp_head', 'wp_print_scripts');
    remove_action('wp_head', 'wp_print_head_scripts', 9);
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    add_action('wp_footer', 'wp_print_scripts', 5);
    add_action('wp_footer', 'wp_print_head_scripts', 5);
});

//Remove Gutenberg Block Library CSS from loading on the frontend
function smartwp_remove_wp_block_library_css(){
 wp_dequeue_style( 'wp-block-library' );
 wp_dequeue_style( 'wp-block-library-theme' );
 wp_dequeue_style( 'wc-blocks-style' ); // Remove WooCommerce block CSS
} 
add_action( 'wp_enqueue_scripts', 'smartwp_remove_wp_block_library_css', 100 );

//
add_theme_support( 'title-tag' );

//
add_theme_support( 'post-thumbnails' );

//
add_post_type_support( 'page', 'excerpt' );

//
function related_post() {

    $post_id = get_the_ID();
    $cat_ids = array();
    $categories = get_the_category( $post_id );

    if(!empty($categories) && is_wp_error($categories)):
        foreach ($categories as $category):
            array_push($cat_ids, $category->term_id);
        endforeach;
    endif;

    $current_post_type = get_post_type($post_id);
    $query_args = array(
        'category__in'   => $cat_ids,
        'post_type'      => $current_post_type,
        'post__not_in'    => array($post_id),
        'posts_per_page'  => '3'
    );

    $related_cats_post = new WP_Query( $query_args );

    if($related_cats_post->have_posts()):
        while($related_cats_post->have_posts()): $related_cats_post->the_post(); ?>
            <a href="<?php the_permalink(); ?>" class="post post--vertical">
                <span class="post-img">
                    <img src="<?php the_post_thumbnail_url(); ?>" alt="">
                </span>
                <div class="post-text">
                    <div class="category"><?php echo $categories[0] -> cat_name;; ?></div>
                    <h3><?php the_title(); ?></h3>
                    <span class="more" href="">
                        <span class="date"><?php echo get_the_date('M ') . get_the_date('j, ') . get_the_date(' Y'); ?></span>
                    </span>
                </div>
            </a>
        <?php endwhile;
        wp_reset_postdata();
    endif;

}

//
function postTags() {
    $post_tags = get_the_tags();
    $output = '';

    if ( ! empty( $post_tags ) ) {
        foreach ( $post_tags as $tag ) {
            $output .= '<a class="post-tag" href="' . esc_attr( get_tag_link( $tag->term_id ) ) . '">' . __( $tag->name ) . '</a>';
        }
    }

    return $output;
}