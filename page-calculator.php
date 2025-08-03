<?php
$hero = get_field('hero', 11);
$a_few_reasons_why_junk_raider = get_field('a_few_reasons_why_junk_raider', 11);
$call_to_action_block = get_field('call_to_action_block', 11);
$our_junk_removal_process = get_field('our_junk_removal_process', 11);
$what_our_clients_say = get_field('what_our_clients_say', 11);
$explore_our_work = get_field('explore_our_work');
$responsible_disposal = get_field('responsible_disposal');
?>

<!doctype html>
<html lang="en">

<?php get_template_part('template_parts/head'); ?>

<body class="commercial-services">

<?php get_header(); ?>

<main>
    <?php get_template_part('template_parts/calculator'); ?>
</main>

<?php get_template_part('template_parts/calculator_process'); ?>

<?php get_footer(); ?>

<?php wp_footer(); ?>

<?php get_template_part('template_parts/scripts'); ?>

</body>
</html>

